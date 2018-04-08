import React from "react";
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Row, Col, FormGroup, ControlLabel, FormControl, Radio} from "react-bootstrap";
import AddressForm from "./AddressForm";
import {withRouter} from "react-router-dom";
import axios, {getHeaders} from "../api/axiosInstance";
import {ACCESS_TOKEN, SUCCESSFUL_ORDER} from "../api/strings";
import {checkoutinformationAPI, placeOrderAPI} from "../api/apiURLs";
import {connect} from "react-redux";
import LoadingScreen from "../components/LoadingScreen";
import {totalReducer} from "./ShoppingCart";

const FieldGroup = ({ id, label, validationState=null, ...props }) => (
        <FormGroup controlId={id} validationState={validationState}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            <FormControl.Feedback />
        </FormGroup>
);

const s = "success";

class CheckoutInformation extends React.Component {

    state = {
        finished: false,
        stepIndex: 0,
        name: '',
        email: '',
        paymentMethod: 1,
        nameValidation: null,
        emailValidation: null,
        creditCardChecked: true,
        debitCardChecked: false,
        nameDisabled: false,
        emailDisabled: false,
        loadedAddress: null,
        isLoading: false
    };

    componentDidMount(){
        // load the logged in user data
        if(this.props.authentication.isAuthenticated) {
            const access_token = window.localStorage.getItem(ACCESS_TOKEN);
            const headers = getHeaders(access_token);
            axios.get(checkoutinformationAPI, {headers})
                .then((response) => {
                    const data = response.data;
                    this.setState(() => ({
                        loadedAddress: data,
                        nameDisabled: true,
                        emailDisabled: true,
                        nameValidation: s,
                        emailValidation: s,
                        name: data.full_name,
                        email: data.email
                    }));
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    }

    handleNext = (address) => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
        if(stepIndex === 1){
            this.setState(() => ({loadedAddress: address}));
        }
        else if(stepIndex >= 2){
            // process the order
            this.setState(() => ({isLoading: true}));
            const totalAmount = this.props.shoppingCart.reduce(totalReducer, 0);
            let headers;
            if(this.props.authentication.isAuthenticated){
                const access_token = window.localStorage.getItem(ACCESS_TOKEN);
                headers = getHeaders(access_token);
            }
            else{
                headers = {}
            }
            let products = [];
            this.props.shoppingCart.map((item) => (
                products.push({
                    productId: item.productID,
                    quantity: item.quantity
                })
            ));
            const paymentMethod = this.state.creditCardChecked ? 'Credit Card' : 'Debit Card';

            const {name, email} = this.state;
            const data = {
                ...this.state.loadedAddress,
                name,
                email,
                totalAmount,
                products,
                paymentMethod
            };
            axios.post(placeOrderAPI, data, {...headers})
                .then((response) => {
                    this.props.history.push({
                        pathname: '/order',
                        state: { order: SUCCESSFUL_ORDER }
                    });
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    onNameChange = (e) => {
        let name = e.target.value;
        let nameValidation = "success";
        if(name.trim().length === 0){
            nameValidation = "error";
        }
        if(name.length <= 45){
            this.setState(() => ({name, nameValidation}));
        }
    };

    static emailValidation = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    onEmailChange = (e) => {
        let email = e.target.value;
        let emailValidation = "error";
        if(CheckoutInformation.emailValidation(email.trim())){
            emailValidation = "success";
        }

        if(email.length <= 45){
            this.setState(() => ({email, emailValidation}));
        }
    };

    handlePaymentMethod = (e) => {
        let paymentMethod = e.target.value;
        this.setState(() => ({paymentMethod}));
    };

    handlePaymentChange = () => {
      this.setState((prevState) => ({creditCardChecked: !prevState.creditCardChecked, debitCardChecked: !prevState.debitCardChecked}));
    };

    renderStepActions(step) {
        const {stepIndex} = this.state;

        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onClick={this.handleNext}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {
        const {stepIndex} = this.state;

        if(this.state.isLoading){
            return <LoadingScreen/>
        }

        return (

            <div>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Enter your name and email</StepLabel>
                        <StepContent>
                            <Row>
                                <Col lg={12} md={12}>
                                    <form>
                                        <FieldGroup
                                            id="formControlsText"
                                            type="text"
                                            label="Full Name"
                                            validationState={this.state.nameValidation}
                                            placeholder="Enter Full Name"
                                            disabled={this.state.nameDisabled}
                                            value={this.state.name}
                                            onChange={this.onNameChange}
                                        />
                                        <FieldGroup
                                            id="formControlsEmail"
                                            type="email"
                                            label="Email address"
                                            validationState={this.state.emailValidation}
                                            placeholder="Enter email"
                                            disabled={this.state.emailDisabled}
                                            value={this.state.email}
                                            onChange={this.onEmailChange}
                                        />
                                    </form>
                                </Col>
                            </Row>
                            {this.state.nameValidation === "success" && this.state.emailValidation === "success" && this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Enter your shipping address</StepLabel>
                        <StepContent>
                            <Row>
                                <Col lg={12} md={12}>
                                    <AddressForm
                                        loadedAddress={this.state.loadedAddress}
                                        handleNext={this.handleNext}
                                        handlePrev={this.handlePrev}
                                    />
                                </Col>
                            </Row>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Choose payment method</StepLabel>
                        <StepContent>
                            <Row>
                                <Col lg={12} md={12}>
                                    <FormGroup>
                                        <Radio name="radioGroup" value="1"
                                               onClick={this.handlePaymentMethod}
                                               checked={this.state.creditCardChecked}
                                               onChange={this.handlePaymentChange}
                                        >
                                            Credit Card
                                        </Radio>
                                        <Radio name="radioGroup" value="2"
                                               onClick={this.handlePaymentMethod}
                                               checked={this.state.debitCardChecked}
                                               onChange={this.handlePaymentChange}
                                        >
                                            Debit Card
                                        </Radio>
                                    </FormGroup>
                                </Col>
                            </Row>
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
        shoppingCart: state.shoppingCart
    };
};

export default connect(mapStateToProps)(withRouter(CheckoutInformation));