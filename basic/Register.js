import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
//import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

export default function Register() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [lang, setlang] = useState([]);
  const [country, setcountry] = useState("");
  const navigate = useNavigate();

  const updatevalue = (e) => {
    const val = e.target.value;
    const type = e.target.checked;
    if (type) {
      setlang((old) => [...old, val]);
    } else {
      setlang(lang.filter((item) => item !== val));
    }
  };


  let add_data = (e) => {

    e.preventDefault();
  if(username =="")
            {
             toast.warn("please enter your name")


            }
           
           else if(password=="")
            {
              toast.warn("please enter your password")
            }
      
             else if(phone.length !=10)
            {
               toast.warn("Your phone is atleast 10 digit")
            }
             else if(email=="")
            {
               toast.warn("please enter your email")
            }
         else{ 
           //alert("hai");
    axios.post("http://localhost:3003/students/add", {
      name: username,
      phone: phone,
      password: password,
      email: email,
      gender: gender,
      language: lang,
      country: country
    })
      .then((res) => {
        toast.success(res.data.msg, { autoClose: 20000 });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      });
  }};




  return (
    <div className="form-wrapper registerbody">
      <ToastContainer />
      
      <form className="formcolor form-container" onSubmit={add_data}>
        
        <h1>Register Your Details</h1>

        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" onChange={(e) => setusername(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" onChange={(e) => setpassword(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" onChange={(e) => setemail(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input type="number" placeholder="Enter your phone number" onChange={(e) => setphone(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="inline-group">
            <label><input type="radio" value="male" name="gender" onChange={(e) => setgender(e.target.value)} /> Male</label>
            <label><input type="radio" value="female" name="gender" onChange={(e) => setgender(e.target.value)} /> Female</label>
          </div>
        </div>

        <div className="form-group">
          <label>Languages</label>
          <div className="inline-group">
            <label><input type="checkbox" value="english" onClick={updatevalue} /> English</label>
            <label><input type="checkbox" value="tamil" onClick={updatevalue} /> Tamil</label>
            <label><input type="checkbox" value="hindi" onClick={updatevalue} /> Hindi</label>
          </div>
        </div>

        <div className="form-group">
          <label>Country</label>
          <select onChange={(e) => setcountry(e.target.value)}>
            <option>Select Country</option>
            <option value="India">India</option>
            <option value="UK">UK</option>
            <option value="England">England</option>
          </select>
        </div>

        <button type="submit" className="but">Submit</button>

        <div className="divider">
          <hr /><span>OR</span><hr />
        </div>

        <div className="social-icons">
          <i className="fab fa-google google" title="Google"></i>
          <i className="fab fa-facebook-f  fac" title="Facebook"></i>
          <i className="fab fa-linkedin-in lin" title="LinkedIn"></i>
        </div>

        <div className="login-link">
          Already a User? <u onClick={() => navigate('/')} style={{ cursor: "pointer" }}>LOGIN</u>
        </div>
      </form>
    </div>
  );
}