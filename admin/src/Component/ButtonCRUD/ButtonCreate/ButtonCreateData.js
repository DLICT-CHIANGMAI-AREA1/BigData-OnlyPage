import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const { REACT_APP_PATH2 } = process.env;
const ButtonAdd = (x) => {
    const [param] = useState(x.id_year);
    const [param2] = useState(x.id_group);
    const [param3] = useState(x.id_data);
    const [showAddRecord, setShowAddRecord] = useState(false);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [csv, setCsv] = useState("");
    const [Pdf, setPdf] = useState("");
    const handleCloseAddRecord = () => setShowAddRecord(false);
    const handleShowAddRecord = () => setShowAddRecord(true);
    /*****************************************/

    const onSubmit = async () => {
        if (name === "") {
            notify();
        } else {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("url", url);
            formData.append("csv", csv);
            formData.append("pdf", Pdf);
            const id = toast.loading("Please wait...");
            await axios
                .post(`${REACT_APP_PATH2}/admin/api/CreateDataOfGroup/${param}/${param2}/${param3}`, formData)
                .then((a) => {
                    toast.update(id, { render: "All is good", type: "success", isLoading: false });
                    notifySucceed();
                    setTimeout(Reload, 1000);
                });
        }
    };

    const uploadFile = async (e) => {
        const file = e.target.files[0];
        setPdf(file);
    };

    const uploadCSVFile = async (e) => {
        const file = e.target.files[0];
        setCsv(file);
    };

    return (
        <div className="CreateDataButton">
            <Button type="primary"  className="" onClick={handleShowAddRecord}>
                + Add New Data
            </Button>
            <Modal show={showAddRecord} onHide={handleCloseAddRecord}>
                <Modal.Header closeButton>
                    <Modal.Title>เพิ่มข้อมูล</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ชื่อข้อมูล</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>URL ของ DataVisualization</Form.Label>
                            <Form.Control type="text" autoFocus onChange={(event) => setUrl(event.target.value)} />
                        </Form.Group>
                    </Form>
                    <Form>
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
                    <Button type="default" onClick={handleCloseAddRecord}>
                        Close
                    </Button>
                    <Button type="primary" onClick={onSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
                <ToastContainer />
            </Modal>
        </div>
    );
};

function Reload() {
    window.location.reload();
}
const notify = () =>
    toast.warn("กรุณากรอกข้อมูลให้ถูกต้อง ", {
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
    toast.success("เพิ่มข้อมูลสำเร็จ", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

export default ButtonAdd;
