import React, { useState, useEffect } from "react";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import { Sidebar } from "../../components/Sidebar";
import "../../styles/departmentList.css";

function EmployeeList() {
  const [empName, setEmpName] = useState("");
  const [salary, setSalary] = useState("");
  const [departmentNo, setDepartmentNo] = useState("");
  const [empList, setEmpList] = useState([]);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3001/api/getEmp").then((Response) => {
      setEmpList(Response.data);
    });
  }, []);

  const submitDepLocation = () => {
    axios.post("http://localhost:3001/api/insertEmp", {
      employeeName: empName,
      salary: salary,
      departmentNo: departmentNo,
    });

    setEmpList([
      ...empList,
      { employeeName: empName, salary: salary, departmentNo: departmentNo },
    ]);
  };

  const deleteEmployee = (employee) => {
    axios.delete(`http://localhost:3001/api/deleteEmp/${employee}`);
  };

  return (
    <>
      <Sidebar />
      <div className="formTable">
        <div className="form">
          <div className="header">
            <h1>Employees</h1>
          </div>
          {/* Forma za upis */}
          <div className="formUpis">
            <label id="empName">
              <input
                type="text"
                name="empName"
                required
                onChange={(e) => {
                  setEmpName(e.target.value);
                }}
              />
              <span id="dep">Employee name</span>
            </label>
            <label id="salary">
              <input
                type="text"
                id="salary"
                name="salary"
                required
                onChange={(e) => {
                  setSalary(e.target.value);
                }}
              />
              <span id="dep">Salary</span>
            </label>
            <label id="departmentNo">
              <input
                type="text"
                id="departmentNo"
                name="departmentNo"
                required
                onChange={(e) => {
                  setDepartmentNo(e.target.value);
                }}
              />
              <span id="dep">Department no</span>
            </label>
            <button id="add" onClick={submitDepLocation}>
              Add
            </button>
          </div>
          {/* Kraj forme za upis */}
        </div>
        {/* Tablica podataka */}
        <div className="table">
          {empList.map((val) => {
            return (
              <table className="tablica">
                <thead>
                  <tr>
                    <th>Employee name</th>
                    <th>Salary</th>
                    <th>Department number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{val.employeename}</td>
                    <td>{val.salary}</td>
                    <td>{val.departmentNo}</td>
                    <td>
                      <AiIcons.AiOutlineDelete
                        id="delete"
                        onClick={() => {
                          deleteEmployee(val.departmentNo);
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

export default EmployeeList;
