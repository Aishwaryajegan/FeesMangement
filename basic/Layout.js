import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure toast styling works
import { FaSignOutAlt, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';

const Layout = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const username =sessionStorage.getItem("username") ||localStorage.getItem("username") || "User";
 

  return (
    <div className="layout">
      <ToastContainer />

      {/* Sidebar */}
      <div className="sidebar">
        <NavLink to="/Dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaChalkboardTeacher style={{ marginRight: '8px' }} />
          Dashboard
        </NavLink>

        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
          <FaUserGraduate style={{ marginRight: '8px' }} />
          Student Info ▼
        </button>

        {dropdownOpen && (
          <div className="dropdown">
            <NavLink to="/Studentdetails" className={({ isActive }) => isActive ? 'active' : ''}>
              Student Detail
            </NavLink>
            <NavLink to="/Studentform" className={({ isActive }) => isActive ? 'active' : ''}>
              Student Form
            </NavLink>
          </div>
        )}
      </div>

      {/* Topbar */}
      <div className="content-area">
      <div className="topbar">
        <div className="welcome-message">
          welcome,{username}
        </div>
        <div
          className="logout"
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("username");
          localStorage.removeItem("password");
            toast.info('Logout successfully', { autoClose: 2000 });
            setTimeout(() => {
              navigate('/');
            }, 2000);
          }}
        >
          <FaSignOutAlt style={{ marginRight: '8px' }} />
          Logout
        </div>
      </div>

      {/* Main Content */}
      <div className="main">
        <h1 className="text-black">STUDENT FEES MANAGEMENT SYSTEM</h1>
        <Outlet />
      </div>
    </div>
    </div>
  );
};

export default Layout;