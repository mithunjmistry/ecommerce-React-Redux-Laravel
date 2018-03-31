import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import {logoutUser} from "../actions/authentication";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../api/strings";
import axios from "../api/axiosInstance";
import {logoutAPI} from "../api/apiURLs";

class LogoutComponent extends React.Component{

    state = {
        logoutMessage: "Please wait while we safely log you out..."
    };

    componentDidMount(){
        if(this.props.authentication.isAuthenticated){
            const access_token = window.localStorage.getItem(ACCESS_TOKEN);
            const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};
            axios.post(logoutAPI, headers)
                .then(() => {
                    window.localStorage.removeItem(ACCESS_TOKEN);
                    window.localStorage.removeItem(REFRESH_TOKEN);
                    this.props.dispatch(logoutUser());
                    this.props.history.push("/login");
                })
                .catch(() => {
                     this.setState(() => ({logoutMessage: "Something went wrong! Please try again."}))
                });

        }
        else{
            this.props.history.push("/login");
        }
    }

    render(){
        return (
            <div className={"page-height-for-navbar"}>
                <h3 className={"margin-five"}>{this.state.logoutMessage}</h3>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication
    };
};

export default connect(mapStateToProps)(withRouter(LogoutComponent));