<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePromoCodeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promoCode', function (Blueprint $table) {
            $table->increments('promoCodeId');
            $table->text('promoCode')->nullable();
            $table->dateTime('beginsOn')->nullable();
            $table->integer('discount')->nullable();
            $table->dateTime('endsOn')->nullable();
            $table->text('usedBy')->nullable();
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
        Schema::dropIfExists('promoCode');
    }
}
