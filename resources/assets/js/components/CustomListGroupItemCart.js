import React from "react";
import {Row, Col, Button, FormControl, Glyphicon, Tooltip, OverlayTrigger} from "react-bootstrap";
import StarRatingComponent from 'react-star-ratings';
import ProductInfo from "./ProductInfo";
import { connect } from 'react-redux';
import {editCart} from "../actions/shoppingCart";

const tooltip = (
    <Tooltip id="tooltip">
        Remove Item
    </Tooltip>
);

class CustomListGroupItemCart extends React.Component{

    state = {
        quantity: this.props.quantity,
        productID: this.props.productID
    };

    editCart = (quantity) => {
        let updates = {
          quantity
        };
        this.props.dispatch(editCart(this.state.productID, updates));
    };

    onQuantityChange = (e) => {
        let quantity = e.target.value;
        this.setState(() => ({quantity}));
    };

    onQuantityIncrease = () => {
        if(parseInt(this.state.quantity) < 99){
            this.setState((prevState) => ({quantity: prevState.quantity + 1}));
            this.editCart(parseInt(this.state.quantity) + 1);
        }
    };

    onQuantityDecrease = () => {
        if(parseInt(this.state.quantity) > 1) {
            this.setState((prevState) => ({quantity: prevState.quantity - 1}));
            this.editCart(parseInt(this.state.quantity) - 1);
        }
    };

    onQuantityBlur = (e) => {
        let quantity = e.target.value;
        if(quantity.length > 0 && parseInt(quantity) > 0 && parseInt(quantity) < 100){
            this.setState(() => ({quantity}));
            this.editCart(parseInt(quantity));
        }
        else{
            this.setState(() => ({quantity: 1}));
            this.editCart(1);
        }
    };

    removeFromCart = () => {
        ProductInfo.removeItemFromCart(this.props.productID, this.props);
    };

    render() {
        return (
            <li className="list-group-item">
                <div className={"media-left"}>
                    <img className="media-object" src={this.props.productImage} alt="..." width={64} height={64} />
                </div>
                <div className={"media-body"}>
                    <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <h4 className={"media-heading"}>{this.props.productName}</h4>
                            <div className={"seller-name-div"}>
                                <span>{this.props.sellerName}</span>
                            </div>
                            <div>
                                {(this.props.ratings && this.props.ratings > 0) ?
                                    <StarRatingComponent
                                        rating={this.props.ratings}
                                        starDimension={"15px"}
                                        starSpacing={"0px"}
                                        starRatedColor={"rgb(247, 202, 37)"}
                                    />
                                    :
                                    ''
                                }
                            </div>
                        </Col>

                        <Col lg={3} md={3} sm={12} xs={12}>
                            <div className={"star-rating-div"}>
                                <span>
                                    <Button onClick={this.onQuantityDecrease}>-</Button>
                                    <FormControl
                                        type="number"
                                        className={"cart-quantity"}
                                        value={this.state.quantity}
                                        onChange={this.onQuantityChange}
                                        onBlur={this.onQuantityBlur}
                                    />
                                    <Button onClick={this.onQuantityIncrease}>+</Button>
                                </span>
                            </div>
                        </Col>

                        <Col md={2} lg={2} sm={12} xs={12}>
                            <div className={"cart-price-div"}>
                              <span className={"cart-price"}>
                                  ${parseFloat(parseFloat(this.props.price) * parseInt(this.state.quantity)).toFixed(2)}
                              </span>
                            </div>
                        </Col>

                        <Col md={1} lg={1} sm={12} xs={12}>
                            <div className={"cart-remove-div"}>
                                <OverlayTrigger placement="top" overlay={tooltip}>
                                    <span onClick={this.removeFromCart}><Glyphicon glyph={"remove"}/></span>
                                </OverlayTrigger>
                            </div>
                        </Col>
                    </Row>
                </div>
            </li>
        )
    }
}

export default connect()(CustomListGroupItemCart);