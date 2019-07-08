<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->increments('productId');
            $table->text('name')->nullable();
            $table->text('productDescription')->nullable();
            $table->decimal('price')->nullable();
            $table->decimal('originalPrice')->nullable();
            $table->text('sellerName')->nullable();
            $table->integer('ratings')->unsigned()->nullable();
            $table->integer('numberOfRatings')->unsigned()->nullable();
            $table->integer('fastShipping')->unsigned()->nullable();
            $table->integer('categoryId')->unsigned()->nullable();
            $table->foreign('categoryId')->references('categoryId')->on('category');
            $table->decimal('prevPrice')->nullable();
            $table->text('snackbarMessage')->nullable();
            $table->dateTime('timeStamp')->nullable();
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
        Schema::dropIfExists('product');
    }
}
