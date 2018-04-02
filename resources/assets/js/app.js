import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import '../sass/app.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {addToCart} from "./actions/shoppingCart";
import {imageWatch} from "./components/image";
import axios from "./api/axiosInstance";
import {getUserAPI} from "./api/apiURLs";
import {loginUser, logoutUser} from "./actions/authentication";
import {ACCESS_TOKEN} from "./api/strings";

const store = configureStore();
console.log(store.getState());

const App = () => (
    <MuiThemeProvider>
        <AppRouter />
    </MuiThemeProvider>
);

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
);

const product = {
    productName: "Product Name",
    productImage: imageWatch,
    sellerName: "Seller Name",
    quantity: 1,
    price: 19.99,
    productID: 1
};
store.dispatch(addToCart(product));

// initial load, check if user is logged in
const access_token = window.localStorage.getItem(ACCESS_TOKEN);
const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};
axios.get(getUserAPI, {headers})
    .then((response) => {
        store.dispatch(loginUser());
    })
    .catch((error) => {
        window.localStorage.removeItem(ACCESS_TOKEN);
        store.dispatch(logoutUser());
    });

const appRoot = document.getElementById('app');
ReactDOM.render(jsx, appRoot);