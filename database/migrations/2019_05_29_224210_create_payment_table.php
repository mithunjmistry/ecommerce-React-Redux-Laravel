<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment', function (Blueprint $table) {
            $table->increments('paymentId');
            $table->decimal('amount')->nullable();
            $table->text('status')->nullable();
            $table->dateTime('timeStamp')->nullable();
            $table->integer('paymentMethodId')->unsigned()->nullable();
            $table->foreign('paymentMethodId')->references('paymentMethodId')->on('paymentMethod');
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
        Schema::dropIfExists('payment');
    }
}
