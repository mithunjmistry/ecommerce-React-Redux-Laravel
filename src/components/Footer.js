import React from 'react';
import { Navbar, Grid, Row, Table, Col } from 'react-bootstrap';

const Footer = () => (
    <footer className={'footer'}>
    <Navbar>
        <Grid>
            <Row>
                <Col lgOffset={2}>
                    <br/>
                    <Table responsive className={'table-footer'}>
                        <tbody>
                        <tr>
                            <td>My Account</td>
                            <td>About</td>
                            <td>FAQs</td>
                        </tr>
                        <tr>
                            <td>Orders</td>
                            <td>Mission</td>
                            <td>Become a Seller</td>
                        </tr>
                        <tr>
                            <td>Offers</td>
                            <td>Contact Us</td>
                            <td>Shipping Policy</td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Grid>
    </Navbar>
    </footer>
);

export default Footer;