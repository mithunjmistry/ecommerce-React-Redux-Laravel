import React from "react";
import {Modal, Button, ListGroup} from "react-bootstrap";
import CustomListGroupItem from "../components/CustomListGroupItemCart";
import { connect } from 'react-redux';

class ShoppingCart extends React.Component{

    render(){
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ListGroup className={"shopping-cart-listgroup"}>
                        {this.props.shoppingCart.map((item) => {
                            return <CustomListGroupItem key={item.id} {...item} />;
                        })}
                    </ListGroup>
                    <hr/>
                    <div className={"total-cart-label-div"}>
                        <span className={"total-cart-label"}>Total:</span>
                    </div>
                    {/*<footer>All our products comes with easy return and 100% customer protection policy.</footer>*/}
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.handleClose}>Continue Shopping</Button>
                    <Button bsStyle="primary">Checkout</Button>
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