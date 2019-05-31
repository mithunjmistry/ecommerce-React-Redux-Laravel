<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShoppingCartTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shoppingCart', function (Blueprint $table) {
            $table->increments('shoppingCartId');
            $table->integer('product_id')->unsigned()->nullable();
            $table->integer('productId')->unsigned()->nullable();
            $table->foreign('productId')->references('productId')->on('product');
            $table->integer('userId')->unsigned()->nullable();
            $table->foreign('userId')->references('userId')->on('users');
            $table->boolean('wishList')->default(false);
            $table->boolean('expired')->default(false);
            $table->integer('quantity')->nullable();
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
        Schema::dropIfExists('shoppingCart');
    }
}
