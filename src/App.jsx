import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./App.css";
const App = () => {
  const [empData, setEmpData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
        const res = await axios(url, {
          method: "GET",
        });
        setEmpData(res.data);
        setShowData(res.data.slice(0, 10));
      } catch (err) {
        alert("failed to fetch data");
      }
    };
    fetchData();
  }, []);
  const prevPage = () => {
    if (pageNo > 1) {
      setPageNo((prev) => prev - 1);
      let startIndex = (pageNo - 2) * 10;
      let endIndex = startIndex + 10;
      let showRecords = empData.slice(startIndex, endIndex);
      setShowData(showRecords);
    }
  };
  const nextPage = () => {
    let totalPages = Math.ceil(empData.length / 10);
    if (pageNo < totalPages) {
      setPageNo((prev) => prev + 1);
      let startIndex = pageNo * 10;
      let endIndex = startIndex + 10;
      let showRecords = empData.slice(startIndex, endIndex);
      setShowData(showRecords);
    }
  };

  return (
    <div className="container">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {showData?.map((data, idx) => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage}>Previous</button>
        <p>{pageNo}</p>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
};

export default App;
