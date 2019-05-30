<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orderItem', function (Blueprint $table) {
            $table->increments('orderItemId');
            $table->integer('quantity')->unsigned()->nullable();
            $table->integer('productId')->unsigned()->nullable();
            $table->foreign('productId')->references('productId')->on('product');
            $table->decimal('price')->nullable();
            $table->integer('orderId')->unsigned()->nullable();
            $table->foreign('orderId')->references('orderId')->on('order');
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
        Schema::dropIfExists('orderItem');
    }
}
