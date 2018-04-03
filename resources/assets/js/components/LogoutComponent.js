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
        const access_token = window.localStorage.getItem(ACCESS_TOKEN);
        if(this.props.authentication.isAuthenticated && access_token !== null){
            const headers = {
                Accept: "application/json",
                Authorization: `Bearer ${access_token}`
            };
            axios.post(logoutAPI, {}, {headers: {...headers}})
                .then(() => {
                    window.localStorage.removeItem(ACCESS_TOKEN);
                    window.localStorage.removeItem(REFRESH_TOKEN);
                    this.props.dispatch(logoutUser());
                    this.props.history.push("/login");
                })
                .catch((error) => {
                    console.log(error.response);
                     this.setState(() => ({logoutMessage: "Something went wrong! Please try again."}))
                });

        }
        else{
            this.props.history.push("/login");
        }
    }

    render(){
        return (
            <div className={"page-height-for-navbar"} ref={"logout-div"}>
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