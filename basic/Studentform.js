import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import  "./Student.css";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Studentdetails()
{
    let [sname,setsname]= useState("");
    let[semail,setsemail]=useState("");
      let[sphone,setsphone]=useState("");
      let[fname,setfname]=useState("");
      let[mname,setmname]=useState("");
let[course,setcourse]=useState("");
let[gender,setgender]=useState("");
let[address,setaddress]=useState("");
let[date,setdate]=useState("");
 let[file,setFile] =useState(null);
 let[roll,setroll]=useState("");
 let[enrolldate,setenrolldate]=useState("");
 let[grade,setgrade]=useState("");
 let[status,setstatus]=useState("");
 let [editid,seteditid]=useState(null);
// let [editdata,seteditdata]=useState(false);
 let[statusupdate,setstatusupdate]=useState("");
 const[existingimage,setexistingimage]=useState("");
 let[totalamount,settotalamount]=useState("");
 let[paidamount,setpaidamount]=useState("");
 let[paiddate,setpaiddate]=useState("");
 let[balanceamount,setbalanceamount]=useState("");

//const { state }= useLocation();
let loc = new useLocation();

const nav =useNavigate();

 const handleFileChange=(e)=>{
setFile(e.target.files[0]);

}
  const calculateBalance = () => {
    const balance = parseFloat(balanceamount) || 0;
    const total = parseFloat(totalamount) || 0;
    const paid = parseFloat(paidamount) || 0;
    return (total - paid).toFixed(2);
  };
 useEffect(()=>
 {
  if(loc.state?._id){
    axios.post("http://localhost:3003/studentdetail/getbyid",{_id:loc.state?._id}) 
        .then((res) => {
         const d= res.data;
         seteditid(d._id);
    setsname(d.name);
    setsemail(d.email);
    setsphone(d.phone);
    setfname(d.father);
    setmname(d.mother);
    setcourse(d.course);
    setgender(d.gender);
    setaddress(d.address);
    setdate(d.dob?.split("T")[0] || "");
    setroll(d.roll);
    setenrolldate(d.enroll?.split("T")[0] || "");
    setgrade(d.grade);
    setstatus(d.status);
    setFile(d.file); // Don't preload file
   // seteditdata(true);
    setexistingimage(d.image);
    settotalamount(d.totalamount);
    setpaidamount(d.paidamount);
    setpaiddate(d.paiddate?.split("T")[0] || "");
    setbalanceamount(d.balanceamount);
        });
  }},[loc.state?._id]);
    
 useEffect(()=>{
  if(!loc.state||!loc.state._id)
    return;
 },[loc.state]);


 let add_form = (e) => {

e.preventDefault();
 
const formData = new FormData();

formData.append('name',sname);
formData.append('email',semail);
formData.append('phone',sphone);
formData.append('father',fname);
formData.append('mother',mname);
formData.append('gender',gender);
formData.append('course',course);
formData.append('dob',date);
formData.append('address',address);
formData.append('roll',roll);
formData.append('enroll',enrolldate);
formData.append('grade',grade);
formData.append('status',status);
formData.append('totalamount',totalamount);
formData.append('paidamount',paidamount);
formData.append('paiddate',paiddate);
formData.append('balanceamount',calculateBalance());

  if (file)
    {
formData.append("image", file);
    } 

else{
  formData.append("existingimage", existingimage);
}
      
      
    if (editid) {
      formData.append("_id", editid);
      axios
        .post("http://localhost:3003/studentdetail/update", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
         toast.success(res.data.msg, {
                           autoClose: 2000,
                            
                         }); 
          setstatusupdate("updated");
          setTimeout(() => {
          nav("/Studentdetails"); // Navigate to the Dashboard page
        }, 2000); 
        });
    } else {
      axios
        .post("http://localhost:3003/studentdetail/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
           toast.success(res.data.msg, {
                           autoClose: 2000,
                            
                         }); 
          setstatusupdate("added");
          setTimeout(() => {
          nav("/Studentdetails"); // Navigate to the Dashboard page
        }, 2000);
         
        });

    

 }
}

     
      return(

   <div>
   <ToastContainer />
        <div className="form-wrapper">
            <form className="formcolor form-container"  onSubmit={add_form}>
    <h1>Student Management Details</h1>
<div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Enter your Name" onChange={(e) => setsname(e.target.value)}  value={sname}/>
        </div>

 <div className="form-group">
          <label>Email Id</label>
          <input type="email" placeholder="Enter your Email" onChange={(e) => setsemail(e.target.value)} value={semail} />
        </div>
<div className="form-group">
          <label>Mobile</label>
          <input type="number" placeholder="Enter your Phone number" onChange={(e) => setsphone(e.target.value)} value={sphone} />
        </div>
        <div className="form-group row-pair">
          <div className="input-block">
 <label>Father Name</label> 
          <input type="text" placeholder="Enter your Fathername" onChange={(e) => setfname(e.target.value)}  value={fname}/>
          </div>
          <div className="input-block">
            <label>Mother Name</label>
             
          <input type="text" placeholder="Enter your Mothername" onChange={(e) => setmname(e.target.value)} value={mname}/>
          </div>
         
</div>

  
         
  <div className="form-group row-pair">
    <div className="input-block">
 <label>Select Course</label>
          <select onChange={(e)=>setcourse(e.target.value)} value={course}>
    <option>Select a Course</option>
    <option value="Arts and sciences">Arts and sciences</option>
    <option value="Bachelor of Engineering">Bachelor of Engineering</option>
    <option value="MBBS">MBBS</option>
  </select>
    </div>
         
 <div className="input-block">
   <label>Date Of Birth</label>
          
          <input type="date"  onChange={(e) => setdate(e.target.value)} value={date} />
         </div>
         </div>
       
          <div className="form-group row-pair">
            <div className="input-block">
               <label>Gender</label>
           <input type="radio"  value="male" name="gender" checked={gender==="male"} onChange={(e)=>setgender(e.target.value)}/>Male
         <input type="radio" value="female" name="gender"  checked={gender==="female"}onChange={(e)=>setgender(e.target.value)}/>Female
            </div>
         <div className="input-block">
           <label>Student Photo</label>
            <input type="file" onChange={handleFileChange}/>
            {existingimage && (
    <p style={{ fontSize: "13px", color: "gray" }}>
      Existing Image: {existingimage}
    </p>
)}

         </div>
       
        
          </div>
        <div className="form-group">
           <label>Address</label>
              <textarea name="address" rows={4} cols={60} onChange={(e)=>setaddress(e.target.value)} value={address}/>

       </div>

         <h2>Academic Details</h2>
<div className="form-group row-pair">
<div className="input-block">
 <label>Roll Number</label>
          <input type="text" placeholder="Enter the RollNumber" onChange={(e) => setroll(e.target.value)} value={roll}/>
</div>
       <div className="input-block">
 <label>Enrollment Date</label>
          <input type="date" onChange={(e) => setenrolldate(e.target.value)} value={enrolldate}/>
</div>  
        </div>

        <div className="form-group row-pair">
<div className="input-block">
 <label>Grade</label>
          <select onChange={(e) => setgrade(e.target.value)} value={grade}>
          
          <option value="">--Choose a grade--</option>
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
</div>
       <div className="input-block">
 <label>Current Status</label>
         <select onChange={(e) => setstatus(e.target.value)} value={status}>
            <option>Current Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
           
          </select>
</div>  
        </div>



         <h2>Student Fees Details</h2>
<div className="form-group row-pair">
<div className="input-block">
 <label>Total amount paid</label>
          <input type="text" placeholder="Enter the totalamount" onChange={(e) => settotalamount(e.target.value)} value={totalamount}/>
</div>

       <div className="input-block">
 <label>Paid Amount</label>
          <input type="text"  placeholder="Enter the paidamount" onChange={(e) => setpaidamount(e.target.value)} value={paidamount}/>
</div>  
        </div>

        <div className="form-group row-pair">
<div className="input-block">

       <div className="input-block">
 <label>Paid Date</label>
          <input type="date" onChange={(e) => setpaiddate(e.target.value)} value={paiddate}/>
</div>  
</div>
       <div className="input-block">
 <label>Balance Amount</label>
       <input type="text" value={calculateBalance()}/>
</div>  
        </div>
         {editid?<button type="submit" class="but">update</button>:<button type="submit" className="but">Submit</button>} 
        
            </form>
        </div>
         
       
   </div>
    )
}