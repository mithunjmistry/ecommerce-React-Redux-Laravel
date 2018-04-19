import React from "react";
import {Grid, Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import CheckoutItems from "../components/CheckoutItems";
import NoCheckoutItems from "../components/NoCheckoutItems";
import CheckoutInformation from "../components/CheckoutInformation";

const Checkout = (props) => (
    <Grid className={"minimum-height"}>
        <Row>
            <h2 className={"checkout-title"}>Checkout</h2>
            <hr/>
            <Col lg={6} md={6}>
                {props.shoppingCart.length > 0 ? <CheckoutItems/> : <NoCheckoutItems/>}
            </Col>

            <Col lg={6} md={6}>
                {props.shoppingCart.length > 0 ? <CheckoutInformation/> : ''}
            </Col>
        </Row>
    </Grid>
);

const mapStateToProps = (state) => {
    return {
        shoppingCart: state.shoppingCart
    };
};

export default connect(mapStateToProps)(Checkout);