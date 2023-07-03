import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ListYear from "../Component/ListComponent/ListYear";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import ButtonCreateRecordsYear from "../Component/ButtonCRUD/ButtonCreate/ButtonCreateRecord";
import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const { REACT_APP_PATH2 } = process.env;

const Data = () => {
    ////////////////////////////////////
    const jwt = localStorage.getItem("mini-session");
    const navigate = useNavigate();
    if (!jwt) {
        navigate("/Login");
    }

    if (jwt) {
        const { exp } = jwtDecode(jwt);
        const expirationTime = exp * 1000 - 60000;
        if (Date.now() >= expirationTime) {
            localStorage.clear();
            navigate("/Login");
        }
    }
    ////////////////////////////////////////////////////////////

    const [Data, setData] = useState("");
    useEffect(() => {
        function get() {
            axios.get(`${REACT_APP_PATH2}/admin/api/FindDataEachYear`).then((res) => {
                const dataArray = []; // create an empty array to store the parsed data
                for (const item of res.data) {
                    const parsedData = {
                        id: item.id, // add the id property to the parsed data object
                        year: JSON.parse(item.Year), // parse the Year property for each item
                    };
                    dataArray.push(parsedData); // store the parsed data in the array
                }
                setData(dataArray);
                // do something with the stored data
            });
        }
        get();
    }, []);
    return (
        <Container>
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="col-12">
                            <div className="landing-data-page">
                                <div className="p-2">
                                    <ButtonCreateRecordsYear />
                                </div>
                                <ListGroup>
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th className="col-md-10">ปีข้อมูล</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Data ? (
                                                Data.map((data) => {
                                                    return <ListYear key={data.id} data={data} />; // map ออกมาเป็นปีก่อน
                                                }).reverse()
                                            ) : (
                                                <Spinner
                                                    animation="border"
                                                    role="status"
                                                    style={{ width: "3rem", height: "3rem", margin: "20px" }}
                                                >
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            )}
                                        </tbody>
                                    </table>
                                    <ToastContainer />
                                </ListGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Data;
