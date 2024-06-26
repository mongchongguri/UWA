import { Route, Routes } from "react-router-dom";
import User from "./pages/User";
import Admin from "./pages/Admin";
import Home from "./Home";
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
import UserNotice from "./pages/Home/NoticeBoard/NoticeList";
import NoticeBoardDetails from "./pages/Home/NoticeBoard/NoticeDetail";
import AdminWineList from "./pages/admin/adminWine/AdminWineList";
import AdminWineInsert from "./pages/admin/adminWine/AdminWineInsert";
import AdminWineDetail from "./pages/admin/adminWine/AdminWineDetail";
import AdminChat from "./pages/admin/adminChat/AdminChat";
import SellerRequest from "./pages/admin/SellerRequest";
import AdminNotice from "./pages/admin/notice/AdminNotice";
import NoticeWrite from "./pages/admin/notice/NoticeWrite";
import AdminNoticeDetail from "./pages/admin/notice/AdminNoticeDetail";
import UserList from "./pages/admin/userList/UserList";
import Diary from "./pages/mypage/Diary/Diary";
import Favorite from "./pages/mypage/Favorite/Favorite";
import AdminFreeBoardDetail from "./pages/admin/admin_freeboard/AdminFreeBoardDetail";
import AdminEventBoard from "./pages/admin/admin_event/AdminEventBoard";
import AdminEventCreate from "./pages/admin/admin_event/AdminEventCreate";
import AdminEventDetail from "./pages/admin/admin_event/AdminEventDetail";
import AdminEventUpdate from "./pages/admin/admin_event/AdminEventUpdate";
import AdminFreeBoard from "./pages/admin/admin_freeboard/AdminFreeBoard";
import AdminWine from "./pages/admin/wine_management/AdminWine";
import AdminSellerWine from "./pages/admin/wine_management/AdminSellerWine";
import AdminWineMDetail from "./pages/admin/wine_management/AdminWineMDetail";
import AdminSellerWineDetail from "./pages/admin/wine_management/AdminSellerWineDetail";
import EventBoard from "./pages/Home/eventBoard/EventBoard";
import EventDetail from "./pages/Home/eventBoard/EventDetail";
import AdminMain from "./pages/admin/AdminMain";
import MyBoardList from "./pages/mypage/MyBoard/MyBoardList";
import MyCommentList from "./pages/mypage/MyBoard/MyCommentList";
import MyInfo from "./pages/mypage/MyInfo/MyInfo";
import Delivery from "./pages/Delivery";
import UserWineCart from "./pages/mypage/Cart/UserWineCart";
import UserDeliveryState from "./pages/mypage/Delivery/UserDeliveryState";
import GoodsDelivery from "./pages/Seller/GoodsDelivery";
import SalesAnalysisChart from "./pages/Seller/SalesAnalysisChart";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<User />}>
          <Route index element={<Home />} />
          {/* 헤더 */}
          <Route path="login" element={<LoginPage />} />
          <Route path="join" element={<JoinPage />} />
          <Route path="notice/:page/" element={<UserNotice />} />
          <Route path="noticeDetail/:id" element={<NoticeBoardDetails />} />
          {/* 메인 페이지 */}
          <Route path="wine/:id" element={<WineDetailsPage />} />
          <Route path="wine/sell/:id" element={<InfoWineSell />} />
          <Route path="onsale" element={<OnSaleWine />} />
          <Route path="onsale/:id" element={<OnSaleDetail />} />
          <Route
            path="onsale/chat/room/:seller/:item/:document?"
            element={<Chatting />}
          />
          <Route path="board/:type/:page/:keyword?" element={<FreeBoard />} />
          <Route path="board/:id" element={<FreeBoardDetails />} />
          <Route path="board/write" element={<WriteBoard />} />
          {/* 마이 페이지 */}
          <Route path="mypage/regist" element={<SellerRegistrationPage />} />
          <Route path="mypage/cart" element={<UserWineCart />} />
          <Route path="mypage/delivery" element={<UserDeliveryState />} />
          <Route path="mypage/chat" element={<Chatting />} />
          <Route path="mypage/chat/room/:id?" element={<Chatting />} />
          <Route path="mypage/diary" element={<Diary />} />
          <Route path="mypage/favorite" element={<Favorite />} />
          <Route path="mypage/myinfo/:page" element={<MyInfo />} />
          <Route path="mypage/myboard/:page" element={<MyBoardList />} />
          <Route path="mypage/mycomment/:page" element={<MyCommentList />} />
          {/* 판매자 페이지 */}
          <Route path="seller/wine" element={<SellerWine />} />
          <Route path="seller/management" element={<SalesManagement />} />
          <Route path="seller/delivery" element={<GoodsDelivery />} />
          <Route path="seller/chart" element={<SalesAnalysisChart />} />

          {/* 이벤트 페이지 */}
          <Route path="event/:page" element={<EventBoard />} />
          <Route path="event/eventDetail/:id" element={<EventDetail />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route
            path="userList/:Type?/:Group?/:Sort?/:Page?/:StartDate?/:EndDate?/:Word?"
            element={<UserList />}
          />
          <Route path="sellerRequest/:page" element={<SellerRequest />} />
          <Route path="notice/:page" element={<AdminNotice />} />
          <Route
            path="noticeDetail/:id/:page"
            element={<AdminNoticeDetail />}
          />
          <Route path="noticeWrite" element={<NoticeWrite />} />
          <Route path="wineList" element={<AdminWineList />} />
          <Route path="wineInsert" element={<AdminWineInsert />} />
          <Route path="wineDetail/:id" element={<AdminWineDetail />} />
          <Route path="adminChat" element={<AdminChat />} />
          <Route path="adminChat/room/:id?" element={<AdminChat />} />
          <Route
            path="freeboard/:type/:page/:keyword?"
            element={<AdminFreeBoard />}
          />
          <Route
            path="freeboard/Detail/:id"
            element={<AdminFreeBoardDetail />}
          />

          <Route path="event" element={<AdminEventBoard />} />
          <Route path="event/create" element={<AdminEventCreate />} />
          <Route path="event/detail/:id" element={<AdminEventDetail />} />
          <Route path="event/update/:id" element={<AdminEventUpdate />} />

          <Route path="management/wine" element={<AdminWine />} />
          <Route
            path="management/wineDetail/:id"
            element={<AdminWineDetail />}
          />
          <Route path="management/sellerwine" element={<AdminSellerWine />} />
          <Route
            path="management/MDwineDetail/:id"
            element={<AdminWineMDetail />}
          />
          <Route
            path="management/sellerwinedetail/:id"
            element={<AdminSellerWineDetail />}
          />

          <Route path="chart" element={<AdminMain />} />
        </Route>
        <Route path="/delivery/:page" element={<Delivery />} />
      </Routes>
    </div>
  );
}

export default App;
