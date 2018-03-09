import React from 'react';
import {Grid, Row, Col, ListGroup} from 'react-bootstrap';

class SearchResultsComponent extends React.Component{

    componentDidMount(){
        let category = this.props.match.params.category;
        let query = this.props.match.params.query;
        console.log(category + " " + query);
        // fetch initial data in this function here
    }

    componentWillReceiveProps(nextProps){
        let currentCategory = this.props.match.params.category;
        let currentQuery = this.props.match.params.query;

        let newCategory = nextProps.match.params.category;
        let newQuery = nextProps.match.params.query;
        if((currentCategory !== newCategory) || (currentQuery !== newQuery)){
            console.log("Query changed");
        }
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col lg={10} md={10}>
                        <p>Content</p>
                    </Col>
                    <Col lg={2} md={2}>
                        <p>Advanced Filters</p>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default SearchResultsComponent;