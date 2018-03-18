import React from "react";
import {Link} from "react-router-dom";
import {Panel, Glyphicon} from "react-bootstrap";

const NoCheckoutItems = () => (
    <div>
        <Panel bsStyle="primary">
            <Panel.Heading>
                <Panel.Title componentClass="h3">Your cart is empty</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <h4>There are no items to checkout</h4>
                <p>Browse our wide range of collections or search for your product to get started</p>
                <div>
                    <Glyphicon glyph={"shopping-cart"} className={"empty-checkout-size"}/>
                </div>
                <Link to={"/"}>Continue Shopping</Link>
            </Panel.Body>
        </Panel>
    </div>
);

export default NoCheckoutItems;