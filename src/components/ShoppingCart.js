import React from "react";
import {Modal, Button} from "react-bootstrap";

class ShoppingCart extends React.Component{

    render(){
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    One fine body...
                    <footer>All our products comes with easy return and 100% customer protection policy.</footer>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.handleClose}>Continue Shopping</Button>
                    <Button bsStyle="primary">Checkout</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ShoppingCart;