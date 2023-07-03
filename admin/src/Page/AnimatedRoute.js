import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import News from "./News";
import Data from "./Data";
import ListData from "./SubPage/ListData";
import ListLastData from "./SubPage/ListLastData";
import PersonDetail from "./SubPage/PersonDetail";
import PDFViewer from "./OperatingManual";
import Person from "./Person";
import Media from "./Media";
import Mission from "./Mission";
import Footer from "./Footer";
import Service from "./Service";
import Letter from "./Letter";
import DLICT from "./DLICT";
import AddNewsPage from "./SubPage/AddNewsPage";
import NewsDetail from "./SubPage/NewsDetail";
import Navbar from "../Component/Navbar";
import LoginForm from "./login";
import BigData from "./SubPage/Bigdata";
const AnimatedRoute = () => {
    const location = useLocation();
    return (
        
        <AnimatePresence>
           
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<><LoginForm/></>}  /> 
                <Route path="/Login" element={<><LoginForm/></>}  /> 
                <Route path="/News" element={<><Navbar/><News /></>}  />
                <Route path="/OperatingManual" element={<><Navbar/><PDFViewer /></>} />
                <Route path="/Person" element={<><Navbar/><Person /></>} />
                <Route path="/Media" element={<><Navbar/><Media /></>} />
                <Route path="/Mission" element={<><Navbar/><Mission /></>} />
                <Route path="/Service" element={<><Navbar/><Service /></>} />
                <Route path="/DLICT" element={<><Navbar/><DLICT /></>} />
                <Route path="/Letter" element={<><Navbar/><Letter /></>} />
                <Route path="/Person/:param" element={<><Navbar/><PersonDetail /></>} />
                <Route path="/News/:param" element={<><Navbar/><NewsDetail /></>} />
                <Route path="/News/AddNews" element={<><Navbar/><AddNewsPage /></>} />
                <Route path="/Department" element={<><Navbar/><Data /></>} />
                <Route path="/BigData/ListData/:param1" element={<><Navbar/><ListData /></>} />
                <Route path="/BigData/ListData/Data/:param1/:param2/:param3" element={<><Navbar/><ListLastData /></>} />
                <Route path="/Footer" element={<><Navbar/><Footer /></>} />
                <Route path="/big-data/year/:year" element={<><Navbar/><BigData /></>} />
                <Route path="/big-data/year" element={<><Navbar/><BigData /></>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoute;
