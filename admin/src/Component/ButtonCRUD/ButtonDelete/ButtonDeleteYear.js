
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { REACT_APP_PATH2, REACT_APP_IMGEPATH } = process.env;

const { confirm } = Modal;

const ButtonDeleteYear = ({ id }) => {
    const handleDelete = () => {
        confirm({
            title: "ต้องการลบข้อมูลชุดนี้หรือไม่",
            icon: <ExclamationCircleOutlined />,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                axios.delete(`${REACT_APP_PATH2}/admin/api/DeleteDataYear/${id}`).then(() => {
                    notifySucceed();
                    setTimeout(Reload, 2000);
                });
            },
        });
    };

    const notifySucceed = () =>
        notification.success({
            message: "ลบรายการสำเร็จ",
            placement: "topRight",
            duration: 2,
            onClose: () => {
                setTimeout(Reload, 2000);
            },
        });

    function Reload() {
        window.location.reload();
    }
    return (
        <div>
        <Link className="btn" role="button">
            <img
               src={`${REACT_APP_IMGEPATH}/images/delete-button.png`}
                alt="Girl in a jacket"
                width="40"
                height="45"
                className="pointer"
                onClick={handleDelete}
            ></img>
        </Link>
    </div>
        
    );
};

export default ButtonDeleteYear;

