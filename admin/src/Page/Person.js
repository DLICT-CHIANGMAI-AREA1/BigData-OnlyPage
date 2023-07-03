import React, { useEffect, useState } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Spinner } from "react-bootstrap";
import { Container } from "react-bootstrap";
import ListPerson from "../Component/ListComponent/ListPerson";
import CreatePerson from "../Component/ButtonCRUDPerson/CreatePerson";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const { REACT_APP_PATH2 } = process.env;
const Person = () => {
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
            axios.get(`${REACT_APP_PATH2}/admin/api/DataPerson`).then((res) => {
                setData(res.data);
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
                                    <CreatePerson />
                                </div>
                                <ListGroup>
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Profile</th>
                                                <th className="col-md-10">Name</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Data ? (
                                                Data.map((data) => {
                                                    return <ListPerson key={data._id} data={data} />; // map ออกมาเป็นปีก่อน
                                                })
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

export default Person;
