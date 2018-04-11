<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderPlaced extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        //
        $this->details = $details;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $data = [
            "full_name" => $this->details["name"],
            "payment_method" => $this->details["paymentMethod"],
            "total_amount" => $this->details["totalAmount"],
            "street1" => $this->details["address1"],
            "street2" => $this->details["address2"],
            "city" => $this->details["city"],
            "state" => $this->details["state"],
            "zip" => $this->details["zip"],
            "phone" => $this->details["phone"],
            "amount_paid" => $this->details["amountDue"]
        ];
        return $this->view('emails.orderconfirmation')
                    ->with($data);
    }
}
