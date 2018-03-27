import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import {subitemsAPI} from "../api/apiURLs";
import axios from "../api/axiosInstance";

class CategoryBase extends React.Component{
    state = {
      subcategories: []
    };

    componentDidMount(){
        const url = subitemsAPI(this.props.apiName);
        // fetch data in this function
        axios.get(url).then((response) => (this.setState({ subcategories: response.data })));
    }

    componentWillReceiveProps(nextProps){
        if(this.props.location.pathname !== nextProps.location.pathname){
            const url = subitemsAPI(nextProps.apiName);
            axios.get(url).then((response) => (this.setState({ subcategories: response.data })));
        }
    }

    render() {
        return (
            <div className={"subcategory-div"}>
                <h1>Welcome to our {this.props.sectionName} section - </h1>
                <h4>It is the perfect destination for you to shop: </h4>
                <ListGroup className={"subcategory-ul"}>
                    {this.state.subcategories.map((subcategory) => (
                        <ListGroupItem key={subcategory} className={"subcategory-li"}>
                            <Link to={this.props.location.pathname + "/" + subcategory.toLowerCase()}>{subcategory}</Link>
                        </ListGroupItem>
                    ))
                    }
                </ListGroup>
            </div>
        )
    }
}

export default CategoryBase;