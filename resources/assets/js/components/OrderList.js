import React from "react";
import {Grid, Row, Col, Panel, ListGroup} from "react-bootstrap";
import axios, {getHeaders} from "../api/axiosInstance";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import CustomListGroupItem from '../components/CustomListGroupItemOrder';
import {ACCESS_TOKEN} from "../api/strings";
import {userordersAPI} from "../api/apiURLs";
import LoadingScreen from "../components/LoadingScreen";

const OrderPanels = (props) => (
    <Panel>
        <Panel.Heading>
            <Panel.Title>
                <Row>
                    <Col lg={3} md={3}>
                        <span className={"bold-text order-panel-headings"}>Order Placed:</span>
                    </Col>
                    <Col lg={3} md={3}>
                        <span className={"bold-text order-panel-headings"}>Total:</span>
                    </Col>
                    <Col lg={4} md={4}>
                        <span className={"bold-text order-panel-headings"}>Items:</span>
                    </Col>
                    <Col lg={2} md={2}>
                        <Link to={{
                            pathname: `/order/${props.orderID}`,
                            state: { authenticated: true }
                        }}>
                            View details
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col lg={3} md={3}>
                        <span className={"order-panel-attributes"}>{props.orderDate.split(" ")[0]}</span>
                    </Col>
                    <Col lg={3} md={3}>
                        <span className={"order-panel-attributes"}>${props.orderTotal}</span>
                    </Col>
                    <Col lg={3} md={3}>
                        <span className={"order-panel-attributes"}>{props.itemCount}</span>
                    </Col>
                    <Col lg={3} md={3}>

                    </Col>
                </Row>
            </Panel.Title>
        </Panel.Heading>
        <Panel.Body className={"order-list-panel-body"}>
            {props.children}
        </Panel.Body>
    </Panel>
);

class OrderList extends React.Component {

    state = {
        orders: [],
        isLoading: false
    };

    componentDidMount(){
        if(this.props.authentication.isAuthenticated){
            this.setState(() => ({isLoading: true}));
            const access_token = window.localStorage.getItem(ACCESS_TOKEN);
            const headers = getHeaders(access_token);
            axios.get(userordersAPI, {headers})
                .then((response) => {
                    const orders = response.data;
                    this.setState(() => ({orders, isLoading: false}));
                })
                .catch((error) => {
                    console.log(error.response);
                    this.setState(() => ({isLoading: false}));
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
          <div>
              <h4>My Orders</h4>
              <hr/>
              <br/>
              {this.state.orders.length === 0 ?
              <p>You have no order history. Please continue shopping with us.</p> :
              this.state.orders.map((item) => {
                  let products = (
                      <ListGroup>
                          {item.order_items.map((order_item) => (
                              <CustomListGroupItem
                                  key={order_item.product.productId}
                                  sellerName={order_item.product.sellerName}
                                  ratings={order_item.product.ratings}
                                  productID={order_item.product.productId}
                                  currentPrice={order_item.product.price}
                                  quantity={order_item.quantity}
                              >
                                  {order_item.product.name}
                              </CustomListGroupItem>
                          ))}
                      </ListGroup>
                  );
                  return <OrderPanels
                            key={item.orderId}
                            orderDate={item.orderDate}
                            orderTotal={item.totalAmount}
                            itemCount={item.order_items.length}
                            orderID={item.orderId}
                        >
                            {products}
                        </OrderPanels>
              })
              }
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication
    };
};

export default connect(mapStateToProps)(withRouter(OrderList));

