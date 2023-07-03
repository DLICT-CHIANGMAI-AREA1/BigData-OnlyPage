import React from "react";
import Accordion from "react-bootstrap/Accordion";
import ButtonAdd from "../ButtonCRUD/ButtonCreate/ButtonCreateDate";
import ButtonDeleteRecord from "../ButtonCRUD/ButtonDelete/ButtonDeleteRecordDate";
import ButtonDelete from "../ButtonCRUD/ButtonDelete/ButtonDeleteDate";
import ButtonEditLink from "../ButtonCRUD/ButtonEdit/ButtonEditLink2";
import ListGroup from "react-bootstrap/ListGroup";
import { v4 as uuidv4 } from "uuid";

function FlushExample({ data, id_year, index }) {
    return (
        <Accordion.Item eventKey={index + 1}>
            <Accordion.Header>{data.name_data}</Accordion.Header>
            <Accordion.Body>
                <div className="row gy-5">
                    <div className="col-8">
                        <h2 className="m-4"></h2>
                    </div>
                    <div className="col-2">
                        <ButtonDeleteRecord id_data={index} id_year={id_year} />
                    </div>
                    <div className="col-2">
                        <ButtonAdd id_data={index} id_year={id_year} />
                    </div>
                </div>

                <ListGroup>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className="col-md-7">Name</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((x, index2) => (
                                <tr>
                                    <td className="col-md-10">
                                        <p>{x.name_date}</p>
                                    </td>
                                    <td>
                                        <ButtonEditLink data={x} id_array={index2} id_group={index} id_year={id_year} />
                                    </td>
                                    <td>
                                        <ButtonDelete id_date={index} id={index2} id_year={id_year} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ListGroup>
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default FlushExample;

// /*ตรงนี้ axios ข้อมูลจาก DataBase*/
