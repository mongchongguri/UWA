import { Route, Routes } from "react-router-dom";
import User from "./pages/User";
import Admin from "./pages/Admin";
import Home from "./Home";
import UserList from "./pages/admin/UserList";
import LoginPage from "./pages/user/LoginPage";
import JoinPage from "./pages/user/JoinPage";
import "./css/App.css";
import "./css/font.css";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<User />} >
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="join" element={<JoinPage />} />
          </Route>
          <Route path="/Admin" element={<Admin />} >
            <Route path="userList" element={<UserList/>} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
