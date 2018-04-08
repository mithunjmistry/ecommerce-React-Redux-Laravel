<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    //
    protected $table = "payment";
    protected $primaryKey = "paymentId";
    public $timestamps = false;
}
