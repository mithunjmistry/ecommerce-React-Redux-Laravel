<?php

namespace App\Http\Controllers;

use App\Category;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    //
    public function search($category, $query){
        $category_id = $category != 'all' ? Category::where('categoryDescription', $category)->pluck('categoryId')->toArray() : Category::all(['categoryId'])->pluck('categoryId')->toArray();
        $query = urldecode($query);

        $products = Product::whereIn('categoryID', $category_id)
                            ->where(function ($inner_query) use ($query){
                                $inner_query->where('name', 'LIKE', "%$query%");
                                $inner_query->orWhere('productDescription', 'LIKE', "%$query%");
                            })
                            ->orderBy('timeStamp', 'desc')
                            ->get();

        return response()->json($products);

    }
}
