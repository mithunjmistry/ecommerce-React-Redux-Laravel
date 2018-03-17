import React from "react";
import {ListGroup} from "react-bootstrap";
import {connect} from "react-redux";
import CustomListGroupItem from "../components/CustomListGroupItemCheckout";

const CheckoutItems = (props) => (
    <div>
        <h4>Item(s) for checkout: </h4>
        <ListGroup className={"checkout-items-listgroup"}>
            {props.shoppingCart.map((item) => (
                <CustomListGroupItem key={item.productID} {...item} />
            ))}
        </ListGroup>
    </div>
);

const mapStateToProps = (state) => {
    return {
        shoppingCart: state.shoppingCart
    };
};

export default connect(mapStateToProps)(CheckoutItems);