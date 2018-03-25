import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class CategoryBase extends React.Component{
    state = {
      subcategories: []
    };

    componentDidMount(){
        // fetch data in this function
        fetch("http://127.0.0.1:8000/subitems/" + this.props.apiName)
            .then(response => response.json())
            .then(subcategories => this.setState({ subcategories }));
    }

    componentWillReceiveProps(nextProps){
        if(this.props.location.pathname !== nextProps.location.pathname){
            fetch("http://127.0.0.1:8000/subitems/" + nextProps.apiName)
                .then(response => response.json())
                .then(subcategories => this.setState({ subcategories }));
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