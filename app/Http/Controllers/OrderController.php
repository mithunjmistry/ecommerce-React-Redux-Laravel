<?php

namespace App\Http\Controllers;

use App\Mail\OrderPlaced;
use App\Order;
use App\OrderItem;
use App\Payment;
use App\PaymentMethod;
use App\PromoCode;
use App\ShippingOption;
use App\ShoppingCart;
use App\User;
use App\UserPromoCode;
use function foo\func;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

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
        $amount_paid = $request['amountDue'];

        $payment_method = PaymentMethod::where('paymentMethod', $request['paymentMethod'])->first();

        DB::transaction(function () use ($amount_paid, $datetime, $payment_method, $total_amount, $user, $request, $user_id) {

            $payment = new Payment();
            $payment->amount = $amount_paid;
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
            $order->promoCodeId = $request['promoCodeId'];
            $order->save();

            if ($request['promoCodeId']) {
                $user_promo_code_used = new UserPromoCode();
                $user_promo_code_used->userId = $user_id;
                $user_promo_code_used->promoCodeId = $request['promoCodeId'];
                $user_promo_code_used->save();
            }

            $products = $request['products'];
            $products_id = [];
            foreach ($products as $product) {
                $order_item = new OrderItem();
                $order_item->quantity = $product['quantity'];
                $order_item->productId = $product['productId'];
                $order_item->price = $product['price'];
                $order_item->orderId = $order->orderId;
                $order_item->save();

                array_push($products_id, $product['productId']);
            }

            if ($user) {
                ShoppingCart::where('userId', $user_id)
                    ->where('wishList', false)
                    ->whereIn('product_id', $products_id)
                    ->update(['expired' => true]);
            }
        });

        Mail::to("ecommerceccare@gmail.com")->send(new OrderPlaced($request));

        return response("order successfully placed", 200);
    }

    public function get_user_orders(){
        $user = Auth::user();
        $user_orders = $user->orders->each(function ($order){
            $order->orderItems->each(function ($orderItem){
               $orderItem->product->photo;
            });
        });

        return response()->json($user_orders);
    }

    public function order_detail($order_id){
        $user = Auth::user();
        $order = Order::where('orderId', $order_id)->where('userId', $user->userId)->first();
        if($order){
            $order->orderItems->each(function ($orderItem){
                $orderItem->product;
            });

            $order->payment->paymentMethodData;

            $order->promoCode;

            return response()->json($order);
        }
        return response("Invalid Order", 400);
    }

    public function validate_promo_code($user, $promoCode){
        $datetime = date("Y-m-d H:i:s");
        $promo_code = PromoCode::where('promoCode', $promoCode)
                                ->where('beginsOn', '<', $datetime)
                                ->where('endsOn', '>', $datetime)
                                ->with(['usedBy' => function($query) use($user){
                                    $query->where('userId', $user->userId);
                                }])->first();
        return $promo_code;
    }

    public function validate_promo_api(Request $request){
        $user = Auth::user();
        $promo = $this->validate_promo_code($user, $request['promoCode']);
        if($promo){
            return response()->json($promo);
        }
        return response("Invalid promo code.", 400);
    }

//    public function test_email(){
//        $details = array (
//            'address1' => '40579 Stoughton Place',
//            'address2' => 'Anniversary',
//            'city' => 'Boca Raton',
//            'state' => 'FL',
//            'zip' => '33499',
//            'phone' => '5614980338',
//            'name' => 'Mithun Mistry',
//            'email' => 'demo@email.com',
//            'totalAmount' => 660.81,
//            'paymentMethod' => "Credit Card",
//            'products' =>
//                array (
//                    0 =>
//                        array (
//                            'productId' => 27,
//                            'quantity' => 1,
//                        ),
//                    1 =>
//                        array (
//                            'productId' => 46,
//                            'quantity' => 1,
//                        ),
//                ),
//        );
//        Mail::to("ecommerceccare@gmail.com")->send(new OrderPlaced($details));
//
//        return response('sent email');
//    }
}
