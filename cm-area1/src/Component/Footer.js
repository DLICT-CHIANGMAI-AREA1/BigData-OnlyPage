import { Container, Row, Col } from "react-bootstrap";
import { Statistic } from "antd";
import { useState, useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";
import axios from "axios";
import { Card } from "antd";
const { REACT_APP_GA } = process.env;
const { REACT_APP_PATH2 } = process.env;
export const Footer = (className) => {
    const [Online, setOnline] = useState("");
    const [All, setAll] = useState("");
    const [Event, setEvent] = useState("");
    useEffect(() => {
        async function get() {
            axios.get(`${REACT_APP_GA}/UserOnline`).then((res) => {
                const numberRegex = /\d+/; // regular expression to match any number
                const numberString = res.data.match(numberRegex)[0]; // extract the first number found in the string
                const numberOfUsers = parseInt(numberString); // convert the extracted string to an integer
                setOnline(numberOfUsers);
            });
            axios.get(`${REACT_APP_GA}/AllUserVisit`).then((res) => {
                const numberRegex = /\d+/; // regular expression to match any number
                const numberString = res.data.match(numberRegex)[0]; // extract the first number found in the string
                const numberOfUsers = parseInt(numberString); // convert the extracted string to an integer
                setAll(numberOfUsers);
            });
            axios.get(`${REACT_APP_GA}/AllEvent`).then((res) => {
                const numberRegex = /\d+/; // regular expression to match any number
                const numberString = res.data.match(numberRegex)[0]; // extract the first number found in the string
                const numberOfUsers = parseInt(numberString); // convert the extracted string to an integer
                setEvent(numberOfUsers);
            });
        }
        get();
    }, []);

    const [Contact, setContact] = useState();

    useEffect(() => {
        async function get() {
            axios.get(`${REACT_APP_PATH2}/admin/api/getOther`).then((res) => {
                setContact(res.data[0].array);
            });
        }
        get();
    }, []);

    console.log(Contact);

    return (
        <footer className="footer">
            <ScrollToTop smooth />
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        {Contact &&
                            Contact.map((item, index) => (
                                <p
                                    key={index}
                                    style={{ whiteSpace: "pre-wrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                >
                                    {item}
                                </p>
                            ))}
                    </Col>

                    <Col xs={6} md={4} className="text-center text-sm-end">
                        <p>DLICT CMA1 ©Copyright 2022 All rights reserved.</p>
                        <Card title="Static website" bordered={false}>
                            <Row className="text-center justify-content-end">
                                <Col md="auto">
                                    <Statistic title="Active Users" value={Online} valueStyle={{ color: "#3f8600" }} />
                                </Col>
                                <Col md="auto">
                                    <Statistic
                                        title="Users Visiting All"
                                        value={All}
                                        valueStyle={{ color: "#876800" }}
                                    />
                                </Col>
                                <Col md="auto">
                                    <Statistic
                                        title="All Event Occurs "
                                        value={Event}
                                        valueStyle={{ color: "#876800" }}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
