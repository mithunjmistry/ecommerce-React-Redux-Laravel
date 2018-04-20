import React from 'react';
import { Grid, Col, Row, Carousel } from 'react-bootstrap';
import {withRouter} from "react-router-dom";

const OFFER_ONE = "offerone";
const OFFER_TWO = "offertwo";
const OFFER_THREE = "offerthree";

class HomePage extends React.Component{

    handleOfferClick = (offer) => {
        switch (offer){
            case OFFER_ONE:{
                this.props.history.push('/electronics/cellphone');
                break;
            }
            case OFFER_TWO:{
                this.props.history.push('/books/book');
                break;
            }
            case OFFER_THREE:{
                this.props.history.push('/homerequirements/furniture');
                break;
            }
        }
    };

    render(){
        return (
        <Grid className={"minimum-height home-page-div"}>
            <Row>
                <Col lg={12} md={12}>
                    <Carousel interval={2500}>
                        <Carousel.Item>
                            <img width={1750} height={450} alt="Browse our offers." src="/images/offerone.jpg" onClick={() => this.handleOfferClick(OFFER_ONE)} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={1750} height={450} alt="Browse our offers." src="/images/offertwo.jpg" onClick={() => this.handleOfferClick(OFFER_TWO)} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={1750} height={450} alt="Browse our offers." src="/images/offerthree.jpg" onClick={() => this.handleOfferClick(OFFER_THREE)} />
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

export default withRouter(HomePage);
