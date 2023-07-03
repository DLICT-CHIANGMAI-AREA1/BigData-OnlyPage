import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
//import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import th_TH from 'antd/lib/locale/th_TH';
import moment from 'moment';
import 'moment/locale/th';
import { DatePicker, Space } from 'antd';
import { Button} from 'antd';

const { REACT_APP_PATH2 } = process.env;
const AddNewsPage = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState("");
    const [Headline, setHeadline] = useState("");
    const [Content, setContent] = useState("");
    const [input, setInput] = useState("");
    const [File, setFile] = useState("");
    moment.locale('th');
    const [Minput, setMInput] = useState([]);
    const [MFile, setMFile] = useState([]);

    const _treat = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        const { files } = e.target;
        let images = [];
        const selecteds = [...[...files]];
        selecteds.forEach((i) => images.push(URL.createObjectURL(i)));
        setInput(images);
        setFile(base64);
    };
    function _treatMultiple(e) {
        setMFile(e.target.files[0]);
        const { files } = e.target;
        const selecteds = [...[...files]];
        setFileLoop(selecteds);
    }
    async function setFileLoop(selecteds) {
        let images = [];
        for (const file of selecteds) {
            const base64 = await convertBase64(file);
            images.push(base64);
        }
        setMInput(images);
        setMFile(images);
    }
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

    const onSubmit = async () => {
        if (Headline === "" || Content === "") {
            notify();
        } else {
            let data = {
                Headline: Headline,
                content: Content,
                ImageTitle: File,
                ImageContent: MFile,
                DateTime: selectedDate,
                type: "ICT",
            };
            const id = toast.loading("Please wait...");
            console.log(data)
            await axios.post(`${REACT_APP_PATH2}/admin/api/AddNews`, data).then((res) => {
                if (res) {
                    toast.update(id, {render: "All is good", type: "success", isLoading: false});
                    notifySucceed();
                    setTimeout(() => {
                        navigate("/News");
                    }, 3000);
                }
            });
        }
    };

    const onChange = (date, dateString) => {
        setSelectedDate(dateString);
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
                                        <Button variant="primary" onClick={onSubmit}>
                                            {" "}
                                            + Upload News
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>HeadLine</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="text"
                                            onChange={(event) => setHeadline(event.target.value)}
                                        />
                                    </Form.Group>
                                </div>

                                <div class="p-2" className="img-center">
                           
                                        <img
                                           
                                            src={input}
                                            alt="Girl in a jacket"
                                            width="auto"
                                            class="zoom"
                                            height="500"
                                        ></img>
                              
                                </div>

                                <div className="p-2">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Content</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={10}
                                            onChange={(event) => setContent(event.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                                <div className="container">
                                    <div class="row" className="container-img">
                                        {Minput.map((i) => (
                                            <div className="item">
                                                <img
                                                    key={i}
                                                    src={i}
                                                    alt="Girl in a jacket"
                                                    width="auto"
                                                    height="200px"
                                                    className="zoom"
                                                ></img>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-2">
                                    <Space direction="vertical">
                                        <DatePicker locale={th_TH} format="DD MMMM YYYY" onChange={onChange} />
                                    </Space>
                                </div>
                                <div className="p-2">
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>ภาพปก</Form.Label>
                                        <Form.Control type="file" onChange={_treat} />
                                    </Form.Group>
                                </div>
                                <div className="p-2">
                                    <Form.Group controlId="formFileMultiple" className="mb-3">
                                        <Form.Label>ภาพอื่นๆ เพิ่มเติม</Form.Label>
                                        <Form.Control type="file" multiple onChange={_treatMultiple} />
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Container>
    );
};

export default AddNewsPage;
