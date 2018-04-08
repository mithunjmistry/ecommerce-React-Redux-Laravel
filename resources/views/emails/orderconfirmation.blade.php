<div>
    <p>Hi {{ $full_name }},</p>
    <p>Your order is being placed successfully. Here are the details - </p>
    <p><strong>Payment method: </strong>{{ $payment_method }}</p>
    <p><strong>Order Total: </strong>${{$total_amount}}</p>
    <p><strong>Phone: </strong>{!! $phone !!}</p>
    <p><strong>Shipping address: </strong></p>
    <p>{{ $full_name }}<br>
        {!! $street1 !!}<br>
        @if(!empty($street2)) {!! $street2 !!} <br>@endif
        {!! $city !!}, {!! $state !!}, {!! $zip !!}</p>
    <p>You should receive your order within 1-3 days.</p>
    <p>Thank you for shopping with us. Feel free to contact us if you have any questions.</p>
</div>