import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Swa from "sweetalert2";
const { REACT_APP_PATH2, REACT_APP_IMGEPATH } = process.env;
const ButtonDelete = (x) => {
    const { param1, param2, param3 } = useParams();
    const [id, setId] = useState(x.id_data);

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
                const a = toast.loading("Please wait...");
                let data = axios
                    .delete(`${REACT_APP_PATH2}/admin/api/DeleteDataOfGroup/${param1}/${param2}/${param3}/${id}`)
                    .then((result) => {
                        toast.update(a, { render: "All is good", type: "success", isLoading: false });
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
        <td className="col-md-10">
            <img
                style={{ marginTop: "11px" }}
                src={`${REACT_APP_IMGEPATH}/images/delete-button.png`}
                alt="Girl in a jacket"
                width="40"
                height="45"
                className="pointer"
                onClick={Delete}
            ></img>
        </td>
    );
};

export default ButtonDelete;
