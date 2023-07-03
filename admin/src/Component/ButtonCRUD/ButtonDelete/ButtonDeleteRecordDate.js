import React from "react";
import axios from "axios";
import { Button, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const { REACT_APP_PATH2 } = process.env;

const ButtonDeleteRecord = (props) => {
  const { id_year, id_data } = props;

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this record?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios
          .delete(`${REACT_APP_PATH2}/admin/api/DeleteGroupOfYear/${id_year}/${id_data}`)
          .then(() => {
            notifySucceed();
            setTimeout(Reload, 2000);
          })
          .catch(() => {
            message.error("Failed to delete the record.");
          });
      },
    });
  };

  const notifySucceed = () =>
    toast.success("Record deleted successfully.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const Reload = () => {
    window.location.reload();
  };

  return (
    <Button type="primary"  className="m-2" danger onClick={handleDelete}>
      Delete Record
    </Button>
  );
};

export default ButtonDeleteRecord;
