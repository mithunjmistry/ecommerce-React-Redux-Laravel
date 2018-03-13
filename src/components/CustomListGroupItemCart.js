import React from "react";
import {Row, Col, Button, FormControl, Glyphicon, Tooltip, OverlayTrigger} from "react-bootstrap";
import StarRatingComponent from 'react-star-ratings';

const tooltip = (
    <Tooltip id="tooltip">
        Remove Item
    </Tooltip>
);

class CustomListGroupItemCart extends React.Component{

    render() {
        return (
            <li className="list-group-item">
                <div className={"media-left"}>
                    <img className="media-object" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEzLjQ2MDkzNzUiIHk9IjMyIiBzdHlsZT0iZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NjR4NjQ8L3RleHQ+PC9nPjwvc3ZnPg==" alt="..." />
                </div>
                <div className={"media-body"}>
                    <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <h4 className={"media-heading"}>{this.props.productName}</h4>
                            <div className={"seller-name-div"}>
                                <span>{this.props.sellerName}</span>
                            </div>
                            <div>
                                {(this.props.ratings && this.props.ratings > 0) ?
                                    <StarRatingComponent
                                        rating={this.props.ratings}
                                        starDimension={"15px"}
                                        starSpacing={"0px"}
                                        starRatedColor={"rgb(247, 202, 37)"}
                                    />
                                    :
                                    ''
                                }
                            </div>
                        </Col>

                        <Col lg={4} md={4} sm={12} xs={12}>
                            <div className={"star-rating-div"}>
                                <span>
                                    <Button>-</Button>
                                    <FormControl type="number" className={"cart-quantity"}/>
                                    <Button>+</Button>
                                </span>
                            </div>
                        </Col>

                        <Col md={1} lg={1} sm={12} xs={12}>
                            <div className={"cart-price-div"}>
                              <span className={"cart-price"}>
                                  $19.99
                              </span>
                            </div>
                        </Col>

                        <Col md={1} lg={1} sm={12} xs={12}>
                            <div className={"cart-remove-div"}>
                                <OverlayTrigger placement="top" overlay={tooltip}>
                                    <span><Glyphicon glyph={"remove"}/></span>
                                </OverlayTrigger>
                            </div>
                        </Col>
                    </Row>
                </div>
            </li>
        )
    }
}

export default CustomListGroupItemCart;