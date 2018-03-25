import { createStore, combineReducers } from 'redux';
import filtersReducer from '../reducers/filters';
import shoppingCartReducer from '../reducers/shoppingcart';

export default () => {
    const store = createStore(
        combineReducers({
            filters: filtersReducer,
            shoppingCart: shoppingCartReducer
        })
    );

    return store;
};