<?php

namespace App\Http\Controllers;

use App\Photo;
use App\Product;
use App\ShoppingCart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    //
    public function get_user_wishlist(){
        $user = Auth::user();
        $user_wishlist = $user->wishlistItems->pluck('product_id')->toArray();
        $products = Product::whereIn('productId', $user_wishlist)->get()->toArray();

        $p = [];
        foreach ($products as $product){
            $product['image'] = 'data:image/jpeg;base64,'.base64_encode(Photo::where('productId', $product['productId'])->first()->photo);
            array_push($p, $product);
        }

        return response()->json($p);
    }

    public function add_to_wishlist(Request $request){
        if (Auth::check()) {
            $user = Auth::user();
            $wishlist = ShoppingCart::firstOrNew([
                "expired" => false,
                "userId" => $user->userId,
                "wishList" => true,
                "product_id" => $request["product_id"]
            ]);
            $wishlist->quantity = $request["quantity"];
            $wishlist->save();
        }
        return response("added to wishlist", 200);
    }

    public function remove_from_wishlist($product_id){
        if(Auth::check()) {
            $user = Auth::user();
            $wishlist = ShoppingCart::where('product_id', $product_id)
                                            ->where('userId', $user->userId)
                                            ->where('wishList', true)
                                            ->first();
            $wishlist->delete();
        }
        return response('removed from wishlist', 200);
    }

    public function wishlist_to_cart(Request $request){
        $user = Auth::user();
        $shopping_cart_object = ShoppingCart::where('product_id', $request['productID'])
                                            ->where('userId', $user->userId)
                                            ->first();
        $shopping_cart_object->wishList = false;
        $shopping_cart_object->save();

        return response('added wishlist item to cart', 200);
    }
}
