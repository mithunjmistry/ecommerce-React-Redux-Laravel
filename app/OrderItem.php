<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    //
    protected $table = "orderitem";
    protected $primaryKey = "orderItemId";
    public $timestamps = false;

    public function product(){
        return $this->hasOne('App\Product', 'productId', 'productId')
                    ->select(['productId', 'name', 'price', 'sellerName', 'ratings']);
    }
}
