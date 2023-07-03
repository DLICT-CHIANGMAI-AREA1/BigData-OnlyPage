import React from "react";
import ButtonDelete from "../Component/ButtonCRUD/ButtonDelete/ButtonDelete";
import ButtonEdit from "../Component/ButtonCRUD/ButtonEdit/ButtonEditData";
const { REACT_APP_IMGEPATH } = process.env;
const Posts = (data) => {
    return (
        <tbody>
            {data.data.map((x, index) => (
                <tr>
                    <td className="col-md-10">
                        <p className="name">{x.name}</p>
                    </td>
                    <td className="col-md-1">
                        <p style={{ textAlign: "center" }}>
                            {x.url ? (
                                <a href={x.url} target="_blank" rel="noreferrer">
                                    <img
                                        src={`${REACT_APP_IMGEPATH}/images/pie-chart.png`}
                                        alt="Girl in a jacket"
                                        width="50"
                                        height="50"
                                        className="pointer"
                                    ></img>
                                </a>
                            ) : (
                                <a href={x.url} target="_blank" rel="noreferrer" className="disabled">
                                    <img
                                        src={`${REACT_APP_IMGEPATH}/images/pie-chart.png`}
                                        alt="Girl in a jacket"
                                        width="50"
                                        height="50"
                                        className="pointer"
                                        style={{ opacity: 0.5 }}
                                    ></img>
                                </a>
                            )}
                        </p>
                    </td>
                    <td className="col-md-10">
                        <p>
                            {x.csv ? (
                                <a href={x.csv} target="_blank" rel="noreferrer">
                                    <img
                                        src={`${REACT_APP_IMGEPATH}/images/csv.png`}
                                        alt="Girl in a jacket"
                                        width="50"
                                        height="50"
                                        className="pointer"
                                    ></img>
                                </a>
                            ) : (
                                <a href={x.csv} target="_blank" rel="noreferrer" className="disabled">
                                    <img
                                        src={`${REACT_APP_IMGEPATH}/images/csv.png`}
                                        alt="Girl in a jacket"
                                        width="50"
                                        height="50"
                                        className="pointer"
                                        style={{ opacity: 0.5 }}
                                    ></img>
                                </a>
                            )}
                        </p>
                    </td>{" "}
                    <td className="col-md-10">
                        <p>
                            {x.pdf ? (
                                <a href={x.pdf} target="_blank" rel="noreferrer">
                                    <img
                                        src={`${REACT_APP_IMGEPATH}/images/pdf.png`}
                                        alt="Girl in a jacket"
                                        width="50"
                                        height="50"
                                        className="pointer"
                                    ></img>
                                </a>
                            ) : (
                                <a href={x.pdf.url} target="_blank" rel="noreferrer" className="disabled">
                                    <img
                                        src={`${REACT_APP_IMGEPATH}/images/pdf.png`}
                                        alt="Girl in a jacket"
                                        width="50"
                                        height="50"
                                        className="pointer"
                                        style={{ opacity: 0.5 }}
                                    ></img>
                                </a>
                            )}
                        </p>
                    </td>
                    <ButtonEdit data={x} id_data={index} />
                    <ButtonDelete data={x} id_data={index} />
                </tr>
            ))}
        </tbody>
    );
};

export default Posts;
