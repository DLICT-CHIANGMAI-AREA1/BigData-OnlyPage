import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import ListGroup from "react-bootstrap/ListGroup";
import { v4 as uuidv4 } from "uuid";
import ButtonDelete from "../../Component/ButtonCRUD/ButtonDelete/ButtonDelete";
import ButtonEdit from "../../Component/ButtonCRUD/ButtonEdit/ButtonEditData";
import ButtonCreateData from "../../Component/ButtonCRUD/ButtonCreate/ButtonCreateData";
import ButtonSeeFullImage from "../../Component/ButtonCRUD/ButtonImage";
import Post from "../../Component/Posts";
import { Pagination } from "antd";


const { REACT_APP_PATH2 } = process.env;

const Data = () => {
    const { param1, param2, param3 } = useParams();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(100);

    useEffect(() => {
        function get() {
            axios
                .get(`${REACT_APP_PATH2}/admin/api/GetDataOfGroup/${param1}/${param2}/${param3}`)
                .then((res) => {
                    setData(res.data.data);
                });
        }
        get();
    }, [param1, param2, param3]);

    // Calculate pagination information
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Container>
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="col-12">
                            <div className="landing-data-page">
                                <div className="p-2">
                                    <div>
                                        <ButtonCreateData id_year={param1} id_group={param2} id_data={param3} />
                                    </div>
                                </div>
                                <ListGroup>
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th className="col-md-7">Name</th>
                                                <th>Data</th>
                                                <th>Excel</th>
                                                <th>PDF</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <Post key={uuidv4()} data={currentItems}  param1={param1} param2={param2} param3={param3} />
                                    </table>
                                    <div className="d-flex justify-content-center">
                                        <Pagination
                                            current={currentPage}
                                            onChange={handlePageChange}
                                            total={data.length}
                                            showSizeChanger={false}
                                            pageSize={itemsPerPage}
                                        />
                                    </div>
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
