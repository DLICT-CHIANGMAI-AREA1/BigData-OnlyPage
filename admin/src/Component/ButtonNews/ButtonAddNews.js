import React, { useState } from "react";
import { Button } from "antd";
import { Link  } from "react-router-dom";
const ButtonAddNews = () => {
   
    return (
        <div className="CreateDataButton">
            <Link className="btn" role="button" to={`/News/AddNews`}>
            <Button type="primary" >
                + Add News
            </Button>
            </Link>
        </div>
    );
};

export default ButtonAddNews;
