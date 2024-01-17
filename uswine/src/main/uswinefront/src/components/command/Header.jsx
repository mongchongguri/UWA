import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/header.css";
import logo from "../../css/imgs/logo.png";

const Header = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <header>
      <div id="headerTop">
        <div id="logo">
          <Link>
            <img src={logo} />
          </Link>
        </div>
        <div id="headerBtnBlock">
          <Link id="loginBtn">로그인</Link>
          <Link id="joinBtn">회원가입</Link>
        </div>
      </div>
      <div id="headerBottom">
        <ul id="headerMenu">
          <li>
            <Link>Menu1</Link>
          </li>
          <li>
            <Link>Menu2</Link>
          </li>
          <li>
            <Link>Menu3</Link>
          </li>
          <li>
            <Link>Menu4</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
