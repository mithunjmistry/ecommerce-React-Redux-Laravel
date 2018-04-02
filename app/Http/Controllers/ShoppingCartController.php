<?php

namespace App\Http\Controllers;

use App\ShoppingCart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ShoppingCartController extends Controller
{
    //
    public function add_to_cart(Request $request){
        if (Auth::check()) {
            $user = Auth::user();
            $shopping_cart = ShoppingCart::firstOrNew([
                "expired" => false,
                "userId" => $user->userId,
                "wishList" => false,
                "product_id" => $request["product_id"]
            ]);
            $shopping_cart->quantity = $request["quantity"];
            $shopping_cart->save();
        }
        return response("added to cart", 200);
    }

    public function remove_from_cart($product_id){
        if(Auth::check()) {
            $user = Auth::user();
            $shopping_cart = ShoppingCart::where('product_id', $product_id)->where('userId', $user->userId)->first();
            $shopping_cart->delete();
        }
        return response('removed from cart', 200);
    }
}
