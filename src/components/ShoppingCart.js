import React from "react";
import {Modal, Button, ListGroup} from "react-bootstrap";
import CustomListGroupItem from "../components/CustomListGroupItemCart";
import { connect } from 'react-redux';

class ShoppingCart extends React.Component{

    render(){
        let itemCount = this.props.shoppingCart.length;
        let CartContent;
        if(itemCount > 0){
            CartContent = () => (
                <div>
                    <ListGroup className={"shopping-cart-listgroup"}>
                        {this.props.shoppingCart.map((item) => {
                            return <CustomListGroupItem key={item.id} {...item} />;
                        })}
                    </ListGroup>
                    <hr/>
                    <div className={"total-cart-label-div"}>
                        <span className={"total-cart-label"}>Total:</span>
                    </div>
                </div>)
        }
        else{
            CartContent = () => (
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
                    <CartContent/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.handleClose}>Continue Shopping</Button>
                    {this.props.shoppingCart.length > 0 &&
                        <Button bsStyle="primary" disabled={this.props.shoppingCart.length === 0}>Checkout</Button>
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

export default connect(mapStateToProps)(ShoppingCart);