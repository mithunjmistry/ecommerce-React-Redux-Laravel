import React from "react";
import {FormGroup, ControlLabel, FormControl, Row, Col} from "react-bootstrap";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const s = "success";

export default class AddressForm extends React.Component {

    state = {
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
        editDisabled: false
    };

    componentDidMount(){
        if(this.props.loadedAddress !== null){
            const {address1, address2, city, state: stateName, zip, phone} = this.props.loadedAddress;
            this.setState(() => ({
                address1,
                address2,
                city,
                stateName,
                zip,
                phone,
                addressValidation: s,
                cityValidation: s,
                zipValidation: s,
                phoneValidation: s,
                editDisabled: true
            }));
        }
    }

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

    handleNextAddress = () => {
        const {address1, address2, city, stateName : state, zip, phone} = this.state;
        const address = {
            address1,
            address2,
            city,
            state,
            zip,
            phone
        };
        this.props.handleNext(address);
    };


    render(){
        return (
            <form>
                <fieldset disabled={this.state.editDisabled}>
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
                                controlId="formBasicZip"
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
                </fieldset>
                <div style={{margin: '12px 0'}}>
                    <RaisedButton
                        label={'Next'}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        onClick={this.handleNextAddress}
                        style={{marginRight: 12}}
                    />
                {this.state.addressValidation === s &&
                this.state.cityValidation === s &&
                this.state.zipValidation === s &&
                this.state.phoneValidation === s &&
                <FlatButton
                    label="Back"
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    onClick={this.props.handlePrev}
                />
                }
                </div>
            </form>
        )
    }
}