import React from "react";
import {Modal} from "react-bootstrap";
import AdvancedFilters from "../components/AdvancedFilters";

const AdvancedFiltersModal = (props) => (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Advanced Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AdvancedFilters applyFilters={props.applyFilters} clearFilters={props.clearFilters}/>
        </Modal.Body>
    </Modal>
);

export default AdvancedFiltersModal;