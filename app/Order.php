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
                    ->select(['quantity', 'productId']);
    }
}
