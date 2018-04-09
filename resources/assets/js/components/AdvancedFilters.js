import React from "react";
import {FormControl, Form, FormGroup, Button, Checkbox} from "react-bootstrap";
import {ANY, MORE_THAN_FOUR, MORE_THAN_THREE, NO, ONE_TO_THREE, YES} from "../api/strings";

class AdvancedFilters extends React.Component {

    state = {
        priceRangeError: false,
        priceRangeErrorMessage: ''
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        const ratings = e.target.ratings.value;
        const from = e.target.from.value.trim();
        const to = e.target.to.value.trim();
        const fast_shipping = e.target.fast_shipping.value;

        if(from || to){
            if(from && to){
                if(parseFloat(from) >= parseFloat(to)){
                    this.setState(() => ({priceRangeError: true, priceRangeErrorMessage: '"To" should be greater than "From"'}));
                }
                else{
                    this.setState(() => ({priceRangeError: false}));
                }
            }
            else{
                this.setState(() => ({priceRangeError: true, priceRangeErrorMessage: 'From and To both must be present'}));
            }
        }

        if(!this.state.priceRangeError){
            const filters = {
                ratings,
                from,
                to,
                fast_shipping
            };
            this.props.applyFilters(filters);
        }
    };

    onFormReset = () => {
        this.setState(() => ({priceRangeError: false}));
        this.props.clearFilters();
    };

    render() {

        const {priceRangeError, priceRangeErrorMessage} = this.state;

        return (
            <div>
                <Form onSubmit={this.onFormSubmit}>
                    <div className={"text-center margin-below"}>
                        <p>Ratings: </p>
                        <FormControl componentClass="select" placeholder="All" name={"ratings"}>
                            <option value={ANY}>{ANY}</option>
                            <option value={MORE_THAN_FOUR}>{MORE_THAN_FOUR}</option>
                            <option value={MORE_THAN_THREE}>{MORE_THAN_THREE}</option>
                            <option value={ONE_TO_THREE}>{ONE_TO_THREE}</option>
                        </FormControl>
                    </div>

                    <div className={"text-center margin-below"}>
                        <p>Price Range: </p>
                        <div className={"inline-advanced-div"}>
                            <FormGroup controlId="formInlineFrom">
                                <FormControl type="number" placeholder="From" className={"left-advanced-filter"} name={"from"}/>
                            </FormGroup>{' '}
                            <FormGroup controlId="formInlineTo">
                                <FormControl type="number" placeholder="To" className={"right-advanced-filter"} name={"to"}/>
                            </FormGroup>
                        </div>
                        {priceRangeError && <span className={"error-message"}>{priceRangeErrorMessage}</span>}
                    </div>

                    <div className={"text-center margin-below"}>
                        <p>Fast Shipping: </p>
                        <FormControl componentClass="select" placeholder="All" name={"fast_shipping"}>
                            <option value={ANY}>{ANY}</option>
                            <option value={YES}>{YES}</option>
                            <option value={NO}>{NO}</option>
                        </FormControl>
                    </div>

                    <div className={"inline-advanced-div"}>
                        <Button className={"btn-sm left-advanced-filter"} type={"submit"}>Apply filters</Button>
                        <Button className={"btn-sm right-advanced-filter"} type={"reset"} onClick={this.onFormReset}>Clear filters</Button>
                    </div>

                </Form>
            </div>
        )
    }
}

export default AdvancedFilters;