import React from "react";
import {Grid, Row, Col, ControlLabel, FormGroup, FormControl, Button} from "react-bootstrap";
import ReactImageZoom from 'react-image-zoom';
import StarRatingComponent from 'react-star-ratings';
import {imageWatch} from "./image";
import {addToCart} from "../actions/shoppingCart";
import { connect } from 'react-redux';

const items = [];
for (let i = 1; i < 6; i++ ) {
    items.push(<option value={i} key={i}>{i}</option>);
}

class ProductInfo extends React.Component {

    state = {
      ratings: 4.3,
      prevPrice: 40.00,
      currentPrice: 20.00,
      productName: "Product Name",
      productImage: imageWatch,
      quantity: 1,
      numberOfRatings: 239,
      description: "This is some product description.",
      sellerName: "Seller Name"
    };

    addToCartOnClick = () => {
        // dispatching an action to redux store
        const product = {
            productName: this.state.productName,
            productImage: this.state.productImage,
            sellerName: this.state.sellerName,
            ratings: this.state.ratings,
            quantity: this.state.quantity,
            price: this.state.currentPrice
        };
        this.props.dispatch(addToCart(product));
    };

    onQuantityChange = (e) => {
        let quantity = e.target.value;
        if(parseInt(quantity.length) < 3){
            this.setState(() => ({quantity}));
        }
    };

    onQuantityBlur = () => {
        if(this.state.quantity.length === 0 || (this.state.quantity.length > 0 && parseInt(this.state.quantity) < 1)){
            this.setState(() => ({quantity: 1}))
        }
    };

    render(){
        return (
            <Grid>
                <Row>
                    <Col lg={4} md={4}>
                        <div className={"margin-div-five"}>
                            <ReactImageZoom {...{
                                width: 200,
                                height: 250,
                                zoomWidth: 500,
                                img: this.state.productImage,
                                zoomStyle: 'z-index: 999;',
                            }} />
                        </div>
                        <p className={"margin-div-five"}>Scroll over the image to zoom</p>
                    </Col>

                    <Col lg={6} md={6}>
                        <div className={"margin-div-five"}>
                            <h2>{this.state.productName}</h2>
                            <div className={"product-info-star-rating"}>
                                {(this.state.ratings && this.state.ratings > 0) ?
                                    <div>
                                        <StarRatingComponent
                                            rating={this.state.ratings}
                                            starDimension={"20px"}
                                            starSpacing={"0px"}
                                            starRatedColor={"rgb(247, 202, 37)"}
                                        />
                                        {this.state.numberOfRatings &&
                                            <span className={"product-info-number-of-ratings"}>
                                                {this.state.numberOfRatings} ratings
                                            </span>
                                        }
                                    </div>
                                    :
                                    <span className={"not-enough-ratings-span"}>Not enough ratings</span>
                                }
                            </div>
                            <div className={"product-info-seller-name"}>
                                <span>Sold by: {this.state.sellerName}</span>
                            </div>
                            <hr />
                        </div>

                        <div className={"product-info-price"}>
                            {this.state.prevPrice &&
                            <span className={"product-deal-price-st"}>${this.state.prevPrice} </span>}
                            <span className={"product-deal-price"}>${this.state.currentPrice}</span>
                            {this.state.prevPrice &&
                                <p className={"product-info-savings"}>
                                    You save - ${this.state.prevPrice - this.state.currentPrice}
                                </p>
                            }
                        </div>

                        <div className={"product-info-left-margin"}>
                            <FormGroup controlId="formQuantitySelect" className={"quantity-select"}>
                                <ControlLabel>Quantity</ControlLabel>
                                <FormControl
                                    type="number"
                                    value={this.state.quantity}
                                    onChange={this.onQuantityChange}
                                    onBlur={this.onQuantityBlur}
                                />
                            </FormGroup>
                        </div>

                        <div className={"product-info-left-margin"}>
                            <span>
                                <Button
                                    bsStyle={"primary"}
                                    className={"add-to-cart-product"}
                                    onClick={this.addToCartOnClick}
                                >Add to Cart
                                </Button>
                                <Button>Add to Wishlist</Button>
                            </span>
                        </div>
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col lgOffset={4} mdOffset={4} lg={6} md={6}>
                        <div className={"product-info-left-margin"}>
                            <h2 className={"product-description-heading"}>Product Description:</h2>
                            <hr/>
                            <p className={"product-description"}>{this.state.description}</p>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default connect()(ProductInfo);