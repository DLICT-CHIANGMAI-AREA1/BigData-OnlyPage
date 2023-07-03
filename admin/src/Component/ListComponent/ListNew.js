import React from "react";
import EditNews from "../ButtonNews/ButtonUpdate";
import ButtonDeleteNews from "../ButtonNews/ButtonDelete";
const ListNews = (data) => {
    return (
        <tr>
            <td>
                <p className="font-weight-bold">{data.data.headline}</p>
                <footer className="blockquote-footer">{data.data.dateTime}</footer>
            </td>
            <td>
                <EditNews data={data}/>
            </td>
            <td>
                <ButtonDeleteNews data={data}/>
            </td>
        </tr>
    );
};

export default ListNews;
