import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Table from "../Table/Table";
import "./content.css";

const Content = () => {
  return (
    <div className="content">
      <Sidebar />
      <Table />
    </div>
  );
};

export default Content;
