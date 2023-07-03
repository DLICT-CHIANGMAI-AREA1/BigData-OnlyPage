import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { Container } from "react-bootstrap";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { SelectYear } from "../../Component/ButtonCRUDBigdata/SelectYear";
import ButtonCreateYear from "../../Component/ButtonCRUDBigdata/ButtonCreateYear";
import ButtonCreateData from "../../Component/ButtonCRUDBigdata/ButtonCreateData";
import ButtonDeleteYear from "../../Component/ButtonCRUDBigdata/ButtonDeleteYear";
import CreateDataTopicButton from "../../Component/ButtonCRUDBigdata/ButtonCreateTopicData";
import { Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import { DeleteOutlined } from "@ant-design/icons";
import { message, Popconfirm } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { REACT_APP_PATH2 } = process.env;
const BigData = () => {
    const year = useParams();
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [Year, setYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState(year.year);
    const [isLoading, setIsLoading] = useState(false);

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    if (!year) {
        navigate("/big-data/year");
    }

    useEffect(() => {
        setLoading(true);
        async function get() {
            axios.get(`${REACT_APP_PATH2}/admin/api/findYear`).then((res) => {
                const dataArray = []; // create an empty array to store the parsed data
                for (const item of res.data) {
                    const parsedData = {
                        id: item.id, // add the id property to the parsed data object
                        year: JSON.parse(item.year), // parse the Year property for each item
                    };
                    dataArray.push(parsedData);
                    const uniqueYears = [...new Set(dataArray.map((item) => item.year.name_year))];
                    setYear(uniqueYears);
                }

                setLoading(false);
            });
        }
        get();
    }, []);

    const fetchData = async () => {
        if (!selectedYear) {
            return;
        }
        try {
            const response = await axios.get(`${REACT_APP_PATH2}/admin/api/findEachYear/${selectedYear}`);

            const { id, year } = response.data[0]; // Accessing the first item in the response array
            const parsedData = {
                id: id, // add the id property to the parsed data object
                year: JSON.parse(year), // parse the Year property for each item
            };
            setData(parsedData);
            navigate(`/big-data/year/${selectedYear}`);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedYear]);

    const [selectedItem, setSelectedItem] = useState("");
    const [selectedItemName, setSelectedItemName] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedData, setSelectedData] = useState("");

    const [clickedItem, setClickedItem] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleClick = (item, name, index1, index) => {
        // เมื่อเลือกข้อมูลนำมาเเสดงในอีกหน้าต่าง
        setClickedItem(item);
        setIsLoading(true);
        setSelectedItem(item);
        setSelectedGroup(index1);
        setSelectedData(index);
        setSelectedItemName(name);
        setIsLoading(false);
    };
    const [New_Data, setNew_Data] = useState("");
    const handleValue = (e) => {
        setNew_Data(e.target.value);
    };

    const handleSubmit = (e) => {
        const playload = { url: New_Data };
        axios
            .post(`${REACT_APP_PATH2}/admin/api/addData/${year.year}/${selectedGroup}/${selectedData}`, playload)
            .then((response) => {
                toast.success("Year created successfully!");
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to create year");
            });
    };

    return (
        <Container>
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="col-12">
                            <div className="landing-data-page">
                                <div className="row p-2">
                                    <div className="col">
                                        <div className="d-flex">
                                            <select
                                                className="form-select"
                                                value={selectedYear}
                                                onChange={handleYearChange}
                                            >
                                                <option value="">----กรุณาเลือกปีการศึกษา----</option>
                                                {Year ? (
                                                    Year.map((Year, index) => {
                                                        return <SelectYear key={index} data={Year} />;
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
                                            </select>
                                            <ButtonDeleteYear data={selectedYear} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <ButtonCreateYear />
                                    </div>
                                    <div className="row p-2">
                                        <div
                                            className="col-md-3"
                                            style={{ backgroundColor: "white", padding: 0, margin: 0 }}
                                        >
                                            <Accordion defaultActiveKey="0">
                                                {Data && Data.year && Data.year.group ? (
                                                    Data.year.group.map((group, index1) => {
                    
                                                        return (
                                                            <Accordion.Item eventKey={index1} key={index1}>
                                                                <Accordion.Header>
                                                                    {group.Name}{" "}
                                                                    <Popconfirm
                                                                        title="Are you sure you want to delete this item?"
                                                                        onConfirm={() => {
                                                                            axios
                                                                                .delete(
                                                                                    `${REACT_APP_PATH2}/admin/api/deleteTopicData/${year.year}/${index1}`
                                                                                )
                                                                                .then((response) => {
                                                                                    message.success(
                                                                                        "Item deleted successfully!"
                                                                                    );
                                                                                    window.location.reload();
                                                                                })
                                                                                .catch((error) => {
                                                                                    message.error(
                                                                                        "Failed to delete item"
                                                                                    );
                                                                                });
                                                                        }}
                                                                        okText="Yes"
                                                                        cancelText="No"
                                                                    >
                                                                        <DeleteOutlined
                                                                            style={{
                                                                                color: "red",
                                                                                cursor: "pointer",
                                                                            }}
                                                                        />
                                                                    </Popconfirm>
                                                                </Accordion.Header>
                                                                <Accordion.Body>
                                                                    {group.Data ? (
                                                                        <ListGroup>
                                                                            {group.Data.map((item, index) => {
                                                                                return (
                                                                                    <ListGroup.Item
                                                                                        key={index}
                                                                                        className="d-flex justify-content-between align-items-center"
                                                                                        style={{
                                                                                            backgroundColor:
                                                                                                item.url === clickedItem
                                                                                                    ? "#d4edda"
                                                                                                    : item ===
                                                                                                      hoveredItem
                                                                                                    ? "#f2f2f2"
                                                                                                    : "white",
                                                                                            borderBottom:
                                                                                                "1px solid #dee2e6",
                                                                                            cursor: "pointer",
                                                                                            transition:
                                                                                                "background-color 0.2s ease-in-out",
                                                                                        }}
                                                                                        onMouseEnter={() =>
                                                                                            setHoveredItem(item)
                                                                                        }
                                                                                        onMouseLeave={() =>
                                                                                            setHoveredItem(null)
                                                                                        }
                                                                                        onClick={() => {
                                                                                            if (item.url !== "") {
                                                                                                handleClick(
                                                                                                    item.url,
                                                                                                    item.data_name,
                                                                                                    index1,
                                                                                                    index
                                                                                                );
                                                                                            } else {
                                                                                                handleClick(
                                                                                                    "0",
                                                                                                    item.data_name,
                                                                                                    index1,
                                                                                                    index
                                                                                                );
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        <span>{item.data_name}</span>
                                                                                        <Popconfirm
                                                                                            title="Are you sure you want to delete this item?"
                                                                                            onConfirm={() => {
                                                                                                axios
                                                                                                    .delete(
                                                                                                        `${REACT_APP_PATH2}/admin/api/DeleteDatainGroup/${selectedYear}/${index1}/${index}`
                                                                                                    )
                                                                                                    .then(
                                                                                                        (response) => {
                                                                                                            message.success(
                                                                                                                "Item deleted successfully!"
                                                                                                            );
                                                                                                            window.location.reload();
                                                                                                        }
                                                                                                    )
                                                                                                    .catch((error) => {
                                                                                                        message.error(
                                                                                                            "Failed to delete item"
                                                                                                        );
                                                                                                    });
                                                                                            }}
                                                                                            okText="Yes"
                                                                                            cancelText="No"
                                                                                        >
                                                                                            <DeleteOutlined
                                                                                                style={{
                                                                                                    color: "red",
                                                                                                    cursor: "pointer",
                                                                                                }}
                                                                                            />
                                                                                        </Popconfirm>
                                                                                    </ListGroup.Item>
                                                                                );
                                                                            })}
                                                                            <ButtonCreateData index={index1} />
                                                                        </ListGroup>
                                                                    ) : (
                                                                        <Spinner
                                                                            animation="border"
                                                                            role="status"
                                                                            style={{
                                                                                width: "3rem",
                                                                                height: "3rem",
                                                                                margin: "20px",
                                                                            }}
                                                                        >
                                                                            <span className="visually-hidden">
                                                                                Loading...
                                                                            </span>
                                                                        </Spinner>
                                                                    )}
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        );
                                                    })
                                                ) : (
                                                    <div></div>
                                                )}
                                                {Object.keys(year).length === 0 ? (
                                                    <div></div>
                                                ) : (
                                                    <CreateDataTopicButton />
                                                )}
                                            </Accordion>
                                        </div>
                                        {selectedItem === "" ? (
                                            <div className="col-md-9" style={{ backgroundColor: "white" }}>
                                                <p>กรุณาเลือกข้อมูล</p>
                                            </div>
                                        ) : (
                                            <div className="col-md-9" style={{ backgroundColor: "white" }}>
                                                {isLoading ? (
                                                    <Spinner
                                                        animation="border"
                                                        role="status"
                                                        style={{ width: "3rem", height: "3rem", margin: "20px" }}
                                                    >
                                                        <span className="visually-hidden">Loading...</span>
                                                    </Spinner>
                                                ) : (
                                                    <>
                                                        <div style={{ display: "flex", paddingTop: "20px" }}>
                                                            <Form.Item label="URL" style={{ marginRight: "10px" }}>
                                                                <Input
                                                                    onChange={handleValue}
                                                                    style={{ width: "400px" }}
                                                                />
                                                            </Form.Item>
                                                            <Button
                                                                type="primary"
                                                                onClick={handleSubmit}
                                                                style={{ marginRight: "10px" }}
                                                            >
                                                                เเก้ไข
                                                            </Button>
                                                            <h4>{selectedItemName}</h4>
                                                        </div>
                                                        {selectedItem !== "0" ? (
                                                            <iframe
                                                                src={selectedItem}
                                                                style={{
                                                                    width: "100%",
                                                                    height: "600px",
                                                                    border: "none",
                                                                }}
                                                                allowFullScreen
                                                            ></iframe>
                                                        ) : (
                                                            <p>Please enter a URL.</p>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default BigData;
