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
Route::post('register', 'Auth\RegisterController@register');
Route::post('logout', 'AuthenticationController@logoutAPI');
Route::post('placeorder', 'OrderController@place_order');
Route::get('testemail', 'OrderController@test_email');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return response()->json($request->user());
});

Route::group(["middleware" => 'auth:api'], function () {
    // shopping cart routes
    Route::post('addtocart', 'ShoppingCartController@add_to_cart');
    Route::delete('removefromcart/{product_id}', 'ShoppingCartController@remove_from_cart');
    Route::get('getusercart', 'ShoppingCartController@get_user_cart');
    // wishlist routes
    Route::get('getuserwishlist', 'WishlistController@get_user_wishlist');
    Route::post('addtowishlist', 'WishlistController@add_to_wishlist');
    Route::delete('removefromwishlist/{product_id}', 'WishlistController@remove_from_wishlist');
    Route::post('wishlistcart', 'WishlistController@wishlist_to_cart');
    // checkout routes
    Route::get('checkoutinformation', 'OrderController@get_checkout_user_information');
});
