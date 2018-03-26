import React from 'react';
import {Grid, Row, Col, ListGroup, DropdownButton, MenuItem, Button, Panel, Glyphicon} from 'react-bootstrap';
import Pagination from "react-js-pagination";
import CustomListGroupItem from './CustomListGroupItemProduct';
import AdvancedFilters from './AdvancedFilters';
import AdvancedFiltersModal from './AdvancedFiltersModal';
import axios from "axios";
import {searchProductsAPI} from "../api/apiURLs";
import LoadingScreen from "../components/LoadingScreen";
import {Link} from "react-router-dom";

class SearchResultsComponent extends React.Component{

    state = {
      sortBySelected: "Relevance",
      sortByOptions: ["Price: Low to High", "Price: High to Low", "New"],
      activePage: 1,
      totalItemsCount: 55,
      advancedFilterModalShow: false,
      products: [],
      isLoading: false
    };

    componentDidMount(){
        let category = this.props.match.params.category;
        let query = this.props.match.params.query;
        const url = searchProductsAPI(category, query);
        // fetch initial data in this function here
        this.setState(() => ({isLoading: true}));
        axios.get(url).then((response) => (this.setState(
                {
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
            case 'Price: Low to High':
                this.setState((prevState) => {
                    return {
                        sortByOptions:
                            prevState.sortByOptions.concat(prevState.sortBySelected).filter((menuItem) => (
                                menuItem !== "Price: Low to High"
                            )),
                        sortBySelected: "Price: Low to High"
                    }
                });
                break;
            case 'Price: High to Low':
                this.setState((prevState) => {
                    return {
                        sortByOptions:
                            prevState.sortByOptions.concat(prevState.sortBySelected).filter((menuItem) => (
                                menuItem !== "Price: High to Low"
                            )),
                        sortBySelected: "Price: High to Low"
                    }
                });
                break;
            case 'New':
                this.setState((prevState) => {
                    return {
                        sortByOptions:
                            prevState.sortByOptions.concat(prevState.sortBySelected).filter((menuItem) => (
                                menuItem !== "New"
                            )),
                        sortBySelected: "New"
                    }
                });
                break;
            default:
                this.setState((prevState) => {
                    return {
                        sortByOptions:
                            prevState.sortByOptions.concat(prevState.sortBySelected).filter((menuItem) => (
                                menuItem !== "Relevance"
                            )),
                        sortBySelected: "Relevance"
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
            <Grid>
                {this.state.products.length > 0 ?
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
                    </Col>
                    <Col lg={2} md={2} smHidden xsHidden>
                        <h4 className={"advanced-filter-heading"}>Advanced Filters</h4>
                        <Row>
                            <Col lg={12} md={12}>
                                <AdvancedFilters/>
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
                <AdvancedFiltersModal handleClose={this.advancedFiltersModalHide} show={this.state.advancedFilterModalShow}/>
            </Grid>
        )
    }
}

export default SearchResultsComponent;