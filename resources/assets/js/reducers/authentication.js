// default state
import {LOG_IN, LOG_OUT} from "../api/strings";

const authenticationReducerDefaultState = {
    isAuthenticated: false
};

// reducer which is a pure function
export default (state = authenticationReducerDefaultState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                isAuthenticated: true
            };
        case LOG_OUT:
            return {
                isAuthenticated: false
            };
        default:
            return state;
    }
};