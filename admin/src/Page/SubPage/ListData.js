import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import FlushExample from "../../Component/ListComponent/CosllpaseData";
import Accordion from "react-bootstrap/Accordion";
import ButtonCreateRecordNameData from "../../Component/ButtonCRUD/ButtonCreate/ButtonCreateRecordDataName";
import { Spinner } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const { REACT_APP_PATH2 } = process.env;
const Data = () => {
    //TODO หลังจากได้รับข้อมูลจากการกด ButtonEditlink ใน file ButtonEditLink.js ดึง param _Id ที่ส่งไปลงมา เเล้วนำมา Axios ว่าในปีนี้มีข้อมูลอะไรบ้าง เช่น DMC , Money

    const { param1 } = useParams();
    const [Data, setData] = useState();
    const [NameYear, setNameYear] = useState();

    useEffect(() => {
        function get() {
            axios.get(`${REACT_APP_PATH2}/admin/api/FindDataEachYearById/${param1}`).then((res) => {
                const { id, Year } = res.data[0]; // Accessing the first item in the response array
                const parsedData = {
                    id:id, // add the id property to the parsed data object
                    year: JSON.parse(Year)// parse the Year property for each item
                };
               setData(parsedData.year.group);
               setNameYear(parsedData.year.name_year);
            });
        }
        get();
    }, [param1]);
  
    return (
        <Container>
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="col-12">
                            <div className="landing-data-page">
                                <div className="row p-2">
                                    <div className="col">
                                        <h1>{NameYear}</h1>
                                    </div>
                                    <div className="col">
                                        <ButtonCreateRecordNameData id_year={param1} />
                                    </div>
                                </div>

                                <Accordion flush>
                                    {Data ? (
                                        
                                        Data.map((data,index) => {
                                            return <FlushExample key={index} data={data} index={index} id_year={param1} />;
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
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Data;
