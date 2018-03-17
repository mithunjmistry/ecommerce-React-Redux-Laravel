import React from "react";
import {Grid, Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import CheckoutItems from "../components/CheckoutItems";
import NoCheckoutItems from "../components/NoCheckoutItems";

const Checkout = (props) => (
    <Grid>
        <Row>
            <h2 className={"checkout-title"}>Checkout</h2>
            <hr/>
            <Col lg={6} md={6}>
                {props.shoppingCart.length > 0 ? <CheckoutItems/> : <NoCheckoutItems/>}
            </Col>

            <Col lg={6} md={6}>
                <p>Here will be the stepper.</p>
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