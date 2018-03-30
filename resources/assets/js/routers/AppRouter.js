import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../components/HomePage';
import Category from '../components/CategoryBase';
import SubCategory from '../components/SubCategory';
import SearchResultsComponent from '../components/SearchResultsComponent';
import ProductInfo from '../components/ProductInfo';
import axios from 'axios';

import { Grid, Col, Row, Carousel } from 'react-bootstrap';

import { BrowserRouter, Switch, Route, NavLink, Link } from 'react-router-dom';
import Checkout from "../components/Checkout";
import Order from "../components/Order";
import LoadingScreen from "../components/LoadingScreen";
import LoginComponent from "../components/LoginComponent";
import RegistrationComponent from "../components/RegistrationComponent";

const portfolioPage = () => (
    <div>
        <p>This is the portfolio page.</p>
        <Link to="/portfolio/1">Portfolio 1</Link>
        <br />
        <Link to="/portfolio/2">Portfolio 2</Link>
    </div>
);

const portfolioArticlePage = (props) => (
    <div>
        <p>This is the portfolio article {props.match.params.id}.</p>
    </div>
);

const helpPage = (props) => (
    <div>
        <p>This is the help page. {props.match.params.subcategory}</p>
        {/*<p>{props.match.params.id}</p>*/}
    </div>
);

const noMatchFound = () => (
    <div>
        404! No page found.
        <br />
        <Link to="/">Go home</Link>
    </div>
);

const appRouter = () => (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/electronics" exact={true}
                       render={(routeProps) => (<Category {...routeProps}
                                                          apiName={"electronics"}
                                                          sectionName={"Electronics"}/>)}/>
                <Route path="/books" exact={true}
                       render={(routeProps) => (<Category {...routeProps}
                                                          apiName={"books"}
                                                          sectionName={"Books"}/>)}/>
                <Route path="/homerequirements" exact={true}
                       render={(routeProps) => (<Category {...routeProps}
                                                          apiName={"homerequirements"}
                                                          sectionName={"Home Requirements"}/>)}/>
                <Route path="/electronics/:subcategory" component={SubCategory} exact={true}/>
                <Route path="/books/:subcategory" component={SubCategory} exact={true}/>
                <Route path="/homerequirements/:subcategory" exact={true}
                       render={(routeProps) => (<SubCategory {...routeProps}
                                                          />)} />
                <Route path="/electronics/:subcategory/:id" component={portfolioArticlePage}/>
                <Route path="/search/:category/:query" exact={true} component={SearchResultsComponent} />
                <Route path="/product/:id" exact={true} component={ProductInfo} />
                <Route path="/checkout" exact={true} component={Checkout} />
                <Route path="/order" exact={true} component={Order}/>
                <Route path="/login" exact={true} component={LoginComponent}/>
                <Route path="/register" exact={true} component={RegistrationComponent}/>
                <Route component={noMatchFound} />
            </Switch>
            <Footer/>
        </div>
    </BrowserRouter>
);

export default appRouter;