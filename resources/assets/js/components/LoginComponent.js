import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Grid, Row, Col } from 'react-bootstrap';
import {withRouter, Link} from 'react-router-dom';
import axios from 'axios';
import {loginAPI, getUserAPI, getUserCartAPI} from "../api/apiURLs";
import {loginUser, logoutUser} from "../actions/authentication";
import { connect } from 'react-redux';
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../api/strings";
import LoadingScreen from "../components/LoadingScreen";
import {addToCartHelper} from "../actions/shoppingCart";
import {imageWatch} from "./image";

const FieldGroup = ({ id, label, help, ...props }) => (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
);

class LoginComponent extends React.Component{

    state = {
        passwordHelp: undefined,
        usernameHelp: undefined,
        invalidCredentials: undefined,
        isLoading: false
    };

    loadCartService = () => {
        const access_token = window.localStorage.getItem(ACCESS_TOKEN);
        const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};
        axios.get(getUserCartAPI, {headers})
            .then((response) => {
                    this.props.dispatch(loginUser());
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
                        this.props.dispatch(addToCartHelper(product));
                    });
                    this.props.history.push("/");
                }
            )
            .catch((error) => {
                console.log(error.response);
                window.localStorage.removeItem(ACCESS_TOKEN);
                this.props.dispatch(logoutUser());
            });
    };

    componentDidMount(){
        if(window.localStorage.getItem(ACCESS_TOKEN) !== null){
            // means the user is already logged in, check if it is valid
            this.setState(() => ({isLoading: true}));
            this.loadCartService();
        }
    }

    onLoginSubmit = (e) => {
        e.preventDefault();
        const email = e.target.formControlsUsername.value;
        const password = e.target.formControlsPassword.value;

        if(password.length === 0){
            this.setState(() => ({passwordHelp: "Password cannot be empty"}));
        }else{
            this.setState(() => ({passwordHelp: undefined}));
        }

        if(email.length === 0){
            this.setState(() => ({usernameHelp: "Username cannot be empty"}));
        }else{
            this.setState(() => ({usernameHelp: undefined}));
        }

        if(email.length > 0 && password.length > 0){
            this.setState(() => ({isLoading: true}));
            const data = {
              grant_type: "password",
              client_id: "2",
              client_secret: window.Laravel.client_secret,
              username: email,
              password: password,
              scope: "*"
            };
            axios.post(loginAPI, data)
                .then((response) => {
                    window.localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
                    window.localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
                    this.props.dispatch(loginUser());
                    this.loadCartService();
                })
                .catch((error) => (
                    this.setState(() => ({
                        invalidCredentials: true,
                        isLoading: false
                    }))
                ));
        }
    };

    render(){

        if(this.state.isLoading){
            return <LoadingScreen/>
        }

        return (
            <Grid className={"minimum-height"}>
                <Row>
                    <Col mdOffset={2} lgOffset={2} lg={7} md={7}>
                        <h3 className={"text-center"}>Login</h3>
                        <form onSubmit={this.onLoginSubmit}>
                            <FieldGroup
                                id="formControlsUsername"
                                type="email"
                                label="Email address"
                                placeholder="Enter registered email"
                                help={this.state.usernameHelp}
                            />
                            <FieldGroup
                                id="formControlsPassword"
                                label="Password"
                                type="password"
                                placeholder="Enter password"
                                help={this.state.passwordHelp}
                            />
                            {this.state.invalidCredentials && <p className={"error-message"}>Username or password not valid.</p>}
                            <Button type={"submit"} className={'btn btn-primary'}>Login</Button>
                        </form>
                        <div>
                            <br/>
                            <p>Don't have an account?</p>
                            <Link to={"/register"} className='btn btn-default'>Register</Link>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication
    };
};

export default connect(mapStateToProps)(withRouter(LoginComponent));