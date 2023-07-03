import React from "react";
import Swa from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import delete_icon from "../../assets/img/backspace.png";
const { REACT_APP_PATH ,REACT_APP_PATH2} = process.env;
const SubMission = (data) => {
    const id = data.data.id;
    const notifySucceed = () =>
        toast.success("ลบรายการสำเร็จ", {
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
    const Delete = async () => {
        Swa.fire({
            title: "ต้องการลบข้อมูลนี้หรือไม่",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${REACT_APP_PATH2}/admin/api/DeleteMission/${id}`).then((result) => {
                    notifySucceed();
                    setTimeout(Reload, 2000);
                });
            }
        });
    };

    return (
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="pt-3">{data.data.text_name}</div>
            <img src={delete_icon} className="delete_img_size" alt="Delete" onClick={Delete}></img>
        </ListGroup.Item>
    );
};

export default SubMission;
