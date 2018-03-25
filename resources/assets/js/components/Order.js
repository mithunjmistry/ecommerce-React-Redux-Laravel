import React from "react";
import {Grid, Row, Col} from "react-bootstrap";
import OrderList from "../components/OrderList";
import OrderGuest from "../components/OrderGuest";
import {connect} from "react-redux";
import {emptyCart} from "../actions/shoppingCart";

class Order extends React.Component {

    state = {
        loggedIn: false
    };

    componentDidMount(){
        this.props.dispatch(emptyCart());
    }

    componentDidUpdate(){
        if(this.props.shoppingCart.length > 0){
            this.props.dispatch(emptyCart());
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

export default connect(mapStateToProps)(Order);
