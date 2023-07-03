import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import edit_icon from "../../assets/img/edit.png";
const { REACT_APP_PATH2 } = process.env;
const TitleText = (types) => {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [Title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [id,setId] = useState('');
   

    const notifySucceed = () =>
        toast.success("เเก้ไขรายการาสำเร็จ", {
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

    const onSubmit = async () => {
        if (Title === "" || subTitle === "") {
            notify();
        } else {
            let data = {
                title: Title,
                subtitle: subTitle,
            };
              
            await axios.post(`${REACT_APP_PATH2}/admin/api/ServiceTitle/${types.data}`,data).then((a) => {
                notifySucceed();
                setTimeout(Reload, 2000);
            });
        }
    };
    
    useEffect(() => {
        function get() {
            axios.get(`${REACT_APP_PATH2}/admin/api/ServiceTitleFindByType/${types.data}`).then((res) => {
                setTitle(res.data[0].title)
                setSubTitle(res.data[0].subtitle)
                setId(res.data[0]._id)
             
            });
        }
        get();
    }, []);


    return (
        <div>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-end m-2">
                <div className="row">
                    <div className="col-12">
                        <h2 className="pt-3">{Title}</h2>
                    </div>
                    <div className="col">
                        <p className="pt-3">{subTitle}</p>
                    </div>
                </div>
                <img className="edit_img_size" alt="Edit" src={edit_icon} onClick={handleShow}></img>
            </ListGroup.Item>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>เเก้ไขข้อมูล</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={Title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Form>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>SubTitle</Form.Label>
                            <Form.Control
                                as="textarea"
                                type="text"
                                autoFocus
                                value={subTitle}
                                onChange={(event) => setSubTitle(event.target.value)}
                                required
                                rows={3}
                            />
                        </Form.Group>
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
            </div>
        </div>
    );
};

export default TitleText;
