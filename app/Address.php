<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
      'address1', 'address2', 'city', 'stateName', 'zip',
      'phone', 'addressValidation', 'cityValidation', 'zipValidation',
      'phoneValidation', 'editDisabled', 'userId'
    ];

    protected $table = "address";
    protected $primaryKey = "addressId";
}
