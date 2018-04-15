import React from "react";
import {Grid, Row, Col} from "react-bootstrap";
import OrderList from "../components/OrderList";

const MyOrders = () => (
    <Grid className={"minimum-height"}>
        <Row>
            <Col lg={10} md={10} lgOffset={1} mdOffset={1}>
                <OrderList/>
            </Col>
        </Row>
    </Grid>
);

export default MyOrders;