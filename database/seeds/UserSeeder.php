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
            'userId' => 51,
            'name' => "mithun",
            'email' => "email@email.com",
            'password' => Hash::make("password"),
            'userTypeId' => 1
        ]);
    }
}
