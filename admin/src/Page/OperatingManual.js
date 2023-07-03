import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const { REACT_APP_PATH2 } = process.env;

const PDFViewer = () => {
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

    const [Data, setData] = useState("");
    const [Id, setId] = useState("");
    console.log(Id);
    useEffect(() => {
        function get() {
            axios.get(`${REACT_APP_PATH2}/admin/api/get_uploadOPM`).then((res) => {
                console.log(res);
                setData(res.data[0].url);
                setId(res.data[0].id);
            });
        }
        get();
    }, []);

    const [input, setInput] = useState([]);
    const [File, setFile] = useState();

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const { files } = e.target;
        let images = [];
        const selecteds = [...[...files]];
        selecteds.forEach((i) => images.push(URL.createObjectURL(i)));
        setInput(images);
        setFile(file);
    };

    const notify = () =>
        toast.warn("กรุณา upload file pdf. ", {
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
        toast.success("upload file สำเร็จ", {
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

    const editOPM = async () => {
        if (input.length === 0) {
            notify();
        } else {
            const formData = new FormData();
            formData.append("name", "operation");
            formData.append("file", File);
            /*await axios.post(`${REACT_APP_PATH2}/admin/api/uploadOPM`, formData).then((res) => {
                notifySucceed();
                setTimeout(Reload, 2000);
            });*/

            const id = toast.loading("Please wait...");
            await axios.post(`${REACT_APP_PATH2}/admin/api/updateOPM/${Id}`, formData).then((res) => {
                toast.update(id, { render: "All is good", type: "success", isLoading: false });
                notifySucceed();
                setTimeout(Reload, 2000);
            });
        }
    };

    return (
        <Container>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="op">
                            {Data ? (
                                <iframe
                                    src={`${Data}`}
                                    frameBorder="0"
                                    height="90%"
                                    width="90%"
                                    title="myFrame"
                                ></iframe>
                            ) : (
                                <Spinner
                                    animation="border"
                                    role="status"
                                    style={{ width: "3rem", height: "3rem", margin: "20px" }}
                                >
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            )}
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="landing">
                                    {Data ? (
                                        input.map((i) => (
                                            <div className="op">
                                                <iframe
                                                    key={i}
                                                    src={i}
                                                    frameborder="0"
                                                    height="90%"
                                                    width="100%"
                                                    title="myFrame"
                                                ></iframe>
                                            </div>
                                        ))
                                    ) : (
                                        <Spinner
                                            animation="border"
                                            role="status"
                                            style={{ width: "3rem", height: "3rem", margin: "20px" }}
                                        >
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    )}
                                    <form>
                                        <label>
                                            <Row>
                                                <Col xs={12} md={5} xl={12}>
                                                    <Form.Group
                                                        controlId="formFile"
                                                        className="mb-3"
                                                        onChange={(e) => {
                                                            uploadImage(e);
                                                        }}
                                                    >
                                                        <Form.Control type="file" accept="application/pdf" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12} md={6} xl={5}>
                                                    <Button
                                                        variant="primary"
                                                        className="upload"
                                                        type="button"
                                                        onClick={editOPM}
                                                    >
                                                        {" "}
                                                        Upload
                                                    </Button>

                                                    <ToastContainer />
                                                </Col>
                                            </Row>
                                        </label>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
};

export default PDFViewer;
