import React from 'react';
import {Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class SubCategory extends React.Component{

    componentWillReceiveProps(nextProps){
        console.log("Comes in will receive props");
    }

    firstLetterUppercase(s){
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    render(){
        return (
            <Grid>
                <Row>
                    <Col lg={12} md={12}>
                        <h1 className={"text-center subcategory-heading"}>Explore Great Deals on {this.firstLetterUppercase(this.props.match.params.subcategory)} - </h1>
                    </Col>
                </Row>

                <br/>

                <Row>
                    <Col lg={2} md={2}>
                        <p className={"deal-heading"}>Featured : </p>
                    </Col>

                    <Col lg={10} md={10}>
                        <ListGroup className={"subcategory-deals-list"}>
                            <ListGroupItem header={"Deal One"}><Link to={"/"}>View</Link></ListGroupItem>
                            <ListGroupItem header={"Deal Two"}>Two</ListGroupItem>
                            <ListGroupItem header={"Deal Three"}>Three</ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>

                <Row>
                    <Col lg={2} md={2}>
                        <p className={"deal-heading"}>New arrivals : </p>
                    </Col>

                    <Col lg={10} md={10}>
                        <ListGroup className={"subcategory-deals-list"}>
                            <ListGroupItem header={"Deal One"}>One</ListGroupItem>
                            <ListGroupItem header={"Deal Two"}>Two</ListGroupItem>
                            <ListGroupItem header={"Deal Three"}>Three</ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>

                <Row>
                    <Col lg={12} md={12}>
                        <p>Couldn't find what you are looking for? You can directly search for {this.firstLetterUppercase(this.props.match.params.subcategory)}</p>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default SubCategory;