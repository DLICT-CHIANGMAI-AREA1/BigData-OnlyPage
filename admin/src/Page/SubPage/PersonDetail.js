import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
const { REACT_APP_PATH2 } = process.env;
const PersonDetail = () => {
    // check token
    const navigate = useNavigate();
   
    ////////////////////////////////////////////////////
    const { param } = useParams();
    const [Data, setData] = useState();
    const [FirstName, setFirstName] = useState();
    const [LastName, setLastName] = useState();
    const [Email, setEmail] = useState();
    const [Phone, setPhone] = useState();
    const [JobTitle, setJobTitle] = useState();
    const [Department, setDepartment] = useState();
    const [Genders, setGenders] = useState();
    const [Profile, setProfile] = useState();
    const [OldProfile, setOldProfile] = useState();
    const [OperatingManual, setOperatingManual] = useState();
    const [Position, setPosition] = useState("");

    useEffect(() => {
        function get() {
            axios.get(`${REACT_APP_PATH2}/admin/api/DataPersonById/${param}`).then((res) => {
                console.log(res.data[0])
                setData(res.data[0]);
                setLastName(res.data[0].Last_name);
                setFirstName(res.data[0].First_name);
                setEmail(res.data[0].Email);
                setPhone(res.data[0].Phone);
                setJobTitle(res.data[0].Job_title);
                setDepartment(res.data[0].Department);
                setGenders(res.data[0].Gender);
                setProfile(res.data[0].Profile);
                setOldProfile(res.data[0].Profile);
                setPosition(res.data[0].Positions);
            });
        }
        get();
    }, [param]);

    function AddOPM(e) {
        setOperatingManual(e.target.files[0]);
    }

    const AddIMG = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        const { files } = e.target;
        let images = [];
        const selecteds = [...[...files]];
        selecteds.forEach((i) => images.push(URL.createObjectURL(i)));
        setProfile(base64);
        setOldProfile(base64);
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
        toast.warn("กรุณากรอกข้อมูลให้ครบถ้วน. ", {
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
        console.log("run");
        if (
            FirstName === "" ||
            LastName === "" ||
            JobTitle === "" ||
            Department === "" ||
            Genders === "" ||
            Position === ""
        ) {
            notify();
        } else {
            const formData = new FormData();
            formData.append("First_name", FirstName);
            formData.append("Last_name", LastName);
            formData.append("Gender", Genders);
            formData.append("Email", Email);
            formData.append("Job_title", JobTitle);
            formData.append("Department", Department);
            formData.append("Phone", Phone);
            formData.append("Operating_Manual", OperatingManual);
            formData.append("Profile", Profile);
            formData.append("Positions", Position);
        
            await axios.post(`${REACT_APP_PATH2}/admin/api/UpdatePerson/${param}`, formData).then((res) => {
            toast.loading("Please wait...");
                if (res) {
                    Swal.fire("เเก้ไขข้อมูลสำเร็จ").then(() => {
                        navigate("/Person");
                    });
                }
            });
        }
    };

    return (
        <Container>
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="col-12">
                            <div className="landing-data-page">
                                <div className="row p-2">
                                    <div className="col-5">
                                        <img
                                            src={`${OldProfile}`}
                                            alt="Girl in a jacket"
                                            width="350"
                                            height="500"
                                        ></img>
                                    </div>
                                    <div className="col">
                                        <Form>
                                            <Row className="mb-4">
                                                <Col>
                                                    <Form.Control
                                                        placeholder="First name"
                                                        type="text"
                                                        autoFocus
                                                        value={FirstName}
                                                        onChange={(event) => setFirstName(event.target.value)}
                                                        required
                                                    />
                                                </Col>
                                                <Col>
                                                    <Form.Control
                                                        placeholder="Last name"
                                                        type="text"
                                                        autoFocus
                                                        value={LastName}
                                                        onChange={(event) => setLastName(event.target.value)}
                                                        required
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mb-4">
                                                <Form.Group as={Col} controlId="formGridState">
                                                    <Form.Select
                                                        value={Genders}
                                                        onChange={(event) => setGenders(event.target.value)}
                                                    >
                                                        <option value="">เพศ</option>
                                                        <option value="ชาย">ชาย</option>
                                                        <option value="หญิง">หญิง</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridState">
                                                    <Form.Select
                                                        value={Position}
                                                        onChange={(event) => setPosition(event.target.value)}
                                                    >
                                                        <option value="">ลำดับขั้น</option>
                                                        <option value="leader">leader</option>
                                                        <option value="group_leader">group_leader</option>
                                                        <option value="general">general</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Row>
                                            <Row className="mb-4">
                                                <Col>
                                                    <Form.Control
                                                        placeholder="ตำเเหน่ง"
                                                        type="text"
                                                        autoFocus
                                                        value={JobTitle}
                                                        onChange={(event) => setJobTitle(event.target.value)}
                                                        required
                                                    />
                                                </Col>
                                                <Col>
                                                    <Form.Control
                                                        placeholder="กลุ่ม"
                                                        type="text"
                                                        autoFocus
                                                        value={Department}
                                                        onChange={(event) => setDepartment(event.target.value)}
                                                        required
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mb-4">
                                                <Col>
                                                    <Form.Control
                                                        placeholder="Email"
                                                        type="email"
                                                        autoFocus
                                                        value={Email}
                                                        onChange={(event) => setEmail(event.target.value)}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mb-4">
                                                <Col>
                                                    <Form.Control
                                                        placeholder="เบอร์โทร xxx-xxx-xxxx"
                                                        type="tel"
                                                        autoFocus
                                                        value={Phone}
                                                        onChange={(event) => setPhone(event.target.value)}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mb-4">
                                                <Col>
                                                    <Form.Group controlId="formFile" className="mb-3">
                                                        <Form.Label>คู่มือปฎิบัติงาน</Form.Label>
                                                        <Form.Control
                                                            type="file"
                                                            accept="application/pdf"
                                                            onChange={AddOPM}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group controlId="formFile" className="mb-3">
                                                        <Form.Label>Profile</Form.Label>
                                                        <Form.Control
                                                            type="file"
                                                            accept="image/png, image/jpeg"
                                                            onChange={AddIMG}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Button variant="primary" type="submit" onClick={onSubmit}>
                                                Update
                                            </Button>
                                            <ToastContainer />
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PersonDetail;
