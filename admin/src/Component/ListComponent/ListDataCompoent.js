import React from "react";
import Accordion from "react-bootstrap/Accordion";
import ButtonAdd from "../ButtonCRUD/ButtonAddData";
import ButtonDeleteRecord from "../ButtonCRUD/ButtonDeleteRecord";
import { Link } from "react-router-dom";
function ListDataBox({ data }) {
    return (
        <div class="col-sm">
            
            <button className="btn-hover color-2">
                <Link className="btn" role="button" to="/BigData/ListData">
                    {data.name_year}
                </Link>
            </button>
        </div>
    );
}

export default ListDataBox;

// /*ตรงนี้ axios ข้อมูลจาก DataBase*/
