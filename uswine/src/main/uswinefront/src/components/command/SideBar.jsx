import { jwtDecode } from "jwt-decode";
import React from "react";
import "../../css/admin/command/adminsidebar.css";
import { Link } from "react-router-dom";
import logo from "../../css/imgs/logo.png";
const SideBar=()=>{
  const token = localStorage.getItem("token") || "";
    if (token === "") {
      alert("권한이 없습니다.");
      window.history.back();
      return <></>;
    } else {
      const userinfo = jwtDecode(token);
      if(userinfo.role === "ROLE_ADMIN") {
        return <SideBarComponent userinfo={userinfo} />;
      } else {
        alert("권한이 없습니다.");
        window.history.back();
        return <></>
      }
      
    }
}
const SideBarComponent = () => {
  const token = localStorage.getItem("token");

  const username = jwtDecode(token)["nickname"];
  return (
    <aside id="adminSideBar">
      <div id="adminCompanyLogo">
        <img src={logo} />
      </div>

      <div id="adminMenu">
        <ul id="adminMenuMainmenu">
          <li>
            <span>회원관리</span>
            <ul className="adminMenuSubmenu">
              <li>
                <Link to={"/admin/userList/id/all/ASC/1"}>전체회원 관리</Link>
              </li>
              <li>
                <Link to={"/admin/sellerRequest/1"}>판매자요청 관리</Link>
              </li>
              <li>
                <Link to={"/admin/adminChat/"}>문의사항</Link>
              </li>
            </ul>
          </li>
          <li>
            <span>게시판관리</span>
            <ul className="adminMenuSubmenu">
              <li>
                <Link to={"/admin/freeboard/0/1/0"}>자유게시판 관리</Link>
              </li>
              <li>
                <Link to={"/admin/wineList"}>전체와인 관리</Link>
              </li>
              <li>
                <Link>판매와인 관리</Link>
              </li>
              <li>
                <Link to ={"/admin/notice/1"}>공지사항 관리</Link>
              </li>
              <li>
                <Link>이벤트 관리</Link>
              </li>
            </ul>
          </li>
          <li>
            <span>통계</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
