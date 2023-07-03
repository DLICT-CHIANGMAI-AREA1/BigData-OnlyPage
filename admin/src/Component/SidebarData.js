import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";


export const SidebarData = [
    {
        title: "ข้อมูลข่าว",
        path: "/News",
        icon: <IoIcons.IoIosPaper />,
        cName: "nav-text",
    },
    {
        title: "จดหมายข่าว ",
        path: "/letter",
        icon: <IoIcons.IoIosPaper />,
        cName: "nav-text",
    },
    {
        title: "คู่มือปฏิบัติงาน ",
        path: "/OperatingManual",
        icon: <IoIcons.IoIosPaper />,
        cName: "nav-text",
    },
    {
        title: "ทำเนียบบุคลากร",
        path: "/Person",
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text",
    },
    {
        title: "Department",
        path: "/Department",
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: "nav-text",
    },
      {
        title: "BigData",
        path: "/big-data/year",
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: "nav-text",
    },
    {
        title: "Media",
        path: "/Media",
        icon: <FaIcons.FaVideo />,
        cName: "nav-text",
    },
    {
        title: "Mission",
        path: "/Mission",
        icon: <AiIcons.AiFillFileText />,
        cName: "nav-text",
    },
    {
        title: "Service",
        path: "/Service",
        icon: <AiIcons.AiFillCustomerService />,
        cName: "nav-text",
    },
    {
        title: "DLICT",
        path: "/DLICT",
        icon: <FaIcons.FaDigitalTachograph/>,
        cName: "nav-text",
    },
    {
        title: "Other",
        path: "/Footer",
        icon: <FaIcons.FaDigitalTachograph/>,
        cName: "nav-text",
    },
  
];
