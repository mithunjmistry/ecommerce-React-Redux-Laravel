<?php

namespace App\Http\Controllers;

use App\Photo;
use App\Product;
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
            $shopping_cart = ShoppingCart::where('product_id', $product_id)
                                            ->where('userId', $user->userId)
                                            ->where('wishList', false)
                                            ->first();
            $shopping_cart->delete();
        }
        return response('removed from cart', 200);
    }

    public function get_user_cart(){
        $user = Auth::user();
        $user_cart = $user->shoppingCartItems->pluck('product_id')->toArray();
        $products = Product::whereIn('productId', $user_cart)->get()->toArray();

        $p = [];
        foreach ($products as $product){
            $product['image'] = 'data:image/jpeg;base64,'.base64_encode(Photo::where('productId', $product['productId'])->first()->photo);
            array_push($p, $product);
        }

        return response()->json($p);
    }
}
