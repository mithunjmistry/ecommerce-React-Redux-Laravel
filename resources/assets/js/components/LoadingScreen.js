import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const LoadingScreen = () => (
    <div className={"loading-div"}>
        <MuiThemeProvider>
            <CircularProgress size={80} thickness={5} className={"loading-circular-progress"} />
        </MuiThemeProvider>
    </div>
);

export default LoadingScreen;