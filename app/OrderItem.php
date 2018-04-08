<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    //
    protected $table = "orderitem";
    protected $primaryKey = "orderItemId";
    public $timestamps = false;
}
