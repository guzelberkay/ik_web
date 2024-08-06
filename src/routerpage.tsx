import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import PendingUsers from "./pages/admin/PendingUsers"

function RouterPage() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<></>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/PendingUsers" element={<PendingUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterPage;
