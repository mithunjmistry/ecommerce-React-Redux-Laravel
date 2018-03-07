import React from 'react';
import {Grid, Row, Col, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import CustomListGroupItem from '../components/CustomListGroupItem';
import { Link, withRouter } from 'react-router-dom';

class SubCategory extends React.Component{

    componentWillReceiveProps(nextProps){
        console.log("Comes in will receive props");
    }

    static firstLetterUppercase(s){
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    render(){
        return (
            <Grid>
                <Row>
                    <Col lg={12} md={12}>
                        <h1 className={"text-center subcategory-heading"}>Explore Great Deals on {SubCategory.firstLetterUppercase(this.props.match.params.subcategory)} - </h1>
                    </Col>
                </Row>

                <br/>

                <Row>
                    <Col lg={2} md={2}>
                        <p className={"deal-heading"}>Featured : </p>
                    </Col>

                    <Col lg={10} md={10}>
                        <ListGroup className={"subcategory-deals-list"}>
                            <CustomListGroupItem
                                currentPrice={20.99}
                                prevPrice={"39.99"}>
                                Product Name
                            </CustomListGroupItem>
                            <CustomListGroupItem
                                currentPrice={20.99}
                                prevPrice={"39.99"}>
                                Product Name
                            </CustomListGroupItem>
                            <CustomListGroupItem
                                currentPrice={20.99}
                                prevPrice={"39.99"}>
                                Product Name
                            </CustomListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>

                <Row>
                    <Col lg={2} md={2}>
                        <p className={"deal-heading"}>New arrivals : </p>
                    </Col>

                    <Col lg={10} md={10}>
                        <ListGroup className={"subcategory-deals-list"}>
                            <CustomListGroupItem
                                currentPrice={20.99}
                                prevPrice={"39.99"}>
                                Product Name
                            </CustomListGroupItem>
                            <CustomListGroupItem
                                currentPrice={20.99}
                                prevPrice={"39.99"}>
                                Product Name
                            </CustomListGroupItem>
                            <CustomListGroupItem
                                currentPrice={20.99}
                                prevPrice={"39.99"}>
                                Product Name
                            </CustomListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>

                <Row>
                    <Col lg={12} md={12}>
                        <p>Couldn't find what you are looking for? You can directly search for {SubCategory.firstLetterUppercase(this.props.match.params.subcategory)}</p>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default SubCategory;