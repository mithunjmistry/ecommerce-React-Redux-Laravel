// default state
import {ADD_TO_CART, EDIT_CART, EMPTY_CART, REMOVE_FROM_CART} from "../api/strings";

const shoppingCartReducerDefaultState = [];

// reducer which is a pure function
export default (state = shoppingCartReducerDefaultState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            let idAlreadyExists = state.some(function (el) {
                return el.productID.toString() === action.shoppingCart.productID.toString();
            });
            if(idAlreadyExists){
                return state;
            }
            else{
                return [
                    ...state,
                    action.shoppingCart
                ];
            }
        case REMOVE_FROM_CART:
            return state.filter(({ productID }) => productID.toString() !== action.productID.toString());
        case EDIT_CART:
            return state.map((shoppingCart) => {
                if (shoppingCart.productID.toString() === action.productID.toString()) {
                    return {
                        ...shoppingCart,
                        ...action.updates
                    };
                } else {
                    return shoppingCart;
                }
            });
        case EMPTY_CART:
            return shoppingCartReducerDefaultState;
        default:
            return state;
    }
};