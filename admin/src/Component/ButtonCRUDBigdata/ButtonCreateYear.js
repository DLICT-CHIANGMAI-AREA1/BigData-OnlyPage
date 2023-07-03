import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "antd/lib/modal/Modal";
import { Button, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const { REACT_APP_PATH2 } = process.env;

const ButtonCreateYear = () => {
    const [visible, setVisible] = useState(false);
    const [year, setYear] = useState("");

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleOk = () => {
        // Handle form submission
        const data = {
            name_year: year,
            group: [
                {
                    Name: "ข้อมูลทั่วไป",
                    Data: [
                        {
                            data_name: "ทะเบียนโรงเรียน",
                            url: "",
                        },
                        {
                            data_name: "ข้อมูลที่อยู่และการติดต่อ",
                            url: "",
                        },
                        {
                            data_name: "แผนที่ภูมิศาสตร์/การเดินทาง",
                            url: "",
                        },
                        {
                            data_name: "เครือข่ายเว็บไซต์โรงเรียน",
                            url: "",
                        },
                        {
                            data_name: "โครงการพิเศษ",
                            url: "",
                        },
                        {
                            data_name: "ผลงาน/วิธีปฏิบัติที่เป็นเลิศ",
                            url: "",
                        },
                        {
                            data_name: " ข้อมูล.เลิกสถานศึกษา",
                            url: "",
                        },
                    ],
                },
                {
                    Name: "ข้อมูลนักเรียน",
                    Data: [
                        {
                            data_name: "สรุป นร.รายชั้นเรียน",
                            url: "",
                        },
                        {
                            data_name: "นร.จำแนกช่วงชั้น",
                            url: "",
                        },
                        {
                            data_name: "นร.จำแนกรายชั้นเรียน",
                            url: "",
                        },
                        {
                            data_name: "นร.จำแนกตามอายุ",
                            url: "",
                        },
                        {
                            data_name: "นร.จำแนกตามความพิการ",
                            url: "",
                        },
                        {
                            data_name: "นร.จำแนกความด้อยโอกาส",
                            url: "",
                        },
                        {
                            data_name: "นร.จำแนกตามสัญชาติ",
                            url: "",
                        },
                        {
                            data_name: "นร.จำแนกตามศาสนา",
                            url: "",
                        },
                        {
                            data_name: "นร.เดินทางเกิน 3 กม.",
                            url: "",
                        },
                        {
                            data_name: "ภาวะโภชนาการ /ส่วนสูง",
                            url: "",
                        },
                        {
                            data_name: "ภาวะโภชนาการ /น้ำหนัก",
                            url: "",
                        },
                        {
                            data_name: "นร.จบการศึกษา ป.6",
                            url: "",
                        },
                    ],
                },
                {
                    Name: "ข้อมูลบุคลากร",
                    Data: [
                        {
                            data_name: "ครูและบุคลากรฯ",
                            url: "",
                        },
                        {
                            data_name: "ตารางจำแนก.เพศ",
                            url: "",
                        },
                        {
                            data_name: "ตารางจำแนก.ตำแหน่ง",
                            url: "",
                        },
                        {
                            data_name: "ตารางจำแนก.วิทยฐานะ",
                            url: "",
                        },
                        {
                            data_name: "ตารางจำแนก.วุฒิการศึกษา",
                            url: "",
                        },
                        {
                            data_name: "แผนอัตรากำลังข้าราชการ",
                            url: "",
                        },
                        {
                            data_name: "บุคลากรเกษียณอายุ",
                            url: "",
                        },
                    ],
                },
                {
                    Name: "ข้อมูลงบประมาณ",
                    Data: [
                        {
                            data_name: "รายงานบริหารงบประมาณ",
                            url: "",
                        },
                        {
                            data_name: "อาคารและสิ่งปลูกสร้าง",
                            url: "",
                        },
                    ],
                },
                {
                    Name: "ข้อมูลด้านวิชาการ",
                    Data: [
                        {
                            data_name: "O-Net ป.๖/ม.๓",
                            url: "",
                        },
                        {
                            data_name: "NT ป.๓",
                            url: "",
                        },
                        {
                            data_name: "RT การอ่าน ป.๑",
                            url: "",
                        },
                        {
                            data_name: "ตรวจผลการเรียน นร.",
                            url: "",
                        },
                    ],
                },
                {
                    Name: "วิเคราะห์ EDU.Analytics",
                    Data: [
                        {
                            data_name: "แนวโน้ม จำนวน นร.",
                            url: "",
                        },
                        {
                            data_name: "แนวโน้ม จำนวนห้องเรียน",
                            url: "",
                        },
                        {
                            data_name: "แนวโน้ม ขนาดโรงเรียน",
                            url: "",
                        },
                    ],
                },
            ],
        };

        axios
            .post(`${REACT_APP_PATH2}/admin/api/CreateYear/${year}`, data)
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
        setYear(e.target.value);
    };

    return (
        <div className="CreateDataButton">
            <Button type="primary" onClick={showModal}>
                + เพิ่มปีการศึกษาของข้อมูล
            </Button>
            <Modal title="เพิ่มปีการศึกษาของข้อมูล"  open={visible}  onCancel={handleCancel} onOk={handleOk}>
                <Form>
                    <Form.Group controlId="formBasicYear">
                        <Form.Label>ปีการศึกษา</Form.Label>
                        <Input onChange={handleYearChange} />
                    </Form.Group>
                </Form>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default ButtonCreateYear;
