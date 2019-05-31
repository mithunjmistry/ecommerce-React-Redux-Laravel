<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Log;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
    protected $primaryKey = "id";
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
        return $this->hasMany('App\OauthAccessToken', 'user_id', 'id');
    }

    public function shoppingCartItems(){
        return $this->hasMany('App\ShoppingCart', 'userId', 'id')
                    ->where('expired', false)
                    ->where('wishList', false);
    }

    public function wishlistItems(){
        return $this->hasMany('App\ShoppingCart', 'userId', 'id')
            ->where('expired', false)
            ->where('wishList', true);
    }

    public function address(){
        return $this->hasOne('App\Address', 'userId', 'id');
    }

    public function orders(){
        return $this->hasMany('App\Order', 'userId', 'id')
                    ->orderByDesc('orderDate')
                    ->select(['orderId', 'orderDate', 'totalAmount']);
    }
}
