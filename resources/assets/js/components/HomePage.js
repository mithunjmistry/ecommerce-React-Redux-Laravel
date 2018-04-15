import React from 'react';
import { Grid, Col, Row, Carousel } from 'react-bootstrap';

export default class HomePage extends React.Component{
    render(){
        return (
        <Grid className={"page-height-for-navbar"}>
            <Row>
                <Col lg={12} md={12}>
                    <Carousel interval={2500}>
                        <Carousel.Item>
                            <img width={1750} height={450} alt="Browse our offers." src="/images/offerone.jpg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={1750} height={450} alt="Browse our offers." src="/images/offertwo.jpg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={1750} height={450} alt="Browse our offers." src="/images/offerthree.jpg" />
                        </Carousel.Item>
                    </Carousel>
                </Col>

                <Col lg={12} md={12} className={'temp'}>
                    <p></p>
                </Col>
            </Row>
        </Grid>
        )
    }
}
