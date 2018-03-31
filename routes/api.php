<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/subitems/{subcategory}', 'CategoryController@subcategories');
Route::get('/search/{category}/{query}', 'ProductController@search');
Route::get('/product/{product_id}', 'ProductController@product_info');
Route::get('/category/{subcategory}', 'CategoryController@subcategory_products');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return response()->json($request->user());
});
