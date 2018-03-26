import React from 'react';
import {Row, Col, Grid, Panel, Glyphicon} from 'react-bootstrap';
import {Link} from "react-router-dom";

const ProductNotFound = () => (
    <Grid>
        <Row>
            <Col lg={12}>
                <div className={"page-height-for-navbar"}>
                    <Panel bsStyle="primary">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Product Not available</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <h4>You are on the wrong page!</h4>
                            <p>Please click on the appropriate product link to view this product.</p>
                            <div>
                                <Glyphicon glyph={"shopping-cart"} className={"empty-checkout-size"}/>
                            </div>
                            <Link to={"/"}>Continue Shopping</Link>
                        </Panel.Body>
                    </Panel>
                </div>
            </Col>
        </Row>
    </Grid>
);

export default ProductNotFound;