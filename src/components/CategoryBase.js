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

    componentDidUpdate(prevProps){
        if(prevProps.location.pathname !== this.props.location.pathname) {
            console.log("Here");
            fetch("http://127.0.0.1:8000/subitems/" + this.props.apiName)
                .then(response => response.json())
                .then(subcategories => this.setState({ subcategories }));
        }
    }

    render() {
        return (
            <div className={"subcategory-div"}>
                <h1>Welcome to our {this.props.sectionName} section - </h1>
                <h4>It is the perfect destination for you to shop: </h4>
                <ListGroup>
                    {this.state.subcategories.map((subcategory) => (
                        <ListGroupItem key={subcategory}><Link to={"/"}>{subcategory}</Link></ListGroupItem>
                    ))
                    }
                </ListGroup>
            </div>
        )
    }
}

export default CategoryBase;