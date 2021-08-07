import React, { useState, useEffect } from "react";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import { Sidebar } from "../../components/Sidebar";
import "../../styles/departmentList.css";

function DepartmentList() {
  const [depName, setDepName] = useState("");
  const [depLocation, setDepLocation] = useState("");
  const [depList, setDepList] = useState([]);
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3001/api/getDep").then((Response) => {
      setDepList(Response.data);
    });
  }, []);

  const submitDepLocation = () => {
    axios.post("http://localhost:3001/api/insertDep", {
      departmentName: depName,
      departmentLocation: depLocation,
    });

    setDepList([
      ...depList,
      { departmentName: depName, departmentLocation: depLocation },
    ]);
  };

  const deleteDepartment = (department) => {
    axios.delete(`http://localhost:3001/api/deleteDep/${department}`);
  };

  return (
    <>
      <Sidebar />
      <div className="formTable">
        <div className="form">
          <div className="header">
            <h1>Departments</h1>
          </div>
          {/* Forma za upis */}
          <div className="formUpis">
            <label id="depName">
              <input
                type="text"
                name="depName"
                required
                onChange={(e) => {
                  setDepName(e.target.value);
                }}
              />
              <span id="dep">Department Name</span>
            </label>
            <label id="depLocation">
              <input
                type="text"
                id="deploc"
                name="depLocation"
                required
                onChange={(e) => {
                  setDepLocation(e.target.value);
                }}
              />
              <span id="dep">Department Location</span>
            </label>
            <button id="add" onClick={submitDepLocation}>
              Add
            </button>
          </div>
          {/* Kraj forme za upis */}
        </div>
        {/* Tablica podataka */}
        <div className="table">
          {depList.map((val) => {
            return (
              <table className="tablica">
                <thead>
                  <tr>
                    <th>Department number</th>
                    <th>Department name</th>
                    <th>Department location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{val.departmentNo}</td>
                    <td>{val.departmentName}</td>
                    <td>{val.departmentLocation}</td>
                    <td>
                      <AiIcons.AiOutlineDelete
                        id="delete"
                        onClick={() => {
                          deleteDepartment(val.departmentNo);
                        }}
                      />
                      <HiIcons.HiOutlinePencil id="update" />
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
        {/* Kraj tablice podataka */}
      </div>
    </>
  );
}

export default DepartmentList;
