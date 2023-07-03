import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./Component/Footer";
import { HashRouter as Router } from "react-router-dom";
import AnimatedRoute from "./Component/AnimatedRoute";
import ReactGA from 'react-ga4';
ReactGA.initialize("G-BL9PMBLF8T");


function App() {
    const [title] = useState("ระบบฐานข้อมูล สารสนเทศเพื่อการบริหารจัดการ (Bigdata)");

    
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page:window.location.pathname});
    }, [title]);

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <Router>
            <AnimatedRoute />
            <Footer />
        </Router>
    );
}

export default App;
