<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserHasPromoCodeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('UserHasPromoCode', function (Blueprint $table) {
            $table->increments('UserHasPromoCodeId');
            $table->integer('userId')->unsigned()->nullable();
            $table->foreign('userId')->references('userId')->on('users');
            $table->integer('promoCodeId')->unsigned()->nullable();
            $table->foreign('promoCodeId')->references('promoCodeId')->on('promoCode');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('UserHasPromoCode');
    }
}
