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

const FieldGroup = ({ id, label, validationState=null, ...props }) => (
        <FormGroup controlId={id} validationState={validationState}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            <FormControl.Feedback />
        </FormGroup>
);


class CheckoutInformation extends React.Component {

    state = {
        finished: false,
        stepIndex: 0,
        name: '',
        email: '',
        paymentMethod: 1,
        nameValidation: null,
        emailValidation: null,
        orderID: 1
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
        if(stepIndex >= 2){
            this.props.history.push("/order");
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
        const {finished, stepIndex} = this.state;

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
                                            value={this.state.name}
                                            onChange={this.onNameChange}
                                        />
                                        <FieldGroup
                                            id="formControlsEmail"
                                            type="email"
                                            label="Email address"
                                            validationState={this.state.emailValidation}
                                            placeholder="Enter email"
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
                                    <AddressForm renderStepAction={this.renderStepActions(1)}/>
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
                                        <Radio name="radioGroup" value="1" onClick={this.handlePaymentMethod}>
                                            Credit Card
                                        </Radio>
                                        <Radio name="radioGroup" value="2" onClick={this.handlePaymentMethod}>
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

export default withRouter(CheckoutInformation);