import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams } from "react-router-dom";
const { REACT_APP_PATH2, REACT_APP_IMGEPATH } = process.env;
const ButtonEdit = (x) => {
    const { param1, param2, param3 } = useParams();
    const [show, setShow] = useState(false);
    const [name, setName] = useState(x.data.name);
    const [URL, setURL] = useState(x.data.url);
    const [csv, setCsv] = useState(x.data.csv);
    const [Pdf, setPdf] = useState(x.data.pdf);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const notify = () =>
        toast.warn("กรุณา กรอกข้อมูลให้ครบถ้วน ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    const notifySucceed = () =>
        toast.success("อัพเดทข้อมูลสำเร็จ", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    const uploadFile = async (e) => {
        const file = e.target.files[0];
        setPdf(file);
    };
    const uploadCSVFile = async (e) => {
        const file = e.target.files[0];
        setCsv(file);
    };

    const onSubmit = async () => {
        if (name === "") {
            notify();
        } else {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("url", URL);
            formData.append("csv", csv);
            formData.append("pdf", Pdf);
            const id = toast.loading("Please wait...");
            await axios
                .post(`${REACT_APP_PATH2}/admin/api/UpdateDataOfGroup/${param1}/${param2}/${param3}/${x.id_data}`, formData)
                .then((a) => {
                    toast.update(id, { render: "All is good", type: "success", isLoading: false });
                    notifySucceed();
                    setTimeout(Reload, 1000);
                });
        }
    };

    function Reload() {
        window.location.reload();
    }
    return (
        <td className="col-md-10">
            <img
                style={{ marginTop: "11px" }}
                src={`${REACT_APP_IMGEPATH}/images/contract.png`}
                alt="Girl in a jacket"
                width="50"
                height="50"
                className="pointer"
                onClick={handleShow}
            ></img>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>เเก้ไขข้อมูล</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ชื่อ</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={URL}
                                onChange={(event) => setURL(event.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload CSV file</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".csv"
                                onChange={(e) => {
                                    uploadCSVFile(e);
                                }}
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload PDF file</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".pdf"
                                onChange={(e) => {
                                    uploadFile(e);
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </td>
    );
};

export default ButtonEdit;
