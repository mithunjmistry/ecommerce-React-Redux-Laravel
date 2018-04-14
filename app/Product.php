<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $table = "product";
    protected $primaryKey = "productId";

    public function photo(){
        return $this->hasOne('App\Photo', 'productId', 'productId');
    }
}
