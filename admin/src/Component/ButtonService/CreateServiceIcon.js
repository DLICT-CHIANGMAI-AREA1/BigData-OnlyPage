import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Button } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const { REACT_APP_PATH2 } = process.env;

const ButtonCreateServiceIcon = (types) => {
    const [showAddRecord, setShowAddRecord] = useState(false);
    const handleCloseAddRecord = () => setShowAddRecord(false);
    const handleShowAddRecord = () => setShowAddRecord(true);
    const [Message, setMessage] = useState("");
    const [URL, setURL] = useState("");
    const [Image, setImage] = useState("");

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setImage(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

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

    const onSubmit = async () => {
        if (Message === "") {
            notify();
        } else {
            const data = {
                name: Message,
                url: URL,
                image: Image,
                type: types.data,
            };

            await axios.post(`${REACT_APP_PATH2}/admin/api/CreateService`, data).then((a) => {
                notifySucceed();
                setTimeout(Reload, 2000);
            });
        }
    };

    return (
        <div className="CreateDataButton">
            <Button type="primary" onClick={handleShowAddRecord}>
                + Add Service
            </Button>
            <Modal show={showAddRecord} onHide={handleCloseAddRecord}>
                <Modal.Header closeButton>
                    <Modal.Title>เพิ่มหัวข้อการบริการ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>เพิ่มหัวข้อการบริการ</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                onChange={(event) => setMessage(event.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    onChange={(event) => setURL(event.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Form>
                        <Form>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>เลือกรูปภาพ</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => {
                                        uploadImage(e);
                                    }}
                                />
                            </Form.Group>
                        </Form>
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

export default ButtonCreateServiceIcon;
