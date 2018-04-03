import uuid from 'uuid';
import axios from "../api/axiosInstance";
import {ACCESS_TOKEN, ADD_TO_CART, EDIT_CART, EMPTY_CART, REMOVE_FROM_CART} from "../api/strings";
import {addToCartAPI, removeFromCartAPI} from "../api/apiURLs";
// ADD_TO_CART
export const addToCartHelper = (
    {
        productName,
        productImage = undefined,
        sellerName,
        ratings = undefined,
        quantity = 1,
        price,
        productID
    } = {}
) => ({
    type: ADD_TO_CART,
    shoppingCart: {
        id: uuid(),
        productName,
        productImage,
        sellerName,
        ratings,
        quantity,
        price,
        productID
    }
});

// REMOVE_FROM_CART
const removeFromCartHelper = (productID) => ({
    type: REMOVE_FROM_CART,
    productID
});

// EDIT_CART
export const editCart = (productID, updates) => ({
    type: EDIT_CART,
    productID,
    updates
});

// EMPTY_CART
export const emptyCart = () => ({
    type: EMPTY_CART
});

export const removeFromCart = ({ productID } = {}) => {
    return (dispatch, getState) => {
        const {authentication} = getState();
        if(authentication.isAuthenticated){
            // make an API call
            const access_token = window.localStorage.getItem(ACCESS_TOKEN);
            const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};

            axios.delete(removeFromCartAPI(productID), {headers: {...headers}})
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
        dispatch(removeFromCartHelper(productID));
    }
};

export const addToCart = (product = {}) => {
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
            axios.post(addToCartAPI,data, {headers: {...headers}})
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
        dispatch(addToCartHelper(product));
    }
};