import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Studentdetails from "./Studentdetails";
import Studentform from "./Studentform";
import PrivateRoute from "./PrivateRoute";
import Viewfees from "./Viewfees";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
export default function Feesapp()
{
    return(
        <div>
            <BrowserRouter>
            <Routes>



                <Route index element={<Login/>} />

 <Route path="/register" element={<Register/>} />
 <Route path="/" element={<Layout/>}>
 <Route element={<PrivateRoute/>}>
 <Route  path="/Dashboard" element={<Dashboard/>} />
 <Route path="/Studentdetails" element={<Studentdetails/>} />
 <Route path="/Studentform" element={<Studentform/>} />
 <Route path="/Viewfees" element={<Viewfees/>} />
 </Route>
       </Route>        
                
            </Routes>
            
            </BrowserRouter>
        </div>
    )
}