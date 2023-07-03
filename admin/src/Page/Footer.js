import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const { REACT_APP_PATH2 } = process.env;

const Footer = () => {
    ////////////////////////////////////
    const jwt = localStorage.getItem("mini-session");
    const navigate = useNavigate();
    if (!jwt) {
        navigate("/Login");
    }

    if (jwt) {
        const { exp } = jwtDecode(jwt);
        const expirationTime = exp * 1000 - 60000;
        if (Date.now() >= expirationTime) {
            localStorage.clear();
            navigate("/Login");
        }
    }
    ////////////////////////////////////////////////////////////

    const notifySucceed = () =>
        toast.success("Update success", {
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
    ////////////////////////////////////////////////////

    const [Data, setData] = useState([]);
    const [Link, setLink] = useState([]);
    const [Id, setId] = useState();
    const [Id2, setId2] = useState();
    const [Id3, setId3] = useState();
    useEffect(() => {
        function get() {
            axios.get(`${REACT_APP_PATH2}/admin/api/getOther`).then((res) => {
                console.log(res.data);
                setData(res.data[0].array);
                setId(res.data[0].id);
                setId2(res.data[1].id);
                setId3(res.data[2].id);
                setFacebook(res.data[2].array.Facebook);
                setYoutube(res.data[2].array.Youtube);
                setTwitter(res.data[2].array.Twitter);
                setInstagram(res.data[2].array.Instagram);
                setTitle(res.data[1].array.Title);
                setDescription(res.data[1].array.Description);
            });
        }
        get();
    }, []);

    useEffect(() => {
        const mappedItems = Data.map((item) => {
            return item;
        });
        setText(mappedItems.join("\n"));
    }, [Data]);

    const [Text, setText] = useState([]);
    const [Title, setTitle] = useState();
    const [Description, setDescription] = useState();
    const [Facebook, setFacebook] = useState();
    const [Twitter, setTwitter] = useState();
    const [Instagram, setInstagram] = useState();
    const [Youtube, setYoutube] = useState();

    const handleSubmitContractUs = (event) => {
        const id = toast.loading("Please wait...");
        let data = { Facebook, Youtube, Twitter, Instagram };

        axios
            .post(`${REACT_APP_PATH2}/admin/api/editSocial/${Id3}`, data)
            .then((response) => {
                toast.update(id, { render: "All is good", type: "success", isLoading: false });
                notifySucceed();
                setTimeout(Reload, 2000);
            })
            .catch((error) => {
                console.error(error);
            });
        event.preventDefault();
    };
    const handleSubmit = (event) => {
        const lines = Text.split("\n");
        const id = toast.loading("Please wait...");
        axios
            .post(`${REACT_APP_PATH2}/admin/api/editFooter/${Id}`, lines)
            .then((response) => {
                toast.update(id, { render: "All is good", type: "success", isLoading: false });
                notifySucceed();
                setTimeout(Reload, 2000);
            })
            .catch((error) => {
                console.error(error);
            });
        event.preventDefault();
    };
    const handleSubmitBanner = (event) => {
        const id = toast.loading("Please wait...");
        let data = { Title, Description };
        console.log(data);
        axios
            .post(`${REACT_APP_PATH2}/admin/api/editBanner/${Id2}`, data)
            .then((response) => {
                toast.update(id, { render: "All is good", type: "success", isLoading: false });
                notifySucceed();
                setTimeout(Reload, 2000);
            })
            .catch((error) => {
                console.error(error);
            });
        event.preventDefault();
    };

    return (
        <Container>
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="col-12">
                            <div className="landing-data-page">
                                <div className="d-flex flex-row-reverse">
                                    <div className="p-2">
                                        <Button variant="primary" onClick={handleSubmit}>
                                            {" "}
                                            Update
                                        </Button>
                                    </div>
                                </div>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>เเก้ไข้ในส่วน Footer Website</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            defaultValue={Text}
                                            rows={10}
                                            onChange={(event) => setText(event.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="col-12">
                            <div className="landing-data-page">
                                <div className="d-flex flex-row-reverse">
                                    <div className="p-2">
                                        <Button variant="primary" onClick={handleSubmitBanner}>
                                            {" "}
                                            Update
                                        </Button>
                                    </div>
                                </div>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>เเก้ไข้ในส่วน Home banner Website</Form.Label>
                                        <Form.Group className="mb-3">
                                            <Form.Label>ชื่อกลุ่ม</Form.Label>
                                            <Form.Control
                                                type="text"
                                                defaultValue={Title}
                                                onChange={(event) => setTitle(event.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Label>คำอธิบาย</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={10}
                                            defaultValue={Description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="col-12">
                            <div className="landing-data-page">
                                <div className="d-flex flex-row-reverse">
                                    <div className="p-2">
                                        <Button variant="primary" onClick={handleSubmitContractUs}>
                                            {" "}
                                            Update
                                        </Button>
                                    </div>
                                </div>
                                <Form>
                                    <Form.Label>เเก้ไข้ในส่วน SocialMedia</Form.Label>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="1">
                                            Facebook
                                        </Form.Label>
                                        <Col sm="6">
                                            <Form.Control
                                                type="text"
                                                defaultValue={Facebook}
                                                onChange={(event) => setFacebook(event.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="1">
                                            Youtube
                                        </Form.Label>
                                        <Col sm="6">
                                            <Form.Control
                                                type="text"
                                                defaultValue={Youtube}
                                                onChange={(event) => setYoutube(event.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="1">
                                            Twitter
                                        </Form.Label>
                                        <Col sm="6">
                                            <Form.Control
                                                type="text"
                                                defaultValue={Twitter}
                                                onChange={(event) => setTwitter(event.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="1">
                                            Instagram
                                        </Form.Label>
                                        <Col sm="6">
                                            <Form.Control
                                                type="text"
                                                defaultValue={Instagram}
                                                onChange={(event) => setInstagram(event.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Container>
    );
};

export default Footer;
