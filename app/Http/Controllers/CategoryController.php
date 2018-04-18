<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    //
    public function subcategories($subcategory_name){

        switch (strtolower($subcategory_name)){
            case "electronics":
                $e = ["TV", "Cellphone", "Camera", "Laptops"];
                return response()->json($e);
                break;
            case "books":
                $b = ["Book", "Novel", "Magazine"];
                return response()->json($b);
                break;
            case "homerequirements":
                $h = ["Furniture", "Lighting", "Mattress"];
                return response()->json($h);
                break;
            default:
                return response()->json([]);
                break;
        }
    }

    public function subcategory_products($subcategory){
        $cache_key = "subcategoryProducts$subcategory";
        $res = Cache::get($cache_key);
        if($res){
            return response()->json($res);
        }
        // just for making code cleaner
        else {
            $category_obj = Category::where('subCategory', $subcategory)->first();
            if ($category_obj) {
                $new_arrivals = $category_obj->new_arrivals->each(function ($product) {
                    $product->photo;
                });
                $featured = $category_obj->featured->each(function ($product) {
                    $product->photo;
                });

                $result = ["featured" => $featured, "new_arrivals" => $new_arrivals];
                Cache::put($cache_key, $result, 15);
                return response()->json($result);
            } else {
                return response(json_encode("Invalid subcategory"), 400);
            }
        }
    }
}
