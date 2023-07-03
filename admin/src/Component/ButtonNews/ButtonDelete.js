import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Swa from "sweetalert2";
import { Link } from "react-router-dom";
const { REACT_APP_IMGEPATH, REACT_APP_PATH2 } = process.env;

const ButtonDeleteNews = (x) => {
    const [id] = useState(x.data.data.id);
    const DeleteRecord = async () => {
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
                axios.delete(`${REACT_APP_PATH2}/admin/api/DeleteNews/${id}`).then((result) => {
                    notifySucceed();
                    setTimeout(Reload, 2000);
                });
            }
        });
    };
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

    return (
        <Link className="btn" role="button">
            <img
                src={`${REACT_APP_IMGEPATH}/images/delete-button.png`}
                alt="Girl in a jacket"
                width="40"
                height="45"
                className="pointer"
                onClick={DeleteRecord}
            ></img>
        </Link>
    );
};

export default ButtonDeleteNews;
