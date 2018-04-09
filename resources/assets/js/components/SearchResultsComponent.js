import React from 'react';
import {Grid, Row, Col, ListGroup, DropdownButton, MenuItem, Button, Panel, Glyphicon} from 'react-bootstrap';
import Pagination from "react-js-pagination";
import CustomListGroupItem from './CustomListGroupItemProduct';
import AdvancedFilters from './AdvancedFilters';
import AdvancedFiltersModal from './AdvancedFiltersModal';
import axios from "../api/axiosInstance";
import {searchProductsAPI} from "../api/apiURLs";
import LoadingScreen from "../components/LoadingScreen";
import {Link} from "react-router-dom";
import {
    ANY, MORE_THAN_FOUR, MORE_THAN_THREE, NEW, NO, ONE_TO_THREE, PRICE_HIGH_TO_LOW, PRICE_LOW_TO_HIGH, RATINGS,
    YES
} from "../api/strings";

class SearchResultsComponent extends React.Component{

    state = {
      sortBySelected: NEW,
      sortByOptions: [PRICE_LOW_TO_HIGH, PRICE_HIGH_TO_LOW, RATINGS],
      activePage: 1,
      totalItemsCount: 55,
      advancedFilterModalShow: false,
      products: [],
      isLoading: false,
      originalProducts: []
    };

    componentDidMount(){
        let category = this.props.match.params.category;
        let query = this.props.match.params.query;
        const url = searchProductsAPI(category, query);
        // fetch initial data in this function here
        this.setState(() => ({isLoading: true}));
        axios.get(url).then((response) => (this.setState(
                {
                    originalProducts: response.data,
                    products: response.data,
                    totalItemsCount: response.data.length,
                    isLoading: false,
                    activePage: 1
                }
            )));
    }

    componentWillReceiveProps(nextProps){
        let currentCategory = this.props.match.params.category;
        let currentQuery = this.props.match.params.query;

        let newCategory = nextProps.match.params.category;
        let newQuery = nextProps.match.params.query;
        if((currentCategory !== newCategory) || (currentQuery !== newQuery)){
            const url = searchProductsAPI(newCategory, newQuery);
            this.setState(() => ({isLoading: true}));
            axios.get(url).then((response) => (this.setState(
                {
                    originalProducts: response.data,
                    products: response.data,
                    totalItemsCount: response.data.length,
                    isLoading: false,
                    activePage: 1
                }
                )));
        }
    }

    handlePageChange = (pageNumber) => {
        window.scrollTo(0, 0);
        this.setState({activePage: pageNumber});
    };

    sortByChange = (selectedSortBy) => {
        switch(selectedSortBy){
            case PRICE_LOW_TO_HIGH:
                this.setState((prevState) => {
                    return {
                        sortByOptions:
                            prevState.sortByOptions.concat(prevState.sortBySelected).filter((menuItem) => (
                                menuItem !== PRICE_LOW_TO_HIGH
                            )),
                        sortBySelected: PRICE_LOW_TO_HIGH,
                        products: prevState.products.sort((a, b) => {
                            return a.price > b.price ? 1 : -1;
                        })
                    }
                });
                break;
            case PRICE_HIGH_TO_LOW:
                this.setState((prevState) => {
                    return {
                        sortByOptions:
                            prevState.sortByOptions.concat(prevState.sortBySelected).filter((menuItem) => (
                                menuItem !== PRICE_HIGH_TO_LOW
                            )),
                        sortBySelected: PRICE_HIGH_TO_LOW,
                        products: prevState.products.sort((a, b) => {
                            return a.price < b.price ? 1 : -1;
                        })
                    }
                });
                break;
            case RATINGS:
                this.setState((prevState) => {
                    return {
                        sortByOptions:
                            prevState.sortByOptions.concat(prevState.sortBySelected).filter((menuItem) => (
                                menuItem !== RATINGS
                            )),
                        sortBySelected: RATINGS,
                        products: prevState.products.sort((a, b) => {
                            return a.ratings < b.ratings ? 1 : -1;
                        })
                    }
                });
                break;
            default:
                this.setState((prevState) => {
                    return {
                        sortByOptions:
                            prevState.sortByOptions.concat(prevState.sortBySelected).filter((menuItem) => (
                                menuItem !== NEW
                            )),
                        sortBySelected: NEW,
                        products: prevState.products.sort((a, b) => {
                            return a.timeStamp < b.timeStamp ? 1 : -1;
                        })
                    }
                });
                break;
        }
    };

    advancedFiltersModalShow = () => {
      this.setState(() => ({advancedFilterModalShow: true}));
    };

    advancedFiltersModalHide = () => {
        this.setState(() => ({advancedFilterModalShow: false}));
    };

