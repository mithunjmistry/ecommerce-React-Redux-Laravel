<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    //
    protected $table = "paymentmethod";
    protected $primaryKey = "paymentMethodId";
    public $timestamps = false;
}
