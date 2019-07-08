<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Log;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
    protected $primaryKey = "userId";
    const BUYER = 2;
    const SELLER = 3;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'userTypeId'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function AauthAcessToken(){
        return $this->hasMany('App\OauthAccessToken', 'user_id', 'userId');
    }

    public function shoppingCartItems(){
        return $this->hasMany('App\ShoppingCart', 'userId', 'userId')
                    ->where('expired', false)
                    ->where('wishList', false);
    }

    public function wishlistItems(){
        return $this->hasMany('App\ShoppingCart', 'userId', 'userId')
            ->where('expired', false)
            ->where('wishList', true);
    }

    public function address(){
        return $this->hasOne('App\Address', 'userId', 'userId');
    }

    public function orders(){
        return $this->hasMany('App\Order', 'userId', 'userId')
                    ->orderByDesc('orderDate')
                    ->select(['orderId', 'orderDate', 'totalAmount']);
    }
}
