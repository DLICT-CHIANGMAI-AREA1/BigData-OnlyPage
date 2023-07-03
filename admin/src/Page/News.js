import React, { useEffect, useState } from "react";
import axios from "axios";
import AddNewsButton from "../Component/ButtonNews/ButtonAddNews";
import { Container } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ListGroup from "react-bootstrap/ListGroup";
import ListsNews from "../Component/ListComponent/ListNew";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const { REACT_APP_PATH2 } = process.env;
const NewPage = () => {


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
            axios.get(`${REACT_APP_PATH2}/admin/api/FindNews`).then((res) => {
                setData(res.data);
            });
        }
        get();
    }, []);

    return (
        <Container>
            <div className="container ">
                <div className="row">
                    <div className="row">
                        <div className="col-12">
                            <div className="landing-data-page">
                                <div className="p-2">
                                    <AddNewsButton />
                                </div>
                                <div className="row ">
                                    <ListGroup variant="flush">
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="col-md-10">Name</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Data ? (
                                                    Data.map((data) => {
                                                        return <ListsNews key={data.id} data={data} />; // map ออกมาเป็นปีก่อน
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

export default NewPage;
