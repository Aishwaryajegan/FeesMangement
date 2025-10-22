import { use, useEffect, useState } from "react";
 import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
export default function Login()

{
    let [username,setusername]=useState("");
    let[password,setpassword]=useState("");
const navigate =useNavigate();
let remember=()=>
{
  
}
    let login=(e)=>
    {
        console.log("server clicked");
        axios.post("http://localhost:3003/students/login",
            {
             name:username,
             password:password
            }
       
        )
        .then((res)=>
        {
  if(res.data.msg==="login successfully"){
    console.log("server resonse:",res.data);
     localStorage.setItem("isLoggedIn","true");
    toast.success('login successfully', {
      autoClose: 2000, // 10 seconds
    });
   
setTimeout(() => {
      navigate('/Dashboard'); // replace with your route
   },2000);

  }
else{
    //alert(res.data.msg)
    toast.error("Login fail");
    // toast.info()
    // toast.warn()
}
        }
          
        )
    }

        return(
<div className="form-wrapper">
    <ToastContainer />
    
    <form className="formcolor form-container">
     
        <h1>Login Management</h1>
         <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" onChange={(e) => setusername(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" onChange={(e) => setpassword(e.target.value)} />
        </div>
           <div className="form-group">
<input type="checkbox" onClick={remember()}/>Remember me?
    </div>
        <button type="button" className="but" onClick={login}>Submit</button>

        <div className="divider">
          <hr /><span>OR</span><hr />
        </div>

        <div className="social-icons">
          <i className="fab fa-google google" title="Google"></i>
          <i className="fab fa-facebook-f  fac" title="Facebook"></i>
          <i className="fab fa-linkedin-in lin" title="LinkedIn"></i>
        </div>

        <div className="login-link">
          Already a User? <u onClick={() => navigate('/register')} style={{ cursor: "pointer" }}>SIGN UP</u>
        </div>
    </form>
   
</div>
    )}