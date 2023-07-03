import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "antd/lib/modal/Modal";
import { Button, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const { REACT_APP_PATH2 } = process.env;

const ButtonCreateData = (index) => {
    const year = useParams();
    const [data, setData] = useState("");
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };
    const handleCancel = () => {
        setVisible(false);
    };

    const handleChange = (e) => {
        setData(e.target.value);
    };

    const handleOk = () => {
        
       const payload = {
            data_name: data,
            url: "",
        };

        
        axios
            .post(`${REACT_APP_PATH2}/admin/api/CreateDataInGroup/${year.year}/${index.index}`, payload)
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
    return (
        <div className="d-flex justify-content-between align-items-center pt-3">
            <Button type="primary" onClick={showModal}>
                + เพิ่มข้อมูล
            </Button>
            <Modal title="เพิ่มชื่อข้อมูล"  open={visible}  onCancel={handleCancel} onOk={handleOk}>
                <Form>
                    <Form.Group controlId="formBasicYear">
                        <Form.Label>ชื่อข้อมูล</Form.Label>
                        <Input onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default ButtonCreateData;
