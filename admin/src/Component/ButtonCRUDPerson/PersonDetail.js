import React from "react";
import { Link } from "react-router-dom";
const { REACT_APP_IMGEPATH } = process.env;
const PeronDetail = (x) => {
    return (
        <div>
            <Link className="btn" role="button" to={`/Person/${x.data.data.id}`}>
                <img src={`${REACT_APP_IMGEPATH}/images/contract.png`} alt="Girl in a jacket" width="50" height="50" className="pointer"></img>
            </Link>
        </div>
    );
};

export default PeronDetail;
