import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const { REACT_APP_PATH2 } = process.env;

const ButtonCreateMedia = () => {
    const [showAddRecord, setShowAddRecord] = useState(false);
    const handleCloseAddRecord = () => setShowAddRecord(false);
    const handleShowAddRecord = () => setShowAddRecord(true);
    const [Video, setVideo] = useState();

    const notify = () =>
        toast.warn("กรุณากรอกข้อมูลให้ครบถ้วน ", {
            position: "top-right",
            autoClose: 2000,
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
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    function Reload() {
        window.location.reload();
    }

    const validation = (url) => {
        const regEx = new RegExp("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?");
        return regEx.test(url);
    };

    const notifyURL = () =>
        toast.warn("URL ไม่ถูกต้อง ", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    const onSubmit = async () => {
        if (Video === "") {
            notify();
        } else if (validation(Video) === false) {
            notifyURL();
        } else {
            let data = { url: Video };
            await axios.post(`${REACT_APP_PATH2}/admin/api/AddVideo`, data).then((a) => {
                notifySucceed();
                setTimeout(Reload, 2000);
            });
        }
    };

    return (
        <div className="CreateDataButton">
            <Button type="primary" onClick={handleShowAddRecord}>
                + Add Video
            </Button>

            <Modal show={showAddRecord} onHide={handleCloseAddRecord}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD VIDEO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>url video</Form.Label>
                            <Form.Control
                                type="url"
                                autoFocus
                                placeholder="https://example.com"
                                onChange={(event) => setVideo(event.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="default" onClick={handleCloseAddRecord}>
                        Close
                    </Button>
                    <Button type="primary" onClick={onSubmit}>
                        Create Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ButtonCreateMedia;
