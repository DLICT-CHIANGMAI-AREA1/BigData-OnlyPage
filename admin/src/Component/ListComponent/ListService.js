import React from "react";
import DeleteService from "../ButtonService/DeleteService";
import EditService from "../ButtonService/EditService";
const { REACT_APP_PATH } = process.env;
const ListService = (data) => {
    return (
        <tr>
            <td>
                <a href={`${data.data.url}`}>
                    <img src={`${data.data.image}`} alt="asd" width="100" height="100"></img>
                </a>
            </td>
            <td>
                <p className="center">{data.data.name}</p>
            </td>

            <EditService data={data} />

            <DeleteService data={data} />
        </tr>
    );
};

export default ListService;
