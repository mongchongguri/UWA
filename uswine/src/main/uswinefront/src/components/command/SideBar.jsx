import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import "../../css/admin/command/adminsidebar.css";
import { Link } from "react-router-dom";
import logo from "../../css/imgs/logo.png";
const SideBar = () => {
  const token = localStorage.getItem("token") || "";
  if (token === "") {
    alert("권한이 없습니다.");
    window.history.back();
    return <></>;
  } else {
    const userinfo = jwtDecode(token);
    if (userinfo.role === "ROLE_ADMIN") {
      return <SideBarComponent userinfo={userinfo} />;
    } else {
      alert("권한이 없습니다.");
      window.history.back();
      return <></>;
    }
  }
};
const SideBarComponent = () => {
  const token = localStorage.getItem("token");

  const username = jwtDecode(token)["nickname"];

  const handleSidebarMenu = () => {
    let links = document.getElementsByClassName("adminSidebarLink");
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove("adminSidebarActive");
    }
  };

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
                <Link
                  to={"/admin/userList/id/all/ASC/1"}
                  className="adminSidebarLink"
                  onClick={(e) => {
                    handleSidebarMenu();
                    e.target.classList.add("adminSidebarActive");
                  }}
                >
                  전체회원 관리
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/sellerRequest/1"}
                  className="adminSidebarLink"
                  onClick={(e) => {
                    handleSidebarMenu();
                    e.target.classList.add("adminSidebarActive");
                  }}
                >
                  판매자요청 관리
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/adminChat/"}
                  className="adminSidebarLink"
                  onClick={(e) => {
                    handleSidebarMenu();
                    e.target.classList.add("adminSidebarActive");
                  }}
                >
                  문의사항
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <span>게시판관리</span>
            <ul className="adminMenuSubmenu">
              <li>
                <Link
                  to={"/admin/freeboard/0/1/0"}
                  className="adminSidebarLink"
                  onClick={(e) => {
                    handleSidebarMenu();
                    e.target.classList.add("adminSidebarActive");
                  }}
                >
                  자유게시판 관리
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/wineList"}
                  className="adminSidebarLink"
                  onClick={(e) => {
                    handleSidebarMenu();
                    e.target.classList.add("adminSidebarActive");
                  }}
                >
                  전체와인 관리
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/management/wine"}
                  className="adminSidebarLink"
                  onClick={(e) => {
                    handleSidebarMenu();
                    e.target.classList.add("adminSidebarActive");
                  }}
                >
                  판매와인 관리
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/notice/1"}
                  className="adminSidebarLink"
                  onClick={(e) => {
                    handleSidebarMenu();
                    e.target.classList.add("adminSidebarActive");
                  }}
                >
                  공지사항 관리
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/event"}
                  className="adminSidebarLink"
                  onClick={(e) => {
                    handleSidebarMenu();
                    e.target.classList.add("adminSidebarActive");
                  }}
                >
                  이벤트 관리
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <span>통계</span>
            <ul className="adminMenuSubmenu">
              <li>
                <Link
                  to={"/admin/chart"}
                  className="adminSidebarLink"
                  onClick={(e) => {
                    handleSidebarMenu();
                    e.target.classList.add("adminSidebarActive");
                  }}
                >
                  차트
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
