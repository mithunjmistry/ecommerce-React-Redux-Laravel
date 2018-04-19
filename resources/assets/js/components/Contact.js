import React from "react";
import { Button, Grid, Row, Col, ControlLabel, FormGroup, FormControl, HelpBlock, Panel } from 'react-bootstrap';
import RegistrationComponent from "../components/RegistrationComponent";
import axios from "../api/axiosInstance";
import {contactAPI} from "../api/apiURLs";
import LoadingScreen from "../components/LoadingScreen";

const FieldGroup = ({ id, label, help, ...props }) => {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
};

const ConfirmationPanel = () => (
    <Grid className={"minimum-height"}>
        <Row>
            <Col lg={10} md={10} lgOffset={1} mdOffset={1}>
                <Panel bsStyle="success">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Thank you for contacting.</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <p>Your response has been received and will get back to you within 48 hours.</p>
                        <p>Continue exploring this project till then...</p>
                        <p>Have a great day.</p>
                    </Panel.Body>
                </Panel>
            </Col>
        </Row>
    </Grid>
);

class Contact extends React.Component{

    state = {
        error: undefined,
        contacted: false,
        isLoading: false
    };

    componentDidMount(){
        if(window.sessionStorage.getItem("contacted")){
            this.setState(() => ({contacted: true}));
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const name = e.target.fullname.value.trim();
        const email = e.target.email.value.trim();
        const message = e.target.message.value.trim();

        if(name && email && message){
            if(!RegistrationComponent.emailValidation(email)){
                this.setState(() => ({error: "This is not a valid email."}));
            }
            else{
                this.setState(() => ({isLoading: true}));
                const data = {
                    name,
                    email,
                    message
                };
                axios.post(contactAPI, data)
                    .then(() => {
                        window.sessionStorage.setItem("contacted", true);
                        this.setState(() => ({contacted: true, error: undefined, isLoading: false}));
                    })
                    .catch((error) => {
                        console.log(error);
                        const message = error.response.data;
                        this.setState(() => ({error: message, isLoading: false}));
                    });
            }
        }
        else{
            this.setState(() => ({error: "All the fields are required."}));
        }
    };


    render(){

        const {error, contacted, isLoading} = this.state;

        if(contacted){
            return <ConfirmationPanel/>
        }

        if(isLoading){
            return <LoadingScreen/>
        }

        return (
            <Grid className={"minimum-height"}>
                <Row>
                    <Col lg={10} md={10} mdOffset={1} lgOffset={1}>
                        <h4>Contact</h4>
                        <hr/>
                        {error && <p className={"error-message"}>{error}</p>}
                        <form onSubmit={this.handleFormSubmit}>
                            <FieldGroup
                                id="formControlsName"
                                type="text"
                                label="Name"
                                placeholder="Enter Name"
                                name={"fullname"}
                            />

                            <FieldGroup
                                id="formControlsEmail"
                                type="email"
                                label="Email address"
                                placeholder="Enter email"
                                name={"email"}
                            />

                            <FormGroup controlId="formControlsTextarea">
                                <ControlLabel>Message</ControlLabel>
                                <FormControl componentClass="textarea" placeholder="Message" name={"message"} rows={4} />
                            </FormGroup>

                            <span>
                                <Button type="submit" bsStyle={"primary"} className={"btn-sm"}>Submit</Button>
                                <Button type="reset" className={"btn-sm left-margin-pointfive"}>Reset</Button>
                            </span>
                        </form>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Contact;