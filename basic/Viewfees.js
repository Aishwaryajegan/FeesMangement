import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "./Student.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Viewfees() {
  const [studentname, setstudentname] = useState("");
  const [fees, setfees] = useState([]);
  //const { state } = useLocation();
let locs = new useLocation();
  const [totalamount, settotalamount] = useState("");
  const [paidamount, setpaidamount] = useState("");
  const [paiddate, setpaiddate] = useState("");
  const [lastBalance, setLastBalance] = useState(""); // from DB
  const [calculatedBalance, setCalculatedBalance] = useState(""); // auto calculation
  const [statusupdate, setstatusupdate] = useState("");

  // 🔁 Update balance when paidamount changes
  useEffect(() => {
    const oldBalance = parseFloat(lastBalance) || 0;
    const paid = parseFloat(paidamount) || 0;
    const newBalance = (oldBalance - paid).toFixed(2);
    setCalculatedBalance(newBalance);
  }, [paidamount, lastBalance]);

  // 🔁 Load student fees and latest balance on mount
  useEffect(() => {
    if (locs.state?.id) {
      axios
        .post("http://localhost:3003/studentdetail/viewbyid", { _id: locs.state?.id })
        .then((res) => {
          const data = res.data;
          setstudentname(data.name);
          setfees(data.fees);

          if (Array.isArray(data.fees) && data.fees.length > 0) {
            const latest = data.fees[data.fees.length - 1];
            settotalamount(latest.totalamount); // fixed
            setLastBalance(latest.balanceamount); // old balance from DB
          } else {
            settotalamount("0");
            setLastBalance("0");
          }
        })
        .catch((err) => {
          console.log("Error fetching data:", err);
          setfees([]);
        });
        
    }
  }, [locs.state?.id]);

  // 📤 Submit form
  const add_form = (e) => {
    e.preventDefault();

    const payload = {
      _id: locs.state.id,
      totalamount: totalamount,
      paidamount: paidamount,
      paiddate: paiddate,
      balanceamount: calculatedBalance,
    };

    axios
      .post("http://localhost:3003/studentdetail/addfees", payload)
      .then((res) => {
         toast.success(res.data.msg, {
                           autoClose: 2000,
                            
                         });
        setstatusupdate("added");

        // Refresh data after add
        axios
          .post("http://localhost:3003/studentdetail/viewbyid", { _id: locs.state.id })
          .then((res) => {
            const data = res.data;
            setstudentname(data.name);
            setfees(data.fees);

            if (data.fees.length > 0) {
              const latest = data.fees[data.fees.length - 1];
              settotalamount(latest.totalamount);
              setLastBalance(latest.balanceamount);
              setpaidamount("");
              setpaiddate("");
              setCalculatedBalance("");
            }
          });
      })
      .catch((err) => {
        console.error("Submit error:", err);
        alert("Error occurred while submitting");
      });
    
  };
const deletedata = (fee) => {
  axios
    .post("http://localhost:3003/studentdetail/deleteview", {
      studentId: locs.state.id,  // ✅ This should be the student's ObjectId
      feeId: fee._id,       // ✅ This should be the _id inside fees[]
    })
    .then((res) => {
       toast.success((res.data.msg), {
                                 autoClose: 2000,
                                  
                               });
      setstatusupdate("deleted");

      // Refresh data
      axios.post("http://localhost:3003/studentdetail/viewbyid", { _id:locs.state.id })
        .then((res) => {
          const data = res.data;
          setstudentname(data.name);
          setfees(data.fees);

          if (data.fees.length > 0) {
            const latest = data.fees[data.fees.length - 1];
            settotalamount(latest.totalamount);
            setLastBalance(latest.balanceamount);
          }
        });
    })
    .catch((err) => {
      console.error("Error deleting fee:", err);
      alert("Error deleting fee record");
    });
};

  return (
    <div>
      <ToastContainer />
      <div className="form-wrapper">
        <form className="formcolor form-container" onSubmit={add_form}>
          <h2 className="text-center">Add Fees</h2>

          <div className="form-group row-pair">
            <div className="input-block">
              <label>Total Amount</label>
              <input type="text" value={totalamount} readOnly />
            </div>

            <div className="input-block">
              <label>Paid Amount</label>
              <input
                type="text"
                placeholder="Enter paid amount"
                onChange={(e) => setpaidamount(e.target.value)}
                value={paidamount}
              />
            </div>
          </div>

          <div className="form-group row-pair">
            <div className="input-block">
              <label>Paid Date</label>
              <input
                type="date"
                onChange={(e) => setpaiddate(e.target.value)}
                value={paiddate}
              />
            </div>

            <div className="input-block">
              <label>Balance Amount</label>
              <input type="text" value={calculatedBalance} readOnly />
            </div>
          </div>

          <button type="submit" className="but">Submit</button>
        </form>
      </div>

      <h3 className="my-3">Fees Details - {studentname}</h3>

      <div className="container">
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Total Amount</th>
                <th>Paid Amount</th>
                <th>Balance Amount</th>
                <th>Paid Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fees.length > 0 ? (
                [...fees].reverse().map((f, i) => (
                  <tr key={i}>
                    <td>{f.totalamount}</td>
                    <td>{f.paidamount}</td>
                    <td>{f.balanceamount}</td>
                    <td>{f.paiddate?.split("T")[0]}</td>
                    <td>
                  <div className="d-flex gap-2">
                  
                <button className="btn btn-sm btn-danger" onClick={()=>deletedata(f)} ><i  class="fa fa-trash"></i></button>
                    </div></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No fee records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}