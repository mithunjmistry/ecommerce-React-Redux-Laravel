import React from "react";
import {Grid, Row, Col, Panel, ListGroup} from "react-bootstrap";
import axios from "../api/axiosInstance";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import CustomListGroupItem from '../components/CustomListGroupItemOrder';

const OrderPanels = (props) => (
    <Panel>
        <Panel.Heading>
            <Panel.Title>
                <Row>
                    <Col lg={3} md={3}>
                        Order Placed: {props.orderDate}
                    </Col>
                    <Col lg={3} md={3}>
                        Total: {props.orderTotal}
                    </Col>
                    <Col lg={3} md={3}>
                        Items: {props.itemCount}
                    </Col>
                    <Col lg={3} md={3}>
                        <Link to={`/order/${props.orderID}`}>View details</Link>
                    </Col>
                </Row>
            </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
            {props.children}
        </Panel.Body>
    </Panel>
);

class OrderList extends React.Component {

    state = {
        orders: []
    };

    componentDidMount(){
        if(this.props.authentication.isAuthenticated){

        }
        else{
            this.props.history.push("/login");
        }
    }

    render(){
        return (
          <Grid className={"minimum-height"}>
              <Row>
                  <Col lg={10} md={10} lgOffset={1} mdOffset={1}>
                      <h4>My Orders</h4>
                      <hr/>
                      <br/>
                      {this.state.orders.length === 0 ?
                      <p>You have no order history. Please continue shopping with us.</p> :
                      this.state.orders.map((item, key) => {
                          let itemCount = 0;
                          let products = (
                              <ListGroup>
                                  {item.map((product, k) => {
                                      itemCount += 1;
                                      return <CustomListGroupItem
                                                  key={k}
                                                  sellerName={product.sellerName}
                                                  ratings={product.ratings}
                                                  productID={product.productId}
                                                  currentPrice={product.price}
                                              >
                                                  {product.name}
                                              </CustomListGroupItem>
                                  })}
                              </ListGroup>
                          );
                          return <OrderPanels
                                    key={key}
                                    orderDate={item.orderDate}
                                    orderTotal={item.orderTotal}
                                    itemCount={itemCount}
                                    orderID={item.orderID}
                                >
                                    {products}
                                </OrderPanels>
                      })
                      }
                  </Col>
              </Row>
          </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication
    };
};

export default connect(mapStateToProps)(withRouter(OrderList));

