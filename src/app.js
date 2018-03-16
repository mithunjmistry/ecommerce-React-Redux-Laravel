import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


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

const appRoot = document.getElementById('app');
ReactDOM.render(jsx, appRoot);