import React from 'react';
import { Button, Grid, Row, Col, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const s = "success";

class RegistrationComponent extends React.Component{

    state = {
        usernameValidation: null,
        passwordValidation: false,
        firstNameValidation: null,
        lastNameValidation: null,
        address1: '',
        address2: '',
        city: '',
        stateName: '',
        zip: '',
        phone: '',
        addressValidation: null,
        cityValidation: null,
        zipValidation: null,
        phoneValidation: null,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    passwordChange = (e) => {
        const password = e.target.value;
        const confirmPassword = this.state.confirmPassword;
        if(confirmPassword.length > 0 && password !== confirmPassword){
            this.setState(() => ({passwordValidation: true, password}))
        }
        else{
            this.setState(() => ({passwordValidation: false, password}))
        }
    };

    confirmPasswordChange = (e) => {
        const confirmPassword = e.target.value;
        const password = this.state.password;
        if(password.length > 0 && password !== confirmPassword){
            this.setState(() => ({passwordValidation: true, confirmPassword}))
        }
        else{
            this.setState(() => ({passwordValidation: false, confirmPassword}))
        }
    };

    handleAddressOneChange = (e) => {
        let address1 = e.target.value;
        let addressValidation = "success";
        if(address1.trim().length === 0){
            addressValidation = "error";
        }
        if(address1.length <= 45){
            this.setState(() => ({address1, addressValidation}));
        }

    };

    handleAddressTwoChange = (e) => {
        let address2 = e.target.value;
        if(address2.length <= 45) {
            this.setState(() => ({address2}));
        }
    };

    handleCityChange = (e) => {
        let city = e.target.value;
        let cityValidation = "success";
        if(city.trim().length === 0){
            cityValidation = "error";
        }
        this.setState(() => ({city, cityValidation}));
    };

    handleStateChange = (e) => {
        let stateName = e.target.value;
        this.setState(() => ({stateName}));
    };

    handleZipChange = (e) => {
        let zip = e.target.value;
        let zipValidation = null;
        if(zip.length < 5){
            zipValidation = "error";
        }
        else{
            zipValidation = "success"
        }

        if(zip.length <= 5){
            this.setState(() => ({zip, zipValidation}));
        }

    };

    handlePhoneChange = (e) => {
        let phone = e.target.value.trim();
        let phoneValidation = null;
        if(phone.length < 10){
            phoneValidation = "error"
        }
        else{
            phoneValidation = "success"
        }

        if(phone.length <= 10){
            this.setState(() => ({phone, phoneValidation}));
        }
    };

    handleFirstNameChange = (e) => {
        const firstName = e.target.value;
        let firstNameValidation = null;
        if(firstName.length > 0 && firstName.length < 45){
            firstNameValidation = "success";
            this.setState(() => ({firstName, firstNameValidation}));
        }
        else{
            firstNameValidation = "error";
            this.setState(() => ({firstNameValidation}));
        }
    };

    handleLastNameChange = (e) => {
        const lastName = e.target.value;
        let lastNameValidation = null;
        if(lastName.length > 0 && lastName.length < 45){
            lastNameValidation = "success";
            this.setState(() => ({lastName, lastNameValidation}));
        }
        else{
            lastNameValidation = "error";
            this.setState(() => ({lastNameValidation}));
        }
    };

    static emailValidation = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    onEmailChange = (e) => {
        const email = e.target.value;
        let emailValidation = "error";
        if(RegistrationComponent.emailValidation(email.trim())){
            emailValidation = "success";
        }

        if(email.length <= 45){
            this.setState(() => ({email, emailValidation}));
        }
    };

    render(){
        return (
            <Grid>
                <Row>
                    <Col mdOffset={2} lgOffset={2} lg={7} md={7}>
                        <h3 className={"text-center"}>Register</h3>
                        <form>

                            <FormGroup
                                controlId="formBasicFirstName"
                                validationState={this.state.firstNameValidation}
                            >
                                <ControlLabel>First Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.firstName}
                                    placeholder="First Name"
                                    onChange={this.handleFirstNameChange}
                                />
                                <FormControl.Feedback />
                            </FormGroup>

                            <FormGroup
                                controlId="formBasicLastName"
                                validationState={this.state.lastNameValidation}
                            >
                                <ControlLabel>Last Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.lastName}
                                    placeholder="First Name"
                                    onChange={this.handleLastNameChange}
                                />
                                <FormControl.Feedback />
                            </FormGroup>

                            <FormGroup
                                controlId="formBasicUsername"
                                validationState={this.state.emailValidation}
                            >
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    type="email"
                                    value={this.state.email}
                                    placeholder="This will be used for login"
                                    onChange={this.onEmailChange}
                                />
                                <FormControl.Feedback />
                            </FormGroup>

                            <FormGroup
                                controlId="formBasicPassword"
                            >
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    type="password"
                                    value={this.state.password}
                                    placeholder="Password"
                                    onChange={this.passwordChange}
                                />
                                {this.state.passwordValidation ? <span>Password doesn't match.</span> : ''}
                            </FormGroup>

                            <FormGroup
                                controlId="formBasicConfirmPassword"
                            >
                                <ControlLabel>Confirm Password</ControlLabel>
                                <FormControl
                                    type="password"
                                    value={this.state.confirmPassword}
                                    placeholder="Confirm Password"
                                    onChange={this.confirmPasswordChange}
                                />
                                {this.state.passwordValidation && <span>Password doesn't match.</span>}
                            </FormGroup>

                            <FormGroup
                                controlId="formBasicAddress"
                                validationState={this.state.addressValidation}
                            >
                                <ControlLabel>Address</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.address1}
                                    placeholder="Address 1"
                                    onChange={this.handleAddressOneChange}
                                />
                                <FormControl.Feedback />
                            </FormGroup>

                            <FormGroup
                                controlId="formBasicAddress2"
                            >
                                <FormControl
                                    type="text"
                                    value={this.state.address2}
                                    placeholder="Address 2"
                                    onChange={this.handleAddressTwoChange}
                                />
                            </FormGroup>

                            <FormGroup
                                controlId="formBasicCity"
                                validationState={this.state.cityValidation}
                            >
                                <ControlLabel>City</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.city}
                                    placeholder="City"
                                    onChange={this.handleCityChange}
                                />
                                <FormControl.Feedback />
                            </FormGroup>

                            <Row>
                                <Col lg={6} md={6}>
                                    <FormGroup
                                        controlId="formBasicState"
                                    >
                                        <ControlLabel>State</ControlLabel>
                                        <FormControl
                                            type="text"
                                            value={this.state.stateName}
                                            placeholder="State"
                                            onChange={this.handleStateChange}
                                        />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                </Col>

                                <Col lg={6} md={6}>
                                    <FormGroup
                                        controlId="formZip"
                                        validationState={this.state.zipValidation}
                                    >
                                        <ControlLabel>Zip</ControlLabel>
                                        <FormControl
                                            type="number"
                                            value={this.state.zip}
                                            placeholder="Zip"
                                            onChange={this.handleZipChange}
                                        />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup
                                controlId="formBasicZip"
                                validationState={this.state.phoneValidation}
                            >
                                <ControlLabel>Phone</ControlLabel>
                                <FormControl
                                    type="number"
                                    value={this.state.phone}
                                    placeholder="Phone"
                                    onChange={this.handlePhoneChange}
                                />
                                <FormControl.Feedback />
                            </FormGroup>

                            {this.state.addressValidation === s &&
                            this.state.cityValidation === s &&
                            this.state.zipValidation === s &&
                            this.state.phoneValidation === s &&
                            this.state.firstNameValidation === s &&
                            this.state.lastNameValidation === s &&
                            !this.state.passwordValidation &&
                            this.state.emailValidation === s &&
                            <Button type={"submit"}>Register</Button>
                            }
                        </form>
                        <div>
                            <br/>
                            <p>Already have an account?</p>
                            <Link to={"/login"}>Login</Link>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default RegistrationComponent;