// default state
const shoppingCartReducerDefaultState = [];

// reducer which is a pure function
export default (state = shoppingCartReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [
                ...state,
                action.shoppingCart
            ];
        case 'REMOVE_FROM_CART':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_CART':
            return state.map((shoppingCart) => {
                if (shoppingCart.id === action.id) {
                    return {
                        ...shoppingCart,
                        ...action.updates
                    };
                } else {
                    return shoppingCart;
                }
            });
        default:
            return state;
    }
};