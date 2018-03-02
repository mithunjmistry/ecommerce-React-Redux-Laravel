import React from 'react';
import { Grid, Col, Row, Carousel } from 'react-bootstrap';

export default class HomePage extends React.Component{
    render(){
        return (
        <Grid>
            <Row>
                <Col lg={12} md={12}>
                    <Carousel interval={2500}>
                        <Carousel.Item>
                            <img width={1750} height={250} alt="900x500" src="/images/offerone.png" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={1750} height={250} alt="900x500" src="/images/offertwo.png" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={1750} height={250} alt="900x500" src="/images/offerthree.png" />
                        </Carousel.Item>
                    </Carousel>
                </Col>

                <Col lg={12} md={12} className={'temp'}>
                    <p>This is below images.</p>
                </Col>
            </Row>
        </Grid>
        )
    }
}