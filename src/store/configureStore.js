import { createStore, combineReducers } from 'redux';
import filtersReducer from '../reducers/filters';

export default () => {
    const store = createStore(
        combineReducers({
            filters: filtersReducer
        })
    );

    return store;
};