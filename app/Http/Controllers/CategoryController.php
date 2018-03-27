<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;
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
                $b = ["Novel", "Magazine"];
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
        $category_obj = Category::where('subCategory', $subcategory)->first();
        if($category_obj) {
            $new_arrivals = $category_obj->new_arrivals;
            $featured = $category_obj->featured;

            $result = ["featured" => $featured, "new_arrivals" => $new_arrivals];
            return response()->json($result);
        }
        else{
            return response(json_encode("Invalid subcategory"), 400);
        }
    }
}
