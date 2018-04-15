import React from "react";
import {Grid, Row, Col, Panel, ListGroup, Glyphicon} from "react-bootstrap";
import {withRouter, Link} from "react-router-dom";
import axios, {getHeaders} from "../api/axiosInstance";
import LoadingScreen from "../components/LoadingScreen";
import {ACCESS_TOKEN} from "../api/strings";
import {orderDetailAPI} from "../api/apiURLs";
import InformationPanel from "../components/InformationPanel";
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import CustomListGroupItem from '../components/CustomListGroupItemOrder';

class OrderDetail extends React.Component{

    state = {
        isLoading: true,
        orderDetail: {},
        invalidOrder: false
    };

    getOrderDetail = () => {
        const access_token = window.localStorage.getItem(ACCESS_TOKEN);
        const headers = getHeaders(access_token);
        axios.get(orderDetailAPI(this.props.match.params.id), {headers})
            .then((response) => {
                const orderDetail = response.data;
                this.setState(() => ({orderDetail, isLoading: false}));
            })
            .catch(() => {
                this.setState(() => ({isLoading: false, invalidOrder:true}));
            });
    };

    componentDidMount(){
        if(this.props.location.state && this.props.location.state.authenticated){
            this.getOrderDetail();
        }
        else{
            this.props.history.push("/login");
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.state && nextProps.location.state.authenticated){
            this.getOrderDetail();
        }
        else{
            this.props.history.push("/login");
        }
    }

    render(){

        if(this.state.isLoading){
            return <LoadingScreen/>
        }
        else if(this.state.invalidOrder){
            return <InformationPanel
                panelTitle={"Invalid Order"}
                informationHeading={"You are on invalid order page!"}
                message={"Please try viewing the order details again."}
            />
        }

        const {orderDetail} = this.state;

        return (
            <Grid>
                <Row>
                    <Col lgOffset={1} mdOffset={1} md={10} lg={10}>
                        <Row className={"order-detail-heading"}>
                            <Col lg={4} md={4}>
                                <Link to={"/myorders"}><Glyphicon glyph={"chevron-left"}/>My Orders</Link>
                            </Col>

                            <Col lg={6} md={6}>
                                <p><span className={"order-panel-headings bold-text one-em-font"}>Order Identification: </span><span className={"order-panel-attributes one-em-font"}>EKDJFQYU{this.props.match.params.id}</span></p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col lgOffset={1} mdOffset={1} md={10} lg={10}>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h4">Order Details</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <Row>
                                    <Col lg={2} md={2}>
                                        <span className={"order-panel-headings one-em-font bold-text"}>Order Date: </span>
                                    </Col>

                                    <Col lg={4} md={4}>
                                        <span className={"order-panel-attributes one-em-font"}>{orderDetail.orderDate.split(" ")[0]}</span>
                                    </Col>

                                    <Col lg={2} md={2}>
                                        <span className={"order-panel-headings one-em-font bold-text"}>Order Time: </span>
                                    </Col>

                                    <Col lg={4} md={4}>
                                        <span className={"order-panel-attributes one-em-font"}>{orderDetail.orderDate.split(" ")[1]} EST</span>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={2} md={2}>
                                        <span className={"order-panel-headings one-em-font bold-text"}>Payment Method: </span>
                                    </Col>

                                    <Col lg={4} md={4}>
                                        <span className={"order-panel-attributes one-em-font"}>{orderDetail.payment.payment_method_data.paymentMethod}</span>
                                    </Col>

                                    <Col lg={2} md={2}>
                                        <span className={"order-panel-headings one-em-font bold-text"}>Payment Status: </span>
                                    </Col>

                                    <Col lg={4} md={4}>
                                        <span className={"order-panel-attributes one-em-font"}>{orderDetail.payment.status}</span>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={2} md={2}>
                                        <span className={"order-panel-headings one-em-font bold-text"}>Total Amount: </span>
                                    </Col>

                                    <Col lg={4} md={4}>
                                        <span className={"order-panel-attributes one-em-font"}>${parseFloat(orderDetail.totalAmount).toFixed(2)}</span>
                                    </Col>

                                    <Col lg={2} md={2}>
                                        <span className={"order-panel-headings one-em-font bold-text"}>Total items: </span>
                                    </Col>

                                    <Col lg={4} md={4}>
                                        <span className={"order-panel-attributes one-em-font"}>{orderDetail.order_items.length}</span>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={2} md={2}>
                                        <span className={"order-panel-headings one-em-font bold-text"}>Amount Paid: </span>
                                    </Col>

                                    <Col lg={4} md={4}>
                                        <span className={"order-panel-attributes one-em-font"}>${parseFloat(orderDetail.payment.amount).toFixed(2)}</span>
                                    </Col>

                                    <Col lg={2} md={2}>
                                        <span className={"order-panel-headings one-em-font bold-text"}>Promo Code: </span>
                                    </Col>

                                    <Col lg={4} md={4}>
                                        <span className={"order-panel-attributes one-em-font"}>{orderDetail.promo_code ? (orderDetail.promo_code.promoCode.concat(` ($${orderDetail.promo_code.discount.toFixed(2)} discount)`)) : 'Not Applied'}</span>
                                    </Col>
                                </Row>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>

                <Row>
                    <Col lgOffset={1} mdOffset={1} md={10} lg={10}>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h4">Order Status</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <Stepper activeStep={orderDetail.shippingOptionsId}>
                                    <Step>
                                        <StepLabel>Order Received</StepLabel>
                                    </Step>
                                    <Step>
                                        <StepLabel>Shipped</StepLabel>
                                    </Step>
                                    <Step>
                                        <StepLabel>In Transit</StepLabel>
                                    </Step>
                                    <Step>
                                        <StepLabel>Delivered</StepLabel>
                                    </Step>
                                </Stepper>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>

                <Row>
                    <Col lgOffset={1} mdOffset={1} md={10} lg={10}>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h4">Products purchased</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body className={"order-list-panel-body"}>
                                <ListGroup>
                                    {orderDetail.order_items.map((order_item) => (
                                        <CustomListGroupItem
                                            key={order_item.product.productId}
                                            sellerName={order_item.product.sellerName}
                                            ratings={order_item.product.ratings}
                                            productID={order_item.product.productId}
                                            currentPrice={order_item.product.price}
                                            quantity={order_item.quantity}
                                            image={order_item.product.photo.photo}
                                            actualPrice={order_item.price}
                                        >
                                            {order_item.product.name}
                                        </CustomListGroupItem>
                                    ))}
                                </ListGroup>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>

            </Grid>
        )
    }
}

export default withRouter(OrderDetail);