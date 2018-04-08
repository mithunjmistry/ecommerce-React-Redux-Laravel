<?php

namespace App\Http\Controllers;

use App\Order;
use App\OrderItem;
use App\Payment;
use App\PaymentMethod;
use App\ShippingOption;
use App\ShoppingCart;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    //
    public function get_checkout_user_information(){
        // user information to send
        // Full Name, Email, address-1, address-2, city, state, zip, phone
        $user = Auth::user();
        $checkout_information = $user->join('address', 'address.userId', '=', 'users.userId')
                                        ->select('address.*', 'users.name as full_name', 'users.email as email')
                                        ->first();
        return response()->json($checkout_information);
    }

    public function place_order(Request $request){
        $user = User::where('email', $request['email'])->first();
        $user_id = null;
        if($user){
            $user_id = $user->userId;
        }
        $datetime = date("Y-m-d H:i:s");
        $total_amount = $request['totalAmount'];

        $payment_method = PaymentMethod::where('paymentMethod', $request['paymentMethod'])->first();

        $payment = new Payment();
        $payment->amount = $total_amount;
        $payment->status = "Successful";
        $payment->timeStamp = $datetime;
        $payment->paymentMethodId = $payment_method->paymentMethodId;
        $payment->save();

        $order = new Order();
        $order->orderDate = $datetime;
        $order->totalAmount = $total_amount;
        $order->paymentId = $payment->paymentId;
        $order->userId = $user_id;
        $order->shippingOptionsId = ShippingOption::ORDER_PLACED;
        $order->save();

        $products = $request['products'];
        $products_id = [];
        foreach ($products as $product){
            $order_item = new OrderItem();
            $order_item->quantity = $product['quantity'];
            $order_item->productId = $product['productId'];
            $order_item->orderId = $order->orderId;
            $order_item->save();

            array_push($products_id, $product['productId']);
        }

        if($user){
            ShoppingCart::where('userId', $user_id)
                        ->where('wishList', false)
                        ->whereIn('product_id', $products_id)
                        ->update(['expired' => true]);
        }
        return response("order successfully placed", 200);
    }
}
