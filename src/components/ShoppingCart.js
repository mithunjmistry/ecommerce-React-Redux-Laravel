import React from "react";
import {Modal, Button, ListGroup, Row, Col} from "react-bootstrap";
import CustomListGroupItem from "../components/CustomListGroupItemCart";
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";

class ShoppingCart extends React.Component{

    onCheckoutClick = () => {
      this.props.history.push("/checkout");
    };

    render(){
        let itemCount = this.props.shoppingCart.length;
        let cartContent;
        let total = 0.0;
        if(itemCount > 0){
            cartContent = (
                <div>
                    <ListGroup className={"shopping-cart-listgroup"}>
                        {this.props.shoppingCart.map((item) => {
                            total += item.quantity * item.price;
                            return <CustomListGroupItem key={item.productID} {...item} />;
                        })}
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
                </div>)
        }
        else{
            cartContent = (
                <div>
                    <span>You have no items in your cart. Please choose products from our wide range of selection and add to cart.</span>
                </div>
            )
        }
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {cartContent}
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.handleClose}>Continue Shopping</Button>
                    {this.props.shoppingCart.length > 0 &&
                        <Button bsStyle="primary" onClick={this.onCheckoutClick}>Checkout</Button>
                    }
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        shoppingCart: state.shoppingCart
    };
};

export default connect(mapStateToProps)(withRouter(ShoppingCart));