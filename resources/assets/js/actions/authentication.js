import {LOG_IN, LOG_OUT} from "../api/strings";

export const loginUser = () => ({
    type: LOG_IN
});

export const logoutUser = () => ({
    type: LOG_OUT
});