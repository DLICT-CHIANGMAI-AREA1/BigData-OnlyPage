import React, { useState } from "react";
import { Button } from "antd";
import { message, Popconfirm } from "antd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const { REACT_APP_PATH2 } = process.env;
const ButtonDeleteYear = (data) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleDeleteYear = async () => {
        try {
            setLoading(true);
            // Call the API to delete the data
            const response = await axios.delete(`${REACT_APP_PATH2}/admin/api/DeleteYear/${data.data}`);
            // Show success message
            message.success(response.data.message);
            navigate(`/big-data/year`);
        } catch (error) {
            // Show error message
            message.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    
    const confirmDelete = () => {
        // Show confirmation modal before deleting the data
        Popconfirm.confirm({
            title: "Are you sure you want to delete the data?",
            onOk: handleDeleteYear,
            okButtonProps: { loading },
        });
    };

    return (
        <Popconfirm
            title="คุณต้องการลบปีการศึกษานี้หรือไม่ ?"
            onConfirm={handleDeleteYear}
            okButtonProps={{ loading }}
        >
            <Button type="primary" style={{ marginLeft: "10px" }} danger>
                - ลบข้อมูลปีการศึกษา
            </Button>
        </Popconfirm>
    );
};

export default ButtonDeleteYear;
