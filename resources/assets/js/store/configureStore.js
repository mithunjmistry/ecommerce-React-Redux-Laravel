import { createStore, combineReducers, applyMiddleware } from 'redux';
import shoppingCartReducer from '../reducers/shoppingcart';
import authenticationReducer from '../reducers/authentication';
import wishlistReducer from '../reducers/wishlist';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    shoppingCart: shoppingCartReducer,
    authentication: authenticationReducer,
    wishlist: wishlistReducer
});

export default () => {
    const store = createStore(
        rootReducer,
        applyMiddleware(thunk)
    );

    return store;
};