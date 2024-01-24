import { Route, Routes } from "react-router-dom";
import User from "./pages/User";
import Admin from "./pages/Admin";
import Home from "./Home";
import UserList from "./pages/admin/UserList";
import LoginPage from "./pages/user/LoginPage";
import JoinPage from "./pages/user/JoinPage";
import WineDetailsPage from "./pages/Home/WinePage/WineDetailsPage";
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
            <Route path="wine/:id" element={<WineDetailsPage />} />
          </Route>
          <Route path="/admin" element={<Admin />} >
            <Route path="userList" element={<UserList/>} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
