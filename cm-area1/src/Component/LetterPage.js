import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Spinner } from "react-bootstrap";
import ReactPlayer from "react-player/youtube";
const { REACT_APP_PATH2 } = process.env;

export const LETTER = () => {
    const [Data, setData] = useState();

    useEffect(() => {
        async function get() {
            axios.get(`${REACT_APP_PATH2}/admin/api/FindLetter`).then((res) => {
                setData(res.data);
            });
        }
        get();
    }, []);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="container">
            <div className="row">
                <div className="video-bx wow zoomIn">
                    <h3 style={{ color: "black" }}>จดหมายข่าว</h3>

                    <Carousel responsive={responsive} infinite={true} controls={false} indicators={false}>
                        {Data ? (
                            Data.map((Data, index) => {
                                console.log(Data);
                                return (
                                    <div className="item" style={{ padding: "0px" }}>
                                        <img src={Data.image} alt="ict" style={{ width: "100%", height: "auto" }} />
                                    </div>
                                );
                            }).reverse()
                        ) : (
                            <Spinner
                                animation="border"
                                role="status"
                                style={{ width: "3rem", height: "3rem", margin: "20px" }}
                            >
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        )}
                    </Carousel>
                </div>
            </div>
        </div>
    );
};
