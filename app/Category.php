<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $table = "category";
    protected $primaryKey = "categoryId";

    public function products(){
        return $this->hasMany('App\Product', 'categoryId', 'categoryId');
    }

    public function new_arrivals(){
        return $this->products()->orderBy('timeStamp', 'desc')->limit(2);
    }

    public function featured(){
        return $this->products()->orderBy('ratings', 'desc')->limit(2);
    }
}
