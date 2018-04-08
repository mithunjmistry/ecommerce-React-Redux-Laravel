<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShippingOption extends Model
{
    //
    protected $table = "shippingoptions";
    protected $primaryKey = "shippingOptionsId";
    public $timestamps = false;

    const ORDER_PLACED = 1;
    const SHIPPED = 2;
    const IN_TRANSIT = 3;
    const DELIVERED = 4;
}
