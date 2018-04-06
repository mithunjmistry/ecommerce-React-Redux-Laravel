import React from "react";
import {Panel} from "react-bootstrap";
import axios from '../api/axiosInstance';
import LoadingScreen from '../components/LoadingScreen';
import CustomListGroupItem from './CustomListGroupItemProduct';

export default class WishList extends React.Component{

    state = {
        isLoading: false
    };

    componentDidMount(){
        // load the wishlist of the user here
        // this.setState(() => ({isLoading: true}));
    }

    render(){
        if(this.state.isLoading){
            return <LoadingScreen/>
        }

        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title componentClass="h3" className={"text-center"}>My Wishlist</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <CustomListGroupItem
                        key={1}
                        currentPrice={20.99}
                        prevPrice={40.25}
                        sellerName={"Seller Name"}
                        ratings={2}
                        productID={5}
                    >
                        {"Product Name"}
                    </CustomListGroupItem>
                </Panel.Body>
            </Panel>
        )
    }
}
