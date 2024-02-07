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
import FreeBoardDetails from "./pages/Home/FreeBoard/FreeBoardDetails";
import SellerWine from "./pages/Seller/SellerWine";
import OnSaleWine from "./pages/Home/OnSaleWine/OnSaleWine";
import SalesManagement from "./pages/Seller/SalesManagement";
import OnSaleDetail from "./pages/Home/OnSaleWine/OnSaleDetail";
import Chatting from "./pages/mypage/Chat/Chatting";
import InfoWineSell from "./pages/Home/WinePage/InfoWineSell";

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
          <Route path="wine/sell/:id" element={<InfoWineSell />} />
          <Route path="onsale" element={<OnSaleWine />} />
          <Route path="onsale/:stock/:id" element={<OnSaleDetail />} />
          <Route path="onsale/chat/room/:seller/:item" element={<Chatting />} />
          <Route path="board/:type/:page/:keyword?" element={<FreeBoard />} />
          <Route path="board/:id" element={<FreeBoardDetails />} />
          <Route path="board/write" element={<WriteBoard />} />
          {/* 마이 페이지 */}
          <Route path="mypage/regist" element={<SellerRegistrationPage />} />
          <Route path="mypage/chat" element={<Chatting />} />
          <Route path="mypage/chat/room/:id?" element={<Chatting />} />
          {/* 판매자 페이지 */}
          <Route path="seller/wine" element={<SellerWine />} />
          <Route path="seller/management" element={<SalesManagement />} />
        </Route>
        <Route path="/Admin" element={<Admin />}>
          <Route path="userList" element={<UserList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
