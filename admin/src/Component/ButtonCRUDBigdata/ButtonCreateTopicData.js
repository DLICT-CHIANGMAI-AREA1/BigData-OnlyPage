import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "antd/lib/modal/Modal";
import { Button, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const { REACT_APP_PATH2 } = process.env;

const ButtonCreateTopicData = () => {
    const yeartoCreate = useParams();
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleOk = () => {
        console.log(`${REACT_APP_PATH2}/admin/api/CreateTopicData/${yeartoCreate.year}`)

        const payload = {
            Name: name,
            Data: [],
        };

        axios
            .post(`${REACT_APP_PATH2}/admin/api/CreateTopicData/${yeartoCreate.year}`, payload)
            .then((response) => {
                toast.success("Year created successfully!");
                setVisible(false);
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to create year");
            });
        setVisible(false);
    };

    const handleYearChange = (e) => {
        setName(e.target.value);
    };

    return (
        <div className="CreateDataTopicButton">
            <Button type="primary" onClick={showModal}>
                + เพิ่มหัวข้อข้อมูล
            </Button>
            <Modal title="เพิ่มหัวข้อข้อมูล" open={visible} onCancel={handleCancel} onOk={handleOk}>
                <Form>
                    <Form.Group controlId="formBasicYear">
                        <Form.Label>ชื่อ</Form.Label>
                        <Input onChange={handleYearChange} />
                    </Form.Group>
                </Form>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default ButtonCreateTopicData;
