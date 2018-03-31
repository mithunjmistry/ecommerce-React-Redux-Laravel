// default state
const authenticationReducerDefaultState = {
    isAuthenticated: false
};

// reducer which is a pure function
export default (state = authenticationReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                isAuthenticated: true
            };
        case 'LOG_OUT':
            return {
                ...state,
                isAuthenticated: false
            };
        default:
            return state;
    }
};