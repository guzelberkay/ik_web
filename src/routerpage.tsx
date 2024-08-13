import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

import VisitorPage from "./pages/visitorPage/VisitorPage";
import UserStories from "./pages/userStories/UserStories";
import Dashboard from "./pages/userPage/Dashboard";
import Resources from "./pages/resources/Resources";
import { AppDispatch, useAppSelector } from "./store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearToken, setToken } from "./store/future/authSlice";
import { jwtDecode } from "jwt-decode";
import ForgetMyPassword from "./pages/forgetMyPassword/ForgetMyPassword";
import ChangeMyPassword from "./pages/changeMyPassword/ChangeMyPassword";
import CreateLeaveByCompanyManager from "./pages/createLeaveByCompanyManager/CreateLeaveByCompanyManager";
import AdminPanel from "./pages/admin/AdminPanel";




function RouterPage() {
  
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        dispatch(clearToken());
      } else {
        dispatch(setToken(token));
      }
    } else {
      dispatch(clearToken());
    }
  },[]);

  const isLogin = useAppSelector(state => state.auth.isAuth);




  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VisitorPage/>}/>
        <Route path="/userstories" element={<UserStories/>}/>
        <Route path="/resources" element={<Resources/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/PendingUsers" element={isLogin ? <PendingUsers /> : <Login />} />
        <Route path="/Dashboard" element={isLogin ? <Dashboard /> : <Login />} />

        <Route path="/AdminPanel" element={isLogin ? <AdminPanel /> : <Login />} />
        <Route path="/forgetmypassword" element={<ForgetMyPassword />} />
        <Route path="/changeMyPassword" element={<ChangeMyPassword />} />
        <Route path="/createleavebycompanymanager" element={<CreateLeaveByCompanyManager />} />

      </Routes>
    </BrowserRouter>
  );
}

export default RouterPage;
