import React from "react";
import {Grid, Col, Row, Panel} from "react-bootstrap";
import {connect} from "react-redux";
import LoadingScreen from "../components/LoadingScreen";
import {withRouter} from 'react-router-dom';
import axios from '../api/axiosInstance';
import {getUserAPI} from "../api/apiURLs";
import {ACCESS_TOKEN} from "../api/strings";
import WishList from "./WishList";

class MyAccount extends React.Component{
    state = {
        isLoading: false,
        user: {}
    };

    componentDidMount(){
        // load the data here
        if(this.props.authentication.isAuthenticated){
            this.setState(() => ({isAuthenticated: true}));
            const access_token = window.localStorage.getItem(ACCESS_TOKEN);
            const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};
            axios.get(getUserAPI, {headers})
                .then((response) => {
                    const user = response.data;
                    this.setState(() => ({user, isLoading: false}));
                })
                .catch((error) => {
                    console.log(error.response);
                    this.props.history.push("/");
                })
        }
        else{
            this.props.history.push("/login");
        }
    }

    render(){
          if(this.state.isLoading){
              return <LoadingScreen/>
          }

          return (
              <Grid className={"minimum-height"}>
                  <Row>
                      <Col lg={12} md={12}>
                          <Panel>
                              <Panel.Heading>
                                  <Panel.Title componentClass="h3" className={"text-center"}>My Account</Panel.Title>
                              </Panel.Heading>
                              <Panel.Body>
                                  <Row>
                                      <Col lg={2} md={2}>
                                          <p className={"user-info-label"}>Full Name: </p>
                                      </Col>
                                      <Col lg={10} md={10}>
                                          <p className={"user-info"}>{this.state.user.name}</p>
                                      </Col>
                                  </Row>

                                  <Row>
                                      <Col lg={2} md={2}>
                                          <p className={"user-info-label"}>Email: </p>
                                      </Col>
                                      <Col lg={10} md={10}>
                                          <p className={"user-info"}>{this.state.user.email}</p>
                                      </Col>
                                  </Row>
                              </Panel.Body>
                          </Panel>
                      </Col>
                  </Row>

                  <Row>
                      <Col lg={12} md={12}>
                            <WishList/>
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

export default connect(mapStateToProps)(withRouter(MyAccount));

