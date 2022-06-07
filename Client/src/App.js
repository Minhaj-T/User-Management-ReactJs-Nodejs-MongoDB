import "./App.css";
import Register from "./components/Register/Register";
import User from "./components/User/User";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./components/Admin-Dashboard/Table";
import Alogin from "./components/AdminLogin/Alogin";
import Edituser from "./components/Admin-Dashboard/Edituser";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="user" element={<User />} />
          <Route path="admin" element={<Alogin/>} />
          <Route path="admindashboard" element={<Table/>} />
          <Route path="/edituser/:userId" element={<Edituser/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
