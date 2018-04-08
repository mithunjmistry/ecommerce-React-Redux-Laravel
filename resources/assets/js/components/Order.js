import React from "react";
import {Grid, Row, Col} from "react-bootstrap";
import OrderList from "../components/OrderList";
import OrderGuest from "../components/OrderGuest";
import {connect} from "react-redux";
import {emptyCart} from "../actions/shoppingCart";
import {SUCCESSFUL_ORDER} from "../api/strings";
import {withRouter} from "react-router-dom";

class Order extends React.Component {

    state = {
        loggedIn: false
    };

    componentDidMount(){
        if(this.props.location.state && this.props.location.state.order.toString() === SUCCESSFUL_ORDER){
            this.props.dispatch(emptyCart());
        }
        else{
            this.props.history.push("/checkout");
        }
    }

    componentDidUpdate(){
        if(this.props.location.state && this.props.shoppingCart.length > 0 && this.props.location.state.order === SUCCESSFUL_ORDER){
            this.props.dispatch(emptyCart());
        }
        else if(!this.props.location.state){
            this.props.history.push("/checkout");
        }
    }

    render(){
        return (
            <Grid>
                <Row>
                    <Col lg={12} md={12}>
                        {this.state.loggedIn ? <OrderList/> : <OrderGuest/>}
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        shoppingCart: state.shoppingCart
    };
};

export default connect(mapStateToProps)(withRouter(Order));