    applyFilters = ({ratings = ANY, from, to, fast_shipping = ANY}) => {
        const {sortBySelected} = this.state;
        this.setState(() => ({
            products: this.state.originalProducts.filter((product) => {
                const rating = ((r) => {switch (r){
                    case MORE_THAN_FOUR:{
                        return product.ratings > 4;
                    }
                    case MORE_THAN_THREE:{
                        return product.ratings > 3;
                    }
                    case ONE_TO_THREE:{
                        return (product.ratings >= 1 && product.ratings <= 3);
                    }
                    default:{
                        return product;
                    }
                }})(ratings);
                let from_to = product;
                if(from && to){
                    from_to = product.price >= from && product.price <= to;
                }

                const shipping = ((s) => {
                    switch (s){
                        case YES:{
                            return product.fastShipping.toString() === "1";
                        }
                        case NO:{
                            return product.fastShipping.toString() === "0";
                        }
                        default:{
                            return product;
                        }
                    }
                })(fast_shipping);

                return rating && from_to && shipping;
            }).sort((a, b) => {
                if(sortBySelected === RATINGS){
                    return a.ratings < b.ratings ? 1 : -1;
                }
                else if(sortBySelected === PRICE_LOW_TO_HIGH){
                    return a.price > b.price ? 1 : -1;
                }
                else if(sortBySelected === PRICE_HIGH_TO_LOW){
                    return a.price < b.price ? 1 : -1;
                }
                else{
                    return a.timeStamp < b.timeStamp ? 1 : -1;
                }
            })
        }));
    };

    clearFilters = () => {
        const {sortBySelected} = this.state;
        this.setState(() => (
            {
                products: this.state.originalProducts.sort((a, b) => {
                    if(sortBySelected === RATINGS){
                        return a.ratings < b.ratings ? 1 : -1;
                    }
                    else if(sortBySelected === PRICE_LOW_TO_HIGH){
                        return a.price > b.price ? 1 : -1;
                    }
                    else if(sortBySelected === PRICE_HIGH_TO_LOW){
                        return a.price < b.price ? 1 : -1;
                    }
                    else{
                        return a.timeStamp < b.timeStamp ? 1 : -1;
                    }
                })
            }
            ));
    };

    render() {
        if(this.state.isLoading){
            return <LoadingScreen/>
        }

        let items = [];
        const {activePage, products} = this.state;
        const end = (activePage*10) - 1;
        const start = end - 9;
        for (let i = start; i <= end; i++ ) {
            if(i < products.length) {
                items.push(<CustomListGroupItem
                    key={i}
                    currentPrice={products[i].price}
                    prevPrice={products[i].originalPrice}
                    sellerName={products[i].sellerName}
                    ratings={products[i].ratings}
                    productID={products[i].productId}
                >
                    {products[i].name}
                </CustomListGroupItem>);
            }else{
                break;
            }
        }

        return (
            <Grid className={"minimum-height"}>
                {this.state.originalProducts.length > 0 ?
                    <Row>
                    <Col lg={10} md={10} sm={12} xs={12}>
                        <div>
                            <label className={'sort-by-label'}>Sort By - </label>
                            <Button className={"pull-right hidden-lg hidden-md"} bsStyle={"link"} onClick={this.advancedFiltersModalShow}>Advanced Filters</Button>
                            <DropdownButton
                                bsStyle={'default'}
                                title={this.state.sortBySelected}
                                key={'sortBy'}
                                id={`dropdown-sort-by`}
                                className={'btn-sm'}
                            >
                                {this.state.sortByOptions.map((sortByOption) => (
                                    <MenuItem key={sortByOption} onClick={() => this.sortByChange(sortByOption)}>{sortByOption}</MenuItem>
                                ))}
                            </DropdownButton>
                        </div>

                        <div className={"total-products-count"}>
                            <p>Total {this.state.products.length} product found</p>
                        </div>

                        {products.length > 0 ? <div>
                            <div>
                                <ListGroup className={'search-results-list'}>
                                    {items}
                                </ListGroup>
                            </div>

                            <div className={'pagination-div'}>
                                <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={10}
                                    totalItemsCount={this.state.totalItemsCount}
                                    onChange={this.handlePageChange}
                                />
                            </div>
                        </div> :

                        <Row>
                            <Col lg={11} md={11}>
                                <Panel bsStyle="warning">
                                    <Panel.Heading>
                                        <Panel.Title componentClass="h3">No products found</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>
                                        No products found for this filter. Please try different filters or clear filters.
                                    </Panel.Body>
                                </Panel>
                            </Col>
                        </Row>
                        }
                    </Col>
                    <Col lg={2} md={2} smHidden xsHidden>
                        <h4 className={"advanced-filter-heading"}>Advanced Filters</h4>
                        <Row>
                            <Col lg={12} md={12}>
                                <AdvancedFilters
                                    applyFilters={this.applyFilters}
                                    clearFilters={this.clearFilters}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row> :
                <Row>
                    <Col lg={12}>
                        <div className={"page-height-for-navbar"}>
                            <Panel bsStyle="primary">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">No results found</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <h4>We will try to get this product for you in future!</h4>
                                    <p>Please give a chance by searching for another product.</p>
                                    <div>
                                        <Glyphicon glyph={"shopping-cart"} className={"empty-checkout-size"}/>
                                    </div>
                                    <Link to={"/"}>Continue Shopping</Link>
                                </Panel.Body>
                            </Panel>
                        </div>
                    </Col>
                </Row>}
                <AdvancedFiltersModal
                    handleClose={this.advancedFiltersModalHide}
                    show={this.state.advancedFilterModalShow}
                    applyFilters={this.applyFilters}
                    clearFilters={this.clearFilters}
                />
            </Grid>
        )
    }
}

export default SearchResultsComponent;