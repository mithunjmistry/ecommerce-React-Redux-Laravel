import React from "react";
import {Button, Row, Col} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import StarRatingComponent from 'react-star-ratings';

class CustomListGroupItemSearch extends React.Component{

    viewClickHandler = (routeName) => {
        this.props.history.push(routeName);
    };

    render() {
        return (
            <li className="list-group-item">
                <div className={"media-left"}>
                    <img className="media-object" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEzLjQ2MDkzNzUiIHk9IjMyIiBzdHlsZT0iZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NjR4NjQ8L3RleHQ+PC9nPjwvc3ZnPg==" alt="..." />
                </div>
                <div className={"media-body"}>
                    <Row>
                        <Col lg={7} md={7}>
                            <h4 className={"media-heading"}>{this.props.children}</h4>
                            <div className={"seller-name-div"}>
                                <span>{this.props.sellerName}</span>
                            </div>
                            <div>
                                {this.props.prevPrice && <span className={"subcategory-deal-price-st"}>${this.props.prevPrice} </span>}
                                <span className={"subcategory-deal-price"}>${this.props.currentPrice}</span>
                            </div>
                        </Col>

                        <Col lg={3} md={3}>
                            <div className={"star-rating-div"}>
                                {(this.props.ratings && this.props.ratings > 0) ?
                                    <StarRatingComponent
                                        rating={this.props.ratings}
                                        starDimension={"20px"}
                                        starSpacing={"0px"}
                                        starRatedColor={"rgb(247, 202, 37)"}
                                    />
                                    :
                                    <span className={"not-enough-ratings-span"}>Not enough ratings</span>
                                }
                            </div>
                        </Col>

                        <Col md={2} lg={2}>
                            <div>
                              <span>
                                  <Button bsStyle={"link"} onClick={() => this.viewClickHandler("/")}>View</Button>
                                  <Button bsStyle={"link"}>Add to Cart</Button>
                              </span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </li>
        )
    }
}

export default withRouter(CustomListGroupItemSearch);