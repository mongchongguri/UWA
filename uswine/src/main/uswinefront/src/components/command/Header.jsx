import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../css/header.css";
import logo from "../../css/imgs/logo.png";
import "../../css/MainSideBar.css";
import {
  faBars,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
  faUser,
  faStar,
  faNoteSticky,
  faBook,
  faAddressCard,
  faWineGlass,
  faDollarSign,
  faUsers,
  faChartSimple,
  faBasketShopping,
  faComment,
  faCreditCard,
  faTruckFast,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsCart4 } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Header = () => {
  let navigate = useNavigate();
  let location = useLocation();

  let currentPath = location.pathname;
  let [useSideBar, setUseSideBar] = useState(false);

  let token = localStorage.getItem("token") || "";

  const boxRef = useRef();

  const logout = () => {
    const logoutCheck =window.confirm("로그아웃 하시겠습니까?");
    if(logoutCheck) {
      localStorage.removeItem("token");
      token = null;
  
      axios
        .post("http://192.168.0.20:8080/api/user/logout")
        .then((res) => {
          localStorage.removeItem("token");
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
          navigate("/");
        });
    }
  };

  useEffect(() => {
    let setHandler = false;
    const handleOutsideClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        if (setHandler) {
          document
            .querySelector(".main_side_bar")
            .classList.remove("side_bar_animation");
          setUseSideBar(false);
        }
        setHandler = true;
      }
    };

    if (useSideBar) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [useSideBar]);

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
            <Link to="mypage/cart">
              <div className="header_cart">
                <BsCart4 />
              </div>
            </Link>
            <div id="headerNicknameBlock">{jwtDecode(token)["nickname"]}</div>
            <div>
              <FontAwesomeIcon
                className="header_icon"
                icon={faBars}
                size="lg"
                onClick={(e) => {
                  document
                    .querySelector(".main_side_bar")
                    .classList.add("side_bar_animation");
                  setUseSideBar(true);
                }}
              />
            </div>
            <button id="logoutBtn" onClick={logout}>
              <FontAwesomeIcon
                className="header_icon"
                icon={faRightFromBracket}
                size="lg"
              />
            </button>
          </div>
        ) : (
          <div id="headerBtnBlock">
            <Link id="loginBtn" to="/login">
              <div id="header_login_btn">
                <span className="header_font">Login</span>
                <span>
                  <FontAwesomeIcon
                    className="header_icon"
                    icon={faRightToBracket}
                    size="lg"
                  />
                </span>
              </div>
            </Link>
            <Link id="joinBtn" to="/join">
              <div id="header_login_btn">
                <span className="header_font">Join</span>
                <span>
                  <FontAwesomeIcon
                    className="header_icon"
                    icon={faUserPlus}
                    size="lg"
                  />
                </span>
              </div>
              {/* <div>Join</div> */}
            </Link>
          </div>
        )}
      </div>
      <div id="headerBottom">
        <ul id="headerMenu">
          <li>
            <Link
              to="/"
              className={
                currentPath == "/" || currentPath.startsWith("/wine")
                  ? "header_selectMenu"
                  : null
              }
            >
              전체 와인
            </Link>
          </li>
          <li>
            <Link
              to="/onsale"
              className={
                currentPath.startsWith("/onsale") ? "header_selectMenu" : null
              }
            >
              판매중인 와인
            </Link>
          </li>
          <li>
            <Link
              to="/board/0/1/"
              className={
                currentPath.startsWith("/board") ? "header_selectMenu" : null
              }
            >
              자유게시판
            </Link>
          </li>
          <li>
            <Link
              to={"/event/1"}
              className={
                currentPath.startsWith("/event") ? "header_selectMenu" : null
              }
            >
              이벤트
            </Link>
          </li>
          <li>
            <Link
              to="/notice/1"
              className={
                currentPath.startsWith("/notice") ? "header_selectMenu" : null
              }
            >
              공지사항
            </Link>
          </li>
        </ul>
      </div>
      {token != "" ? (
        <SideBar boxRef={boxRef} token={token} currentPath={currentPath} />
      ) : null}
    </header>
  );
};

function SideBar({ boxRef, token, currentPath }) {
  return (
    <div ref={boxRef} className="main_side_bar">
      <div className="side_bar_menu_logo">
        <img src={logo} />
      </div>
      <div className="side_bar_user_info">
        <div>{jwtDecode(token)["nickname"]}</div> |
        <div>
          {jwtDecode(token)["role"] == "ROLE_USER"
            ? "사용자"
            : jwtDecode(token)["role"] == "ROLE_SELLER"
            ? "판매자"
            : "관리자"}
        </div>
      </div>
      <div>
        <ul className="side_bar_menu_container">
          <li className="side_bar_menu_title">마이페이지</li>
          <li>
            <hr></hr>
          </li>
          <Link
            to="mypage/Favorite"
            className={
              currentPath.startsWith("/mypage/Favorite")
                ? "side_menu_list_select"
                : null
            }
          >
            <li className="side_bar_menu_list">
              <FontAwesomeIcon icon={faStar} className="side_bar_menu_icon" />
              즐겨찾기
            </li>
          </Link>
          <Link
            to="mypage/myinfo/1"
            className={
              currentPath.startsWith("/mypage/myinfo/1")
                ? "side_menu_list_select"
                : null
            }
          >
            <li className="side_bar_menu_list">
              <FontAwesomeIcon icon={faUser} className="side_bar_menu_icon" />내
              정보
            </li>
          </Link>
          <Link
            to="mypage/cart"
            className={
              currentPath.startsWith("/mypage/cart")
                ? "side_menu_list_select"
                : null
            }
          >
            <li className="side_bar_menu_list">
              <FontAwesomeIcon
                icon={faBasketShopping}
                className="side_bar_menu_icon"
              />
              장바구니
            </li>
          </Link>
          <Link
            to="mypage/delivery"
            className={
              currentPath.startsWith("/mypage/delivery")
                ? "side_menu_list_select"
                : null
            }
          >
            <li className="side_bar_menu_list">
              <FontAwesomeIcon icon={faTruck} className="side_bar_menu_icon" />
              배송 현황
            </li>
          </Link>
          <Link
            to="mypage/diary"
            className={
              currentPath.startsWith("/mypage/diary")
                ? "side_menu_list_select"
                : null
            }
          >
            <li className="side_bar_menu_list">
              <FontAwesomeIcon icon={faBook} className="side_bar_menu_icon" />
              다이어리
            </li>
          </Link>
          <Link
            to="mypage/chat"
            className={
              currentPath.startsWith("/mypage/chat")
                ? "side_menu_list_select"
                : null
            }
          >
            <li className="side_bar_menu_list">
              <FontAwesomeIcon
                icon={faComment}
                className="side_bar_menu_icon"
              />
              채팅방
            </li>
          </Link>
          <Link
            to="mypage/regist"
            className={
              currentPath.startsWith("/mypage/regist")
                ? "side_menu_list_select"
                : null
            }
          >
            {jwtDecode(token)["role"] == "ROLE_USER" ? (
              <>
                <li className="side_bar_menu_list">
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    className="side_bar_menu_icon"
                  />
                  판매자 요청
                </li>
              </>
            ) : null}
          </Link>
          {jwtDecode(token)["role"] == "ROLE_SELLER" ? (
            <>
              <li className="side_bar_menu_title">판매자 페이지</li>
              <li>
                <hr></hr>
              </li>
              <Link
                to="seller/wine"
                className={
                  currentPath.startsWith("/seller/wine")
                    ? "side_menu_list_select"
                    : null
                }
              >
                <li className="side_bar_menu_list">
                  <FontAwesomeIcon
                    icon={faWineGlass}
                    className="side_bar_menu_icon"
                  />
                  와인 판매
                </li>
              </Link>
              <Link
                to="seller/management"
                className={
                  currentPath.startsWith("/seller/management")
                    ? "side_menu_list_select"
                    : null
                }
              >
                <li className="side_bar_menu_list">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="side_bar_menu_icon"
                  />
                  판매 관리
                </li>
              </Link>
              <Link
                to="seller/delivery"
                className={
                  currentPath.startsWith("/seller/delivery")
                    ? "side_menu_list_select"
                    : null
                }
              >
                <li className="side_bar_menu_list">
                  <FontAwesomeIcon
                    icon={faTruckFast}
                    className="side_bar_menu_icon"
                  />
                  배송 관리
                </li>
              </Link>
              <Link
                to="seller/chart"
                className={
                  currentPath.startsWith("/seller/chart")
                    ? "side_menu_list_select"
                    : null
                }
              >
                <li className="side_bar_menu_list">
                  <FontAwesomeIcon
                    icon={faChartSimple}
                    className="side_bar_menu_icon"
                  />
                  판매 분석
                </li>
              </Link>
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
}

export default Header;
