import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

import PendingUsers from "./pages/admin/PendingUsers"
import VisitorPage from "./pages/visitorPage/VisitorPage";
import UserStories from "./pages/userStories/UserStories";
import Resources from "./pages/resources/Resources";

function RouterPage() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VisitorPage/>}/>
        <Route path="/userstories" element={<UserStories/>}/>
        <Route path="/resources" element={<Resources/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/PendingUsers" element={<PendingUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterPage;
