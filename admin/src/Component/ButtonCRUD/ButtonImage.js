import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
const { REACT_APP_PATH } = process.env;
const ButtonEdit = (x) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <td className="col-md-2">
            <img src={`${REACT_APP_PATH}/${x.data.image}`} className="pointer" width="100" alt="button" onClick={handleShow}></img>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <img
                        src={`${REACT_APP_PATH}/${x.data.image}`}
                        className="imageInModel"
                        width="100"
                        alt="button"
                        onClick={handleShow}
                    ></img>
                </Modal.Body>
            </Modal>
        </td>
    );
};

export default ButtonEdit;
