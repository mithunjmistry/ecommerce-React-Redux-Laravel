<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \App\User::create([
            'name' => "person",
            'email' => "email@email.com",
            'password' => Hash::make("password"),
            'userTypeId' => 1
        ]);

        \App\Category::create([
            'category' => 'electronics',
            'categoryDescription' => "electronics",
            'subCategory' => "tv",
        ]);

        \App\Product::create([
            'name' => 'TV1',
            'productDescription' => 'TV1 Description',
            'price' => '10',
            'originalPrice' => '9',
            'sellerName' => 'seller person',
            'ratings' => '4',
            'numberOfRatings' => '3',
            'fastShipping' => NULL,
            'categoryId' => '1',
            'prevPrice' => '6',
            'snackbarMessage' => 'snack',
            'timeStamp' => '2019-06-01 00:00:00',
            'created_at' => NULL,
            'updated_at' => NULL,
            'deleted_at' => NULL
        ]);

        \App\Photo::create([
            'photo' => 0x8,
            'productId' => 1,
            'created_at' => NULL,
            'updated_at' => NULL,
        ]);

        \App\PaymentMethod::create([
            'paymentMethod' => 'Credit Card',
        ]);

        \App\PaymentMethod::create([
            'paymentMethod' => 'Debit Card',
        ]);

        \App\ShippingOption::create([
            'shippingMethod' => 'ORDER_PLACED',
        ]);

        \App\ShippingOption::create([
            'shippingMethod' => 'SHIPPED',
        ]);

        \App\ShippingOption::create([
            'shippingMethod' => 'IN_TRANSIT',
        ]);

        \App\ShippingOption::create([
            'shippingMethod' => 'DELIVERED',
        ]);
    }
}
