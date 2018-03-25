// default state
const shoppingCartReducerDefaultState = [];

// reducer which is a pure function
export default (state = shoppingCartReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            let idAlreadyExists = state.some(function (el) {
                return el.productID === action.shoppingCart.productID;
            });
            if(idAlreadyExists){
                return [
                    ...state
                ];
            }
            else{
                return [
                    ...state,
                    action.shoppingCart
                ];
            }
        case 'REMOVE_FROM_CART':
            return state.filter(({ productID }) => productID !== action.productID);
        case 'EDIT_CART':
            return state.map((shoppingCart) => {
                if (shoppingCart.productID === action.productID) {
                    return {
                        ...shoppingCart,
                        ...action.updates
                    };
                } else {
                    return shoppingCart;
                }
            });
        case 'EMPTY_CART':
            return (state.length = 0);
        default:
            return state;
    }
};