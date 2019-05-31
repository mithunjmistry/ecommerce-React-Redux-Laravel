<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order', function (Blueprint $table) {
            $table->increments('orderId');
            $table->dateTime('orderDate')->nullable();
            $table->decimal('totalAmount')->nullable();
            $table->integer('paymentId')->unsigned()->nullable();
            $table->foreign('paymentId')->references('paymentId')->on('payment');
            $table->integer('userId')->unsigned()->nullable();
            $table->foreign('userId')->references('userId')->on('users');
            $table->integer('shippingOptionsId')->unsigned()->nullable();
            $table->foreign('shippingOptionsId')->references('shippingOptionsId')->on('shippingOptions');
            $table->integer('promoCodeId')->unsigned()->nullable();
            $table->foreign('promoCodeId')->references('promoCodeId')->on('promoCode');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order');
    }
}
