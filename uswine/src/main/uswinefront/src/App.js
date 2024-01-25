import { Route, Routes } from "react-router-dom";
import User from "./pages/User";
import Admin from "./pages/Admin";
import Home from "./Home";
import UserList from "./pages/admin/UserList";
import LoginPage from "./pages/user/LoginPage";
import JoinPage from "./pages/user/JoinPage";
import "./css/App.css";
import "./css/font.css";
import WriteBoard from "./pages/Home/FreeBoard/WriteBoard";
import WineDetailsPage from "./pages/Home/WinePage/WineDetailsPage";
import FreeBoard from "./pages/Home/FreeBoard/FreeBoard";
import SellerRegistrationPage from "./pages/Seller/SellerRegistrationPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<User />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="join" element={<JoinPage />} />
          {/* 메인 페이지 */}
          <Route path="wine/:id" element={<WineDetailsPage />} />
          <Route path="board" element={<FreeBoard />} />
          <Route path="board/write" element={<WriteBoard />} />
          {/* 마이 페이지 */}
          <Route path="mypage/regist" element={<SellerRegistrationPage />} />
        </Route>
        <Route path="/Admin" element={<Admin />}>
          <Route path="userList" element={<UserList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
