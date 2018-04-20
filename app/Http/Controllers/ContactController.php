<?php

namespace App\Http\Controllers;

use App\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Verifalia;

class ContactController extends Controller
{
    //
    public function validate_email($email){
        $verifalia = new Verifalia\Client(env('VERIFALIA_SID'), env('VERIFALIA_PASSWORD'));
        $validation_status = null;

        try {
            // Submits the email addresses to Verifalia and waits until the engine
            // complete its validation.

            $job = $verifalia
                ->emailValidations
                ->submit($email, NULL);

            $validation_status = $job->entries[0]->status;
        }
        catch (\Exception $ex) {
            Log::info($ex);
            $validation_status = "success";
        }

        $validation_status = strtolower(trim($validation_status));
        if($validation_status == "success"){
            return true;
        }

        return false;
    }


    public function contact(Request $request){
        $contact = Contact::where('email', $request['email'])
                            ->orWhere('name', $request['name'])
                            ->first();
        if($contact){
            if($contact->is_valid) {
                return response('You have already contacted. Please wait for me to respond or visit www.mithunjmistry.com', 400);
            }
            else{
                return response('You already tried to bypass the system. Unfortunately it is not that easy. Keep trying and you will soon be blocked to submit the form.', 400);
            }
        }
        else if($this->validate_email($request['email'])){
            Log::info("Comes in else if loop");
            $c = new Contact();
            $c->email = $request['email'];
            $c->name = $request['name'];
            $c->message = $request['message'];
            $c->is_valid = true;
            $c->save();

            return response('contact saved successfully');
        }
        else{
            $c = new Contact();
            $c->email = $request['email'];
            $c->name = $request['name'];
            $c->message = $request['message'];
            $c->save();

            return response('This is not a valid email. It is a high tech site and it obviously has an algorithm to check if your email really exists. It is not just a Regex validation! Good try', 400);
        }

    }


}
