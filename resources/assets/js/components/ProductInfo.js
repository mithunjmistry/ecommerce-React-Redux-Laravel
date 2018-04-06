import React from "react";
import {Grid, Row, Col, ControlLabel, FormGroup, FormControl, Button, Glyphicon} from "react-bootstrap";
import ReactImageZoom from 'react-image-zoom';
import StarRatingComponent from 'react-star-ratings';
import {imageWatch} from "./image";
import {addToCart, removeFromCart} from "../actions/shoppingCart";
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import axios from "../api/axiosInstance";
import {productInfoAPI} from "../api/apiURLs";
import LoadingScreen from "../components/LoadingScreen";
import InformationPanel from "../components/InformationPanel";
import {addToWishlist} from "../actions/wishlist";

class ProductInfo extends React.Component {

    state = {
      product: {},
      prevPrice: null,
      productImage: imageWatch,
      quantity: 1,
      numberOfRatings: 239,
      productID: undefined,
      autoHideDuration: 3000,
      snackbarOpen:false,
      isLoading: false,
      productNotFound: false
    };

    loadProductDetails = (productID) => {
        this.setState(() => ({productID, isLoading:true}));
        const url = productInfoAPI(productID);
        axios.get(url).then((response) => (this.setState(
            {
                product: response.data,
                isLoading: false,
                productNotFound: false
            }
        ))).catch((error) => (
            this.setState(() => ({
                isLoading: false,
                productNotFound: true
            }))
        ));
    };

    componentWillReceiveProps(nextProps){
        if(this.props.match.params.id !== nextProps.match.params.id){
            let productID = nextProps.match.params.id;
            this.loadProductDetails(productID);
        }
    }

    componentDidMount(){
        let productID = this.props.match.params.id;
        // load the product details here
        this.loadProductDetails(productID);
    }

    addToCartOnClick = () => {
        // dispatching an action to redux store
        const product = {
            productName: this.state.product.name,
            productImage: this.state.productImage,
            sellerName: this.state.product.sellerName,
            ratings: this.state.product.ratings,
            quantity: this.state.quantity,
            price: this.state.product.price,
            productID: this.state.productID
        };
        this.props.dispatch(addToCart(product));
        this.setState(() => ({snackbarOpen: true}))
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

    handleSnackbarRequestClose = () => {
        this.setState({
            snackbarOpen: false,
        });
    };

    static removeItemFromCart = (productID, props) => {
        let productToRemove = {
            productID
        };
        props.dispatch(removeFromCart(productToRemove));
    };

    handleUndoAction = () => {
        ProductInfo.removeItemFromCart(this.state.productID, this.props);
    };

    handleAddToWishlist = () => {
        const product = {
            productName: this.state.product.name,
            productImage: this.state.productImage,
            sellerName: this.state.product.sellerName,
            ratings: this.state.product.ratings,
            quantity: this.state.quantity,
            price: this.state.product.price,
            productID: this.state.productID,
            prevPrice: this.state.product.originalPrice
        };
        this.props.dispatch(addToWishlist(product));
    };

    render(){

        if(this.state.isLoading){
            return <LoadingScreen/>
        }
        else if(this.state.productNotFound){
            return <InformationPanel
                    panelTitle={"Product Not available"}
                    informationHeading={"You are on the wrong page!"}
                    message={"Please click on the appropriate product link to view this product."}
                    />
        }

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
                            <h2>{this.state.product.name}</h2>
                            <div className={"product-info-star-rating"}>
                                {(this.state.product.ratings && this.state.product.ratings > 0) ?
                                    <div>
                                        <StarRatingComponent
                                            rating={this.state.product.ratings}
                                            starDimension={"20px"}
                                            starSpacing={"0px"}
                                            starRatedColor={"rgb(247, 202, 37)"}
                                        />
                                        {this.state.product.numberOfRatings &&
                                            <span className={"product-info-number-of-ratings"}>
                                                {this.state.product.numberOfRatings} ratings
                                            </span>
                                        }
                                    </div>
                                    :
                                    <span className={"not-enough-ratings-span"}>Not enough ratings</span>
                                }
                            </div>
                            <div className={"product-info-seller-name"}>
                                <span>Sold by: {this.state.product.sellerName}</span>
                            </div>
                            <hr />
                        </div>

                        <div className={"product-info-price"}>
                            {this.state.product.originalPrice &&
                            <span className={"product-deal-price-st"}>${this.state.product.originalPrice} </span>}
                            <span className={"product-deal-price"}>${this.state.product.price}</span>
                            {this.state.product.originalPrice &&
                                <p className={"product-info-savings"}>
                                    You save - ${(this.state.product.originalPrice - this.state.product.price).toFixed(2)}
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

                        {this.state.product.fastShipping ?
                        <div className={"product-info-left-margin margin-bottom-three"}>
                            <span className={"fast-shipping-span"}>
                                <Glyphicon glyph={"ok"} className={"color-darkcyan"}/> This item qualifies for fast shipping.
                            </span>
                        </div> : ''}

                        <div className={"product-info-left-margin"}>
                            <span>
                                <Button
                                    bsStyle={"primary"}
                                    className={"add-to-cart-product"}
                                    onClick={this.addToCartOnClick}
                                >Add to Cart
                                </Button>
                                <Button onClick={this.handleAddToWishlist}>Add to Wishlist</Button>
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
                            <p className={"product-description"}>{this.state.product.productDescription}</p>
                        </div>
                    </Col>
                </Row>

                <div>
                    <Snackbar
                        open={this.state.snackbarOpen}
                        message={"Added to Cart"}
                        action="undo"
                        autoHideDuration={this.state.autoHideDuration}
                        onActionClick={this.handleUndoAction}
                        onRequestClose={this.handleSnackbarRequestClose}
                    />
                </div>
            </Grid>

        )
    }
}

export default connect()(ProductInfo);