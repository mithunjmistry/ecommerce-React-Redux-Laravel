import React from 'react';
import {Grid, Row, Col, ListGroup, DropdownButton, MenuItem} from 'react-bootstrap';
import Pagination from "react-js-pagination";
import CustomListGroupItem from './CustomListGroupItemProduct';

class SearchResultsComponent extends React.Component{

    state = {
      sortBySelected: "Relevance",
      sortByOptions: ["Price: Low to High", "Price: High to Low", "New"],
      activePage: 1,
      totalItemsCount: 55
    };

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

    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
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

    render() {
        return (
            <Grid>
                <Row>
                    <Col lg={10} md={10}>
                        <div>
                            <label className={'sort-by-label'}>Sort By - </label>
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

                        <div>
                            <ListGroup className={'search-results-list'}>
                                <CustomListGroupItem
                                    currentPrice={20.99}
                                    sellerName={"Seller Name"}
                                    ratings={4.5}
                                >
                                    Product Name
                                </CustomListGroupItem>
                                <CustomListGroupItem
                                    currentPrice={20.99}
                                    prevPrice={"39.99"}
                                    sellerName={"Seller Name 2"}
                                >
                                    Product Name
                                </CustomListGroupItem>
                                <CustomListGroupItem
                                    currentPrice={20.99}
                                    sellerName={"Seller Name"}
                                    ratings={4.5}
                                >
                                    Product Name
                                </CustomListGroupItem>
                                <CustomListGroupItem
                                    currentPrice={20.99}
                                    prevPrice={"39.99"}
                                    sellerName={"Seller Name 2"}
                                >
                                    Product Name
                                </CustomListGroupItem>
                                <CustomListGroupItem
                                    currentPrice={20.99}
                                    sellerName={"Seller Name"}
                                    ratings={4.5}
                                >
                                    Product Name
                                </CustomListGroupItem>
                                <CustomListGroupItem
                                    currentPrice={20.99}
                                    prevPrice={"39.99"}
                                    sellerName={"Seller Name 2"}
                                >
                                    Product Name
                                </CustomListGroupItem>
                                <CustomListGroupItem
                                    currentPrice={20.99}
                                    sellerName={"Seller Name"}
                                    ratings={4.5}
                                >
                                    Product Name
                                </CustomListGroupItem>
                                <CustomListGroupItem
                                    currentPrice={20.99}
                                    prevPrice={"39.99"}
                                    sellerName={"Seller Name 2"}
                                >
                                    Product Name
                                </CustomListGroupItem>
                                <CustomListGroupItem
                                    currentPrice={20.99}
                                    sellerName={"Seller Name"}
                                    ratings={4.5}
                                >
                                    Product Name
                                </CustomListGroupItem>
                                <CustomListGroupItem
                                    currentPrice={20.99}
                                    prevPrice={"39.99"}
                                    sellerName={"Seller Name 2"}
                                >
                                    Product Name
                                </CustomListGroupItem>
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
                    <Col lg={2} md={2}>
                        <h4 className={"advanced-filter-heading"}>Advanced Filters</h4>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default SearchResultsComponent;