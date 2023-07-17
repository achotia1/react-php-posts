import React from 'react';
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, handleYes, handleNo }) => {
    return (
        <Modal show={show} onHide={handleNo}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure, you want to delete this record?</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleYes}>
                    Yes
                </Button>
                <Button variant="danger" onClick={handleNo}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;