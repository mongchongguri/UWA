import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../css/header.css";
import logo from "../../css/imgs/logo.png";

const Header = () => {
  let navigate = useNavigate();
  let location = useLocation();

  let currentPath = location.pathname;

  return (
    <header>
      <div id="headerTop">
        <div id="logo">
          <Link>
            <img src={logo} />
          </Link>
        </div>
        <div id="headerBtnBlock">
          <Link id="loginBtn" to="/login">
            로그인
          </Link>
          <Link id="joinBtn" to="/join">회원가입</Link>
        </div>
      </div>
      <div id="headerBottom">
        <ul id="headerMenu">
          <li>
            <Link to="/" className={currentPath == "/" ? "selectMenu" : null}>
              전체 와인
            </Link>
          </li>
          <li>
            <Link>판매중인 와인</Link>
          </li>
          <li>
            <Link
                to="/board"
                className={currentPath == "/board" ? "selectMenu" : null}
            >
              자유게시판
            </Link>
          </li>
          <li>
            <Link>이벤트</Link>
          </li>
          <li>
            <Link>공지사항</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
