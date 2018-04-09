import React from "react";
import {Link} from "react-router-dom";
import {Panel, Glyphicon} from "react-bootstrap";

const OrderConfirmation = (props) => (
    <div>
        <Panel bsStyle="success">
            <Panel.Heading>
                <Panel.Title componentClass="h3">Order Placed Successfully</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <h4>Thank you for shopping with us.</h4>
                {!props.isAuthenticated &&
                <p>You will shortly receive an email with order details. Sign up with us for better experience.</p>}
                <p>Browse more items to shop in your future</p>
                <div>
                    <Glyphicon glyph={"shopping-cart"} className={"empty-checkout-size"}/>
                </div>
                <Link to={"/"}>Continue Shopping</Link>
            </Panel.Body>
        </Panel>
    </div>
);

export default OrderConfirmation;