<?php

namespace App\Http\Controllers;

use App\Category;
use App\Photo;
use App\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    //
    public function search($category, $query){
        $p = Cache::store('redis')->tags([$category, $query])->get('productSearch');
        if(!$p) {
            $category_id = $category != 'all' ? Category::where('categoryDescription', $category)->pluck('categoryId')->toArray() : Category::all(['categoryId'])->pluck('categoryId')->toArray();
            $original_query = $query;
            $query = urldecode($query);

            $products = Product::whereIn('categoryID', $category_id)
                ->where(function ($inner_query) use ($query) {
                    $inner_query->where('name', 'LIKE', "%$query%");
                    $inner_query->orWhere('productDescription', 'LIKE', "%$query%");
                })
                ->orderBy('timeStamp', 'desc')
                ->get()->toArray();
            $p = [];
            foreach ($products as $product) {
                $product['image'] = Photo::where('productId', $product['productId'])->first()->photo;
                array_push($p, $product);
            }

            Cache::store('redis')->tags([$category, $original_query])->put('productSearch', $p, 15);
        }

        return response()->json($p);

    }

    public function product_info($product_id){
        $cache_key = "productInfo$product_id";
        $product = Cache::get($cache_key);
        if(!$product) {
            try {
                $product = Product::where('productId', $product_id)->firstOrFail()->toArray();
                $product['image'] = Photo::where('productId', $product_id)->first()->photo;
                Cache::put($cache_key, $product, 15);
            } catch (ModelNotFoundException $e) {
                return response(json_encode("Product not found"), 400);
            }
        }

        return response()->json($product);
    }
}
