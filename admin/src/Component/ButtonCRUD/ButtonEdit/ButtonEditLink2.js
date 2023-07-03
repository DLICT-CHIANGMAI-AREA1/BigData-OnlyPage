import React from "react";
import { Link } from "react-router-dom";
const { REACT_APP_IMGEPATH } = process.env;
const ButtonEditLink = (x) => {
    return (
        <td>
            <Link className="btn" role="button" to={`/BigData/ListData/Data/${x.id_year}/${x.id_group}/${x.id_array}`}>
                <img
                    src={`${REACT_APP_IMGEPATH}/images/contract.png`}
                    alt="Girl in a jacket"
                    width="50"
                    height="50"
                    className="pointer"
                ></img>
            </Link>
        </td>
    );
};

export default ButtonEditLink;
