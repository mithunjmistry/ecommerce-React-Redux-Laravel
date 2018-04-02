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
}
