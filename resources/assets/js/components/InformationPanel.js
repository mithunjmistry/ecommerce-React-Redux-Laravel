import React from 'react';
import {Row, Col, Grid, Panel, Glyphicon} from 'react-bootstrap';
import {Link} from "react-router-dom";

const InformationPanel = (props) => (
    <Grid>
        <Row>
            <Col lg={12}>
                <div className={"minimum-height"}>
                    <Panel bsStyle="primary">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">{props.panelTitle}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <h4>{props.informationHeading}</h4>
                            <p>{props.message}</p>
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

export default InformationPanel;