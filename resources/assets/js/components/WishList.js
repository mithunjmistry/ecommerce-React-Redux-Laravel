import React from "react";
import {Panel} from "react-bootstrap";
import axios from '../api/axiosInstance';
import LoadingScreen from '../components/LoadingScreen';
import CustomListGroupItem from './CustomListGroupItemWishlist';
import {getUserWishlistAPI} from "../api/apiURLs";
import {ACCESS_TOKEN} from "../api/strings";
import {getHeaders} from "../api/axiosInstance";
import {connect} from "react-redux";
import {addToWishlistHelper} from "../actions/wishlist";
import {imageWatch} from "./image";

class WishList extends React.Component{

    state = {
        isLoading: false
    };

    componentDidMount(){
        // load the wishlist of the user here
        this.setState(() => ({isLoading: true}));
        const access_token = window.localStorage.getItem(ACCESS_TOKEN);
        const headers = getHeaders(access_token);
        axios.get(getUserWishlistAPI, {headers})
            .then((response) => {
                const products = response.data;
                products.map((item) => {
                   this.props.dispatch(addToWishlistHelper({
                       productName: item.name,
                       productImage: imageWatch,
                       sellerName: item.sellerName,
                       ratings: item.ratings,
                       quantity: 1,
                       price: item.price,
                       productID: item.productId,
                       prevPrice: item.originalPrice
                   }));
                });
                this.setState(() => ({isLoading: false}));
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    render(){
        if(this.state.isLoading){
            return <LoadingScreen/>
        }

        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title componentClass="h3" className={"text-center"}>My Wishlist</Panel.Title>
                </Panel.Heading>
                <Panel.Body className={"wishlist-panel"}>
                    {this.props.wishlist.length > 0 ? this.props.wishlist.map((item, key) => (
                        <CustomListGroupItem
                            key={key}
                            currentPrice={item.price}
                            prevPrice={item.prevPrice}
                            sellerName={item.sellerName}
                            ratings={item.ratings}
                            productID={item.productID}
                        >
                            {item.productName}
                        </CustomListGroupItem>
                    )) :
                    <p className={"text-center"}>You have no items in your wishlist.</p>}
                </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        wishlist: state.wishlist
    };
};

export default connect(mapStateToProps)(WishList);
