import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import  "./Student.css";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faEdit, faTrash  } from '@fortawesome/free-solid-svg-icons';
import "./Studenttable.css";
import { useNavigate,Link } from "react-router-dom";
export default function Studenttable()
{


  let[studentlist,setstudentlist]=useState([]);
   let[statusupdate,setstatusupdate]=useState("");
   let[querysearch,setquerysearch]=useState("");
   let navis=useNavigate();


const handlesearch = async (e) => {
  const query = e.target.value;
  setquerysearch(query);
if (query === "") {
      // If search is empty, reload all students
      fetchStudents();
    } else {
      try {
        const res = await axios.post("http://localhost:3003/studentdetail/search", { query });
        setstudentlist(res.data);
      } catch (error) {
        console.error("Error searching students", error);
      }
    }
  };

   const updatedata = (_id) => {
    navis('/Studentform',
      {
        state:

      {
        _id
      }
    });

  };
 

  const fetchStudents=()=> {
axios.post("http://localhost:3003/studentdetail/find"
                
              )
              .then((res)=>
              {
                
                 setstudentlist(res.data);
               
             
              }
               );
        }
  useEffect(()=> {
fetchStudents();
        },[statusupdate])


           let deletedata=(name,phone,email)=>{
axios.post("http://localhost:3003/studentdetail/delete",
  {
                    name,
                    phone,
                    email
}
                
              )
              .then((res)=>
              {
                
                 toast.success((res.data.msg), {
                           autoClose: 2000,
                            
                         });
                setstatusupdate("deleted");
              }
               );
               

      }
     
  return(
    <div>
       <ToastContainer />
       <div className="my-5">
 <h3 className="">Student List</h3>
    </div>
        <div className="row-pair container">
    
   <div className="search-container">
   <div className="search">
      <FontAwesomeIcon icon={faSearch} className="iconsearch" />
      <input type="text" placeholder="Search..."  value={querysearch} onChange={handlesearch}  className="searchbox"/>
    </div>

  </div>
  
    <div className="input-block my-4">
      <button className="btn btn-md btn-info text-white" onClick={() => navis('/Studentform')}>Add Student</button>
    </div>
  </div> 
<div className="container">

        <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>S.No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
               <th>Course</th>
               <th>Dob</th>
               <th>Gender</th>
              <th>Rollno</th>
              <th>Enrolldate</th>
              <th>Grade</th>
              <th>Status</th>
              <th>Pendingfees</th>
              <th>Viewfees</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...studentlist].reverse().map((d, i) => (
              <tr><td>
                {i+1}.
              </td>
                <td>
                <img src={"http://localhost:3003/studentuploads/"+d.image} alt="user" className="img"/>
                 </td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                 <td>{d.course}</td>
                  <td>{d.dob?.split("T")[0]}</td>
                  <td>{d.gender}</td>
                  
     
               <td>{d.roll}</td>
               <td>{d.enroll?.split("T")[0]}</td>
               <td>{d.grade}</td>
               <td>{d.status}</td>
               
               <td>
  ₹ {
    d.fees?.length > 0
      ? d.fees[d.fees.length - 1].balanceamount
      : "0"
  }
</td>
              
              <td> <button className="btn btn-sm btn-info text-white" onClick={()=>navis("/Viewfees",{ state: { id: d._id}})}>View</button></td>
              <td>
  <div className="d-flex gap-2">
    <button className="btn btn-sm btn-warning" onClick={() => updatedata(d._id)}>
      <FontAwesomeIcon icon={faEdit} />
    </button>
    <button className="btn btn-sm btn-danger" onClick={() => deletedata(d.name, d.phone, d.email)}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
</div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}

  