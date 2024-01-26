import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../css/header.css";
import logo from "../../css/imgs/logo.png";
import {
  faBars,
  faRightFromBracket,
  faRightToBracket,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Header = () => {
  let navigate = useNavigate();
  let location = useLocation();

  let currentPath = location.pathname;

  let token = localStorage.getItem("token") || "";

  const logout = () => {
    alert("로그아웃 하시겠습니까?");
    localStorage.removeItem("token");
    token = null;

    axios
      .post("http://localhost:8080/api/user/logout")
      .then((res) => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <header>
      <div id="headerTop">
        <div id="logo">
          <Link>
            <img src={logo} />
          </Link>
        </div>
        {token ? (
          <div id="headerBtnBlock">
            <div id="headerNicknameBlock">{jwtDecode(token)["nickname"]}</div>
            <div>
              <FontAwesomeIcon icon={faBars} />
              <div>Menu</div>
            </div>
            <button id="logoutBtn" onClick={logout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <div>Logout</div>
            </button>
          </div>
        ) : (
          <div id="headerBtnBlock">
            <Link id="loginBtn" to="/login">
              <FontAwesomeIcon icon={faRightToBracket} />
              <div>Login</div>
            </Link>
            <Link id="joinBtn" to="/join">
              <FontAwesomeIcon icon={faSignature} />
              <div>Join</div>
            </Link>
          </div>
        )}
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
              to="/board/0/1/"
              className={currentPath.startsWith("/board") ? "selectMenu" : null}
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
