import {ACCESS_TOKEN, ADD_TO_WISHLIST, EMPTY_WISHLIST, REMOVE_FROM_WISHLIST} from "../api/strings";
import {addToWishlistAPI, removeFromWishlistAPI, wishlistToCartAPI} from "../api/apiURLs";
import axios, {getHeaders} from "../api/axiosInstance";
import {addToCartHelper} from "./shoppingCart";

// add to wishlist
export const addToWishlistHelper = (
    {
        productName,
        productImage = undefined,
        sellerName,
        ratings = undefined,
        quantity = 1,
        price,
        productID,
        prevPrice
    } = {}
) => ({
    type: ADD_TO_WISHLIST,
    wishlist: {
        productName,
        productImage,
        sellerName,
        ratings,
        quantity,
        price,
        productID,
        prevPrice
    }
});

// remove from wishlist
const removeFromWishlistHelper = (productID) => ({
    type: REMOVE_FROM_WISHLIST,
    productID
});


// empty wishlist
export const emptyWishlist = () => ({
    type: EMPTY_WISHLIST
});

export const addToWishlist = (product = {}) => {
    return (dispatch, getState) => {
        const {authentication} = getState();
        if(authentication.isAuthenticated){
            // make an API call
            const access_token = window.localStorage.getItem(ACCESS_TOKEN);
            const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};
            const {productID, quantity} = product;
            const data = {
                product_id: productID,
                quantity: quantity
            };
            axios.post(addToWishlistAPI,data, {headers: {...headers}})
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
        dispatch(addToWishlistHelper(product));
    }
};

export const removeFromWishlist = (productID) => {
    return (dispatch, getState) => {
        const {authentication} = getState();
        if(authentication.isAuthenticated){
            // make an API call
            const access_token = window.localStorage.getItem(ACCESS_TOKEN);
            const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};

            axios.delete(removeFromWishlistAPI(productID), {headers: {...headers}})
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
        dispatch(removeFromWishlistHelper(productID));
    }
};

export const addToCartFromWishlist = (product) => {
    return (dispatch) => {
        const {productID} = product;
        const access_token = window.localStorage.getItem(ACCESS_TOKEN);
        const headers = getHeaders(access_token);
        const data = {
            productID
        };
        axios.post(wishlistToCartAPI, data, {headers})
            .then(() => {
                dispatch(removeFromWishlistHelper(productID));
                dispatch(addToCartHelper(product));
            })
            .catch((error) => {
                console.log(error.response);
            })
    }
};

