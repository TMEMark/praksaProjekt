import React from "react";
import axios from "axios";
import { Sidebar } from "../../components/Sidebar";
function questionsList() {
  axios.defaults.withCredentials = true;
  return (
    <>
      <Sidebar />
      <div className="questionsList">
        <h1>questionsList</h1>
      </div>
    </>
  );
}

export default questionsList;
