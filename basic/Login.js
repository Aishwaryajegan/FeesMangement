import { useEffect, useState,useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
const passwordInputRef =useRef(null);
  // Use useEffect to load data from localStorage when the page loads
  useEffect(() => {
    // Check if the user is already logged in and rememberMe is true
    if (localStorage.getItem("isLoggedIn") === "true" && rememberMe) {
      const savedUsername = localStorage.getItem("username");
      const savedPassword = localStorage.getItem("password");

      // If saved username and password exist, autofill them in the form
      if (savedUsername && savedPassword) {
        setUsername(savedUsername);
        setPassword(savedPassword);
      }
    }
  }, [rememberMe]); // Dependency on rememberMe so it updates properly when it changes

  // Function to toggle rememberMe checkbox
  const handleRememberChange = () => {
    setRememberMe(!rememberMe);
  };

  // Login function
  const login = (e) => {
    console.log("Server clicked");

    axios.post("http://localhost:3003/students/login", {
      name: username,
      password: password
    })
    .then((res) => {
      if (res.data.msg === "login successfully") {
       // console.log("Server response:", res.data);

        const realname= res.data.name;
        if(realname)
        {
 sessionStorage.setItem("username",realname);
 //console.log("session storage:",sessionStorage.getItem("username"));
        }

       

        // If rememberMe is checked, save username and password to localStorage
        if (rememberMe) {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
        }

      localStorage.setItem("isLoggedIn", "true");

        toast.success('Login successfully', {
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate('/Dashboard'); // Navigate to the Dashboard page
        }, 2000);

      } else {
        toast.error("Login failed");
      }
    });
  };
// Handle keydown events for username and password
  const handleKeyDown = (e, nextFieldRef = null) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission

      if (nextFieldRef) {
        nextFieldRef.current.focus(); // Focus the next field (password)
      } else {
        login(e); // Trigger login if "Enter" is pressed in the password field
      }
    }
  };
  return (
    <div className="form-wrapper loginbody">
      <ToastContainer />
      <form className="formcolor form-container">
        <h1>Login Management</h1>
        
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={username}
            onChange={(e) => setUsername(e.target.value) } onKeyDown={(e)=>handleKeyDown(e,passwordInputRef)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
          ref ={passwordInputRef}
            type="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} onKeyDown={(e)=>handleKeyDown(e)}
          />
        </div>

        <div className="form-group">
          <input 
            type="checkbox" 
            checked={rememberMe} 
            onChange={handleRememberChange} 
          />
          Remember me?
        </div>

        <button type="button" className="but" onClick={login}>
          Submit
        </button>

        <div className="divider">
          <hr /><span>OR</span><hr />
        </div>

        <div className="social-icons">
          <i className="fab fa-google google" title="Google"></i>
          <i className="fab fa-facebook-f fac" title="Facebook"></i>
          <i className="fab fa-linkedin-in lin" title="LinkedIn"></i>
        </div>

        <div className="login-link">
          Already a User? <u onClick={() => navigate('/register')} style={{ cursor: "pointer" }}>SIGN UP</u>
        </div>
      </form>
    </div>
  );
}