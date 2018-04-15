import React from "react";
import {Grid, Row, Col, Panel, ListGroup, Glyphicon} from "react-bootstrap";
import OrderList from "../components/OrderList";
import ScrollToTop from "react-scroll-up";

const MyOrders = () => (
    <Grid className={"minimum-height"}>
        <Row>
            <Col lg={10} md={10} lgOffset={1} mdOffset={1}>
                <ScrollToTop showUnder={110}>
                    <div className={"text-center"}>
                        <Glyphicon glyph={"arrow-up"}/>
                        <p>Back to Top</p>
                    </div>
                </ScrollToTop>
                <OrderList/>
            </Col>
        </Row>
    </Grid>
);

export default MyOrders;