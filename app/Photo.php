<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    //
    protected $table = "photos";
    protected $primaryKey = "photosId";
    protected $guarded = [];

    public function getPhotoAttribute($value){
        return 'data:image/jpeg;base64,'.base64_encode($value);
    }
}
