import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Grid, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';

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
        usernameHelp: undefined
    };

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
    };

    render(){
        return (
            <Grid className={"page-height-for-navbar"}>
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
                            <Button type={"submit"}>Login</Button>
                        </form>
                        <div>
                            <br/>
                            <p>Don't have an account?</p>
                            <Link to={"/register"}>Register</Link>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default LoginComponent;