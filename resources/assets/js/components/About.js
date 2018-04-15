import React from "react";
import {Grid, Col, Row, ListGroup, ListGroupItem} from "react-bootstrap";
import LoadingOrderAnimation from 'react-loading-order-with-animation';

const About = () => (
    <Grid className={"minimum-height about-div"}>
        <Row>
            <h4>eKart project with React, Redux and PHP Laravel</h4>
            <hr/>
            <Col lg={12} md={12}>
                <a
                    href={"https://github.com/mithunjmistry/ecommerce-React-Redux-Laravel"}
                    target="_blank">
                    Project Github link
                </a>
                <br/>
                <br/>
                <LoadingOrderAnimation animation="fade-in"
                                       move="from-top-to-bottom"
                                       distance={30}
                                       speed={1000}
                                       wait={300}>
                <p className={"sixzero-weight"}>Libraries and Technologies used :</p>
                <Row>
                    <Col lg={6} md={6}>
                        <ListGroup>
                            <ListGroupItem>Redux</ListGroupItem>
                            <ListGroupItem>React-router</ListGroupItem>
                            <ListGroupItem>React-Bootstrap</ListGroupItem>
                            <ListGroupItem>Material UI</ListGroupItem>
                            <ListGroupItem>Axios</ListGroupItem>
                            <ListGroupItem>Redux Thunk</ListGroupItem>
                        </ListGroup>
                    </Col>

                    <Col lg={6} md={6}>
                        <ListGroup>
                            <ListGroupItem>PHP Laravel 5.6</ListGroupItem>
                            <ListGroupItem>Laravel Passport</ListGroupItem>
                            <ListGroupItem>SASS with SASS loader</ListGroupItem>
                            <ListGroupItem>Webpack</ListGroupItem>
                            <ListGroupItem>Babel</ListGroupItem>
                            <ListGroupItem>Loadash</ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
                </LoadingOrderAnimation>

                <LoadingOrderAnimation animation="fade-in"
                                       move="from-top-to-bottom"
                                       distance={30}
                                       speed={1000}
                                       wait={1000}>
                <p className={"sixzero-weight"}>Database and Cloud technologies :</p>
                <Row>
                    <Col lg={6} md={6}>
                        <ListGroup>
                            <ListGroupItem>MySQL</ListGroupItem>
                            <ListGroupItem>RDBMS on AWS</ListGroupItem>
                        </ListGroup>
                    </Col>

                    <Col lg={6} md={6}>
                        <ListGroup>
                            <ListGroupItem>Google App Engine</ListGroupItem>
                            <ListGroupItem>Docker Image</ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
                </LoadingOrderAnimation>
            </Col>
        </Row>
    </Grid>
);

export default About;