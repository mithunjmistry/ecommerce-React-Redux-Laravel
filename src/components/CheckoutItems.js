import React from "react";
import {ListGroup, Row, Col} from "react-bootstrap";
import {connect} from "react-redux";
import CustomListGroupItem from "../components/CustomListGroupItemCheckout";

class CheckoutItems extends React.Component{
    render(){
        let total = 0;
        return (
            <div>
                <h4>Item(s) for checkout: </h4>
                <br/>
                <ListGroup className={"checkout-items-listgroup"}>
                    {
                        this.props.shoppingCart.map((item) => {
                            total += item.quantity * item.price;
                            return <CustomListGroupItem key={item.productID} {...item} />
                        })
                    }
                </ListGroup>
                <hr/>
                <div className={"total-cart-label-div"}>
                    <Row>
                        <Col lg={10} md={10}>
                            <span className={"total-cart-label"}>Total:</span>
                        </Col>

                        <Col lg={2} md={2}>
                            <span className={"total-cart-amount"}>${total.toFixed(2)}</span>
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