import React from 'react';
import {Grid, Row, Col, ListGroup} from 'react-bootstrap';

class SearchResultsComponent extends React.Component{

    render() {
        return (
            <Grid>
                <Row>
                    <Col lg={10} md={10}>
                        Sort By -
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default SearchResultsComponent;