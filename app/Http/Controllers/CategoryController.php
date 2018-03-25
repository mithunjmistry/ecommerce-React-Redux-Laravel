<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
}
