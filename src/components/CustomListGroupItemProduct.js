import React from "react";
import {Button, Row, Col} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import StarRatingComponent from 'react-star-ratings';
import {addToCart} from "../actions/shoppingCart";
import {image} from "./image";
import { connect } from 'react-redux';

class CustomListGroupItemProduct extends React.Component{

    addToCartOnClick = () => {
        // dispatching an action to redux store
        const product = {
            productName: this.props.children,
            productImage: image,
            sellerName: this.props.sellerName,
            ratings: this.props.ratings ? this.props.ratings : undefined,
            quantity: 1,
            price: this.props.currentPrice,
            productID: this.props.productID
        };
        this.props.dispatch(addToCart(product));
    };

    viewClickHandler = (routeName) => {
        this.props.history.push(routeName);
    };

    render() {
        return (
            <li className="list-group-item">
                <div className={"media-left"}>
                    <img className="media-object" src={image} alt="..." />
                </div>
                <div className={"media-body"}>
                    <Row>
                        <Col lg={7} md={7} sm={12} xs={12}>
                            <h4 className={"media-heading"}>{this.props.children}</h4>
                            <div className={"seller-name-div"}>
                                <span>{this.props.sellerName}</span>
                            </div>
                            <div>
                                {this.props.prevPrice && <span className={"subcategory-deal-price-st"}>${this.props.prevPrice} </span>}
                                <span className={"subcategory-deal-price"}>${this.props.currentPrice}</span>
                            </div>
                        </Col>

                        <Col lg={3} md={3} sm={12} xs={12}>
                            <div className={"star-rating-div"}>
                                {(this.props.ratings && this.props.ratings > 0) ?
                                    <StarRatingComponent
                                        rating={this.props.ratings}
                                        starDimension={"20px"}
                                        starSpacing={"0px"}
                                        starRatedColor={"rgb(247, 202, 37)"}
                                    />
                                    :
                                    <span className={"not-enough-ratings-span"}>Not enough ratings</span>
                                }
                            </div>
                        </Col>

                        <Col md={2} lg={2} sm={12} xs={12}>
                            <div>
                              <span>
                                  <Button bsStyle={"default"} className={"btn-sm view-atc-button"} onClick={() => this.viewClickHandler(`/product/${this.props.productID}`)}>View</Button>
                                  <Button bsStyle={"primary"} className={"btn-sm view-atc-button"} onClick={this.addToCartOnClick}>Add to Cart</Button>
                              </span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </li>
        )
    }
}

export default connect()(withRouter(CustomListGroupItemProduct));