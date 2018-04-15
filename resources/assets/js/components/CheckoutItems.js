import React from "react";
import {ListGroup, Row, Col} from "react-bootstrap";
import {connect} from "react-redux";
import CustomListGroupItem from "../components/CustomListGroupItemCheckout";
import {totalReducer} from "./ShoppingCart";

class CheckoutItems extends React.Component{
    render(){
        let total = this.props.shoppingCart.reduce(totalReducer, 0);
        return (
            <div>
                <h4>Item(s) for checkout: </h4>
                <br/>
                <ListGroup className={"checkout-items-listgroup"}>
                    {
                        this.props.shoppingCart.map((item) => {
                            return <CustomListGroupItem key={item.productID} {...item} />
                        })
                    }
                </ListGroup>
                <hr/>
                <div className={"total-cart-label-div"}>
                    <Row>
                        <Col lg={9} md={9}>
                            <span className={"total-cart-label"}>Total:</span>
                        </Col>

                        <Col lg={3} md={3}>
                            <span className={"total-cart-amount"}>${parseFloat(total).toFixed(2)}</span>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        shoppingCart: state.shoppingCart
    };
};

export default connect(mapStateToProps)(CheckoutItems);