import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../components/HomePage';
import { Grid, Col, Row, Carousel } from 'react-bootstrap';

import { BrowserRouter, Switch, Route, NavLink, Link } from 'react-router-dom';

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

const helpPage = () => (
    <div>
        <p>This is the help page.</p>
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
                <Route path="/electronics" component={portfolioPage} exact={true} />
                <Route path="/books" component={portfolioArticlePage} exact={true} />
                <Route path="/homerequirements" component={helpPage} exact={true} />
                <Route component={noMatchFound} />
            </Switch>
            <Footer/>
        </div>
    </BrowserRouter>
);

export default appRouter;