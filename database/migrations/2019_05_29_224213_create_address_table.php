<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAddressTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('address', function (Blueprint $table) {
            $table->increments('addressId');
            $table->string('address1')->nullable();
            $table->string('address2')->nullable();
            $table->string('city')->nullable();
            $table->string('stateName')->nullable();
            $table->string('zip')->nullable();
            $table->string('phone')->nullable();
            $table->string('addressValidation')->nullable();
            $table->string('cityValidation')->nullable();
            $table->string('zipValidation')->nullable();
            $table->string('phoneValidation')->nullable();
            $table->boolean('editDisabled')->default(false);
            $table->integer('userId')->unsigned()->nullable();
            $table->foreign('userId')->references('UserId')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('address');
    }
}
