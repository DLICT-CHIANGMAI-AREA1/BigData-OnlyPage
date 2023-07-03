import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import BigData from "../BigdataComponent/Data";
import { AnimatePresence } from "framer-motion";

const AnimatedRoute = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/*" element={<BigData />} />
                <Route path="/big-data/year/:year" element={<BigData />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoute;
