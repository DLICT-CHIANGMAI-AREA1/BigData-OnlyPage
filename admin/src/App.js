import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/reset.css';
import "./App.css";
import { HashRouter as Router } from "react-router-dom";
import AnimatedRoute from "./Page/AnimatedRoute";


function App() {
    const [title] = useState("แผงควบคุม ‹ สำนักงานเขตพื้นที่การศึกษาประถมศึกษาเชียงใหม่ เขต 1 ");

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <Router>
            <AnimatedRoute />
        </Router>
    );
}

export default App;
