import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const { REACT_APP_PATH2 } = process.env;

const CreatePerson = () => {
    const [showAddRecord, setShowAddRecord] = useState(false);
    const handleCloseAddRecord = () => setShowAddRecord(false);
    const handleShowAddRecord = () => setShowAddRecord(true);
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [JobTitle, setJobTitle] = useState("");
    const [Department, setDepartment] = useState("");
    const [Genders, setGenders] = useState("");
    const [Position, setPosition] = useState("");
    const [Profile, setProfile] = useState("");
    const [OperatingManual, setOperatingManual] = useState("");

    const notify = () =>
        toast.warn("กรุณากรอกข้อมูลให้ครบถ้วน ", {
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
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
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
    function Reload() {
        window.location.reload();
    }

    const onSubmit = async () => {
        if (FirstName === "" || LastName === "" || JobTitle === "" || Department === "" || Genders === "" || Position === "") {
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
            const id = toast.loading("Please wait...");
            await axios.post(`${REACT_APP_PATH2}/admin/api/CreatePerson`, formData).then((a) => {
                toast.update(id, { render: "All is good", type: "success", isLoading: false });
                notifySucceed();
                setTimeout(Reload, 2000);
            });
        }
    };

    return (
        <div className="CreateDataButton">
            <button type="button" className="btn btn-success" onClick={handleShowAddRecord}>
                + Add Person
            </button>
            <Modal show={showAddRecord} onHide={handleCloseAddRecord}>
                <Modal.Header closeButton>
                    <Modal.Title>รายละเอียด</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-4">
                            <Col>
                                <Form.Control
                                    placeholder="First name"
                                    type="text"
                                    autoFocus
                                    onChange={(event) => setFirstName(event.target.value)}
                                    required
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    placeholder="Last name"
                                    type="text"
                                    autoFocus
                                    onChange={(event) => setLastName(event.target.value)}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Select onChange={(event) => setGenders(event.target.value)}>
                                    <option value="">เพศ</option>
                                    <option value="ชาย">ชาย</option>
                                    <option value="หญิง">หญิง</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Select onChange={(event) => setPosition(event.target.value)}>
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
                                    onChange={(event) => setJobTitle(event.target.value)}
                                    required
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    placeholder="กลุ่ม"
                                    type="text"
                                    autoFocus
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
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    onChange={(event) => setPhone(event.target.value)}
                               
                                />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>คู่มือปฎิบัติงาน</Form.Label>
                                    <Form.Control type="file" accept="application/pdf" onChange={AddOPM} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Profile</Form.Label>
                                    <Form.Control type="file" accept="image/png, image/jpeg" onChange={AddIMG} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddRecord}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        Create Save
                    </Button>
                </Modal.Footer>
                <ToastContainer />
            </Modal>
        </div>
    );
};

export default CreatePerson;
