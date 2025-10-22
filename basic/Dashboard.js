import { useEffect, useState } from "react";
import "./Student.css";
import axios from "axios";

export default function Dashboard() {
  const [summary, setSummary] = useState({});

 useEffect(() => {
  axios.get("http://localhost:3003/studentdetail/summary")
    .then(res => {
      //console.log("Summary Response:", res.data); // ✅ Log here
      setSummary(res.data);
    })
    .catch(err => console.error("Error fetching summary:", err));
}, []);

  return (
    <div className="container my-5">
      <div className="row g-4">

        <div className="col-md-3">
          <div className="card text-white bg-success h-100">
            <div className="card-body">
              <h5 className="card-title">Total Student</h5>
              <p className="card-text fs-4">{summary.totalstudent}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">Total Amount</h5>
              <p className="card-text fs-4">₹ {summary.totalamount?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <h5 className="card-title">Total Paid</h5>
              <p className="card-text fs-4">₹ {summary.paidamount?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-danger h-100">
            <div className="card-body">
              <h5 className="card-title">Balance</h5>
              <p className="card-text fs-4">₹ {summary.balanceamount?.toLocaleString()}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}