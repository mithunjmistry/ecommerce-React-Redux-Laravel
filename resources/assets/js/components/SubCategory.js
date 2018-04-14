import React from 'react';
import {Grid, Row, Col, ListGroup} from 'react-bootstrap';
import CustomListGroupItem from './CustomListGroupItemProduct';
import axios from "../api/axiosInstance";
import {subcategoryProductAPI} from "../api/apiURLs";
import LoadingScreen from "../components/LoadingScreen";
import InformationPanel from "../components/InformationPanel";

class SubCategory extends React.Component{

    state = {
        isLoading: false,
        newArrivals: [],
        featured: [],
        invalidSubcategory: false
    };

    loadProducts = (subcategory) => {
        const url = subcategoryProductAPI(subcategory);
        // fetch initial data in this function here
        this.setState(() => ({isLoading: true}));
        axios.get(url).then((response) => (this.setState(
            {
                featured: response.data.featured,
                newArrivals: response.data.new_arrivals,
                isLoading: false,
                invalidSubcategory: false
            }
        ))).catch((error) => (
            this.setState(() => ({
                isLoading: false,
                invalidSubcategory: true
            }))
        ));
    };

    componentDidMount(){
        let subcategory = this.props.match.params.subcategory;
        this.loadProducts(subcategory);
    }

    componentWillReceiveProps(nextProps){
        let currentSubcategory = this.props.match.params.subcategory;
        let newSubcategory = nextProps.match.params.subcategory;

        if(currentSubcategory !== newSubcategory){
            this.loadProducts(newSubcategory);
        }
    }

    static firstLetterUppercase(s){
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    render(){

        if(this.state.isLoading){
            return <LoadingScreen/>
        }
        else if(this.state.invalidSubcategory){
            return <InformationPanel
                panelTitle={"Invalid subcategory!"}
                informationHeading={"We don't sell this subcategory currently."}
                message={"Please click on the appropriate subcategory to view the products."}
            />
        }

        return (
            <Grid>
                <Row>
                    <Col lg={12} md={12}>
                        <h1 className={"text-center subcategory-heading"}>Explore Great Deals on {SubCategory.firstLetterUppercase(this.props.match.params.subcategory)} - </h1>
                    </Col>
                </Row>

                <hr/>

                <Row>
                    <Col lg={2} md={2}>
                        <p className={"deal-heading"}>Featured : </p>
                    </Col>

                    <Col lg={10} md={10}>
                        <ListGroup className={"subcategory-deals-list"}>
                            {this.state.featured.map((item, key) => (
                                <CustomListGroupItem
                                    key={key}
                                    currentPrice={item.price}
                                    sellerName={item.sellerName}
                                    ratings={item.ratings}
                                    productID={item.productId}
                                    image={item.photo.photo}
                                >
                                    {item.name}
                                </CustomListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>

                <hr/>

                <Row>
                    <Col lg={2} md={2}>
                        <p className={"deal-heading"}>New arrivals : </p>
                    </Col>

                    <Col lg={10} md={10}>
                        <ListGroup className={"subcategory-deals-list"}>
                            {this.state.newArrivals.map((item, key) => (
                                <CustomListGroupItem
                                    key={key}
                                    currentPrice={item.price}
                                    prevPrice={item.originalPrice}
                                    sellerName={item.sellerName}
                                    ratings={item.ratings}
                                    productID={item.productId}
                                    image={item.photo.photo}
                                >
                                    {item.name}
                                </CustomListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default SubCategory;