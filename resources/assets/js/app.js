import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import '../sass/app.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {addToCart, addToCartHelper} from "./actions/shoppingCart";
import {imageWatch} from "./components/image";
import axios from "./api/axiosInstance";
import {getUserAPI, getUserCartAPI} from "./api/apiURLs";
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

// initial load, check if user is logged in
const access_token = window.localStorage.getItem(ACCESS_TOKEN);
const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};
axios.get(getUserCartAPI, {headers})
    .then((response) => {
        store.dispatch(loginUser());
        response.data.map((item) => {
            const productName = item.name;
            const productImage = item.image;
            const sellerName = item.sellerName;
            const ratings = item.ratings;
            const quantity = 1;
            const price = item.price;
            const productID = item.productId;
            const product = {
                productName,
                productImage,
                sellerName,
                ratings,
                quantity,
                price,
                productID
            };
            store.dispatch(addToCartHelper(product));
        })
    })
    .catch((error) => {
        window.localStorage.removeItem(ACCESS_TOKEN);
        store.dispatch(logoutUser());
    });

const appRoot = document.getElementById('app');
ReactDOM.render(jsx, appRoot);