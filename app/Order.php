<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    protected $table = "order";
    protected $primaryKey = "orderId";
    public $timestamps = false;

    public function orderItems(){
        return $this->hasMany('App\OrderItem', 'orderId', 'orderId')
                    ->select(['quantity', 'productId', 'price']);
    }

    public function payment(){
        return $this->hasOne('App\Payment', 'paymentId', 'paymentId');
    }

    public function promoCode(){
        return $this->hasOne('App\PromoCode', 'promoCodeId', 'promoCodeId');
    }

}
