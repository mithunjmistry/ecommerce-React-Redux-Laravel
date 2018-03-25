import React from "react";
import {FormControl, Form, FormGroup, Button, Checkbox} from "react-bootstrap";

class AdvancedFilters extends React.Component {
    render() {
        return (
            <div>
                <Form>
                    <div className={"text-center margin-below"}>
                        <p>Ratings: </p>
                        <FormControl componentClass="select" placeholder="All">
                            <option value="select">Any</option>
                            <option value="other">More than 4</option>
                            <option value="other">More than 3</option>
                            <option value="other">1 to 3</option>
                        </FormControl>
                    </div>

                    <div className={"text-center margin-below"}>
                        <p>Price Range: </p>
                        <div className={"inline-advanced-div"}>
                            <FormGroup controlId="formInlineFrom">
                                <FormControl type="number" placeholder="From" className={"left-advanced-filter"}/>
                            </FormGroup>{' '}
                            <FormGroup controlId="formInlineTo">
                                <FormControl type="number" placeholder="To" className={"right-advanced-filter"}/>
                            </FormGroup>
                        </div>
                    </div>

                    <div>
                        <Checkbox>
                            Free Shipping
                        </Checkbox>
                    </div>

                    <div className={"inline-advanced-div"}>
                        <Button className={"btn-sm left-advanced-filter"}>Apply filters</Button>
                        <Button className={"btn-sm right-advanced-filter"} type={"reset"}>Clear filters</Button>
                    </div>

                </Form>
            </div>
        )
    }
}

export default AdvancedFilters;