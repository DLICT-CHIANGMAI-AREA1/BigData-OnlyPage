import React, { useEffect, useState } from "react";
import axios from "axios";
import ButtonCreateMission from "../Component/ButtonMission/CreateMission";
import { Container } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ListGroup from "react-bootstrap/ListGroup";
import SubMission from "../Page/SubPage/subMission";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const { REACT_APP_PATH2 } = process.env;

const Mission = () => {
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

    const [Data, setData] = useState();
    useEffect(() => {
        function get() {
            axios.get(`${REACT_APP_PATH2}/admin/api/FindMission`).then((res) => {
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
                                    <ButtonCreateMission />
                                </div>
                                <div className="row ">
                                    <ListGroup variant="flush">
                                        {Data ? (
                                            Data.map((data) => {
                                                return <SubMission key={data.id} data={data} />;
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
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Container>
    );
};

export default Mission;
