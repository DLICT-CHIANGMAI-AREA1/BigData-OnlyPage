import React from "react";
import ReactPlayer from "react-player/youtube";
import iconDelete from "../../../src/assets/img/close.png";
import Swa from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
const { REACT_APP_PATH2 } = process.env;

const EachLetter = (data) => {
    console.log(data.data.image);
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
            title: "ต้องการนำวิดิโอนี้ออกหรือไม่",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${REACT_APP_PATH2}/admin/api/DeleteLetter/${id}`).then((result) => {
                    notifySucceed();
                    setTimeout(Reload, 2000);
                });
            }
        });
    };

    return (
        <div className="col-sm-4 p-1">
        <div className="card">
            <div className="card-header d-flex justify-content-end">
                <img className="close_img_size" alt="video" src={iconDelete} onClick={Delete}></img>
            </div>
            <div className="card-body">
                <img src={data.data.image} alt="YourImageAltText" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
        </div>
    </div>
    
    );
};

export default EachLetter;
