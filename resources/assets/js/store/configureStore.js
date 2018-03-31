import { createStore, combineReducers } from 'redux';
import filtersReducer from '../reducers/filters';
import shoppingCartReducer from '../reducers/shoppingcart';
import authenticationReducer from '../reducers/authentication';

export default () => {
    const store = createStore(
        combineReducers({
            filters: filtersReducer,
            shoppingCart: shoppingCartReducer,
            authentication: authenticationReducer
        })
    );

    return store;
};