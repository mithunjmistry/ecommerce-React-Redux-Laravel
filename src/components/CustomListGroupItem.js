import React from "react";
import {Button} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class CustomListGroupItem extends React.Component{

    viewClickHandler = (routeName) => {
        this.props.history.push(routeName);
    };

    render() {
        return (
            <li className="list-group-item">
                <h4>{this.props.children}</h4>
                <div>
                    {this.props.prevPrice && <span className={"subcategory-deal-price-st"}>${this.props.prevPrice} </span>}
                    <span className={"subcategory-deal-price"}>${this.props.currentPrice}</span>
                </div>
                <div>
                  <span>
                      <Button bsStyle={"link"} onClick={() => this.viewClickHandler("/")}>View</Button>
                      <Button bsStyle={"link"}>Add to Cart</Button>
                  </span>
                </div>
            </li>
        )
    }
}

export default withRouter(CustomListGroupItem);