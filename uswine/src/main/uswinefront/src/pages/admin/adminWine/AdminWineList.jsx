import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthApi from "../../../AuthApi";
import {
  faMagnifyingGlass,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../css/admin/AdminWineList.css";
export default function AdminWineList() {
  const token = localStorage.getItem("token") || "";
  if (token === "") {
    return <></>;
  } else {
    const userinfo = jwtDecode(token);
    if (userinfo.role === "ROLE_ADMIN") {
      return <AdminWineListComponent userinfo={userinfo} />;
    } else {
      return <></>;
    }
  }
}
function AdminWineListComponent() {
  let navigate = useNavigate();

  let [wineList, setWineList] = useState([]);

  let [searchWine, setSearchWine] = useState("");
  let [tagWine, setTagWine] = useState([]);
  let [tagWineAroma, setTagWineAroma] = useState([]);

  let [totalPage, setTotalPage] = useState("");
  let [currentPage, setCurrentPage] = useState(1);
  let [totalWine, setTotalWine] = useState("");

  let [searchBtn, setSearchBtn] = useState(0);
  const wineTagList = [
    "레드",
    "화이트",
    "로제",
    "스파클링",
    "주정강화",
    "고도주",
    "맥주",
    "우리술",
    "사케/청주",
  ];

  const wineAromaList = [
    "오크",
    "바닐라",
    "삼나무",
    "피어",
    "모카",
    '흑연',
    '레몬',
    '사과',
    '라임',
    '파인애플',
    '감귤',
    '오렌지',
    '체리',
    '블랙베리',
    '딸기',
    '블루베리',
    '라스베리',
    '산딸기',
    '망고',
    '배',
    '포도',
    '샤인마스카트',
    '케리',
    '블랙커런트',
    '라즈베리',
    '자몽',
    '자두',
    '키위',
  ];

  function tagClick(e) {
    const selectTag = e.target.textContent;
    if (e.target.classList.contains("selectTag")) {
      e.target.classList.remove("selectTag");
      setTagWine((prevTags) => prevTags.filter((tag) => tag !== selectTag));
    } else {
      e.target.classList.add("selectTag");
      setTagWine([...tagWine, selectTag]);
    }
  }

  function tagAromaClick(e) {
    const selectTag = e.target.textContent;
    if (e.target.classList.contains("selectTag")) {
      e.target.classList.remove("selectTag");
      setTagWineAroma((prevTags) =>
        prevTags.filter((tag) => tag !== selectTag)
      );
    } else {
      e.target.classList.add("selectTag");
      setTagWineAroma([...tagWineAroma, selectTag]);
    }
  }

  function handlePrevPage(e) {
    if (currentPage > 1) {
      setCurrentPage(parseInt(currentPage) - 1);
    } else {
      alert("첫번째 페이지 입니다.");
    }
  }
  function handleNextPage(e) {
    if (currentPage < totalPage) {
      setCurrentPage(parseInt(currentPage) + 1);
    } else {
      alert("마지막 페이지 입니다.");
    }
  }
  function wineDetailsNav(id) {
    navigate(`/admin/wineDetail/${id}`);
  }

  useEffect(() => {
    console.log(tagWine, tagWineAroma);
    if (searchBtn > 0) {
      AuthApi("/api/main/wine", {
        page: currentPage - 1,
        searchWine: searchWine,
        tagWine: tagWine,
        tagWineAroma: tagWineAroma,
      }).then((data) => {
        console.log(data);

        if (data.totalPage == 0) {
          alert("검색결과가 없습니다.");
        } else {
          setWineList(data.wineList);
          setTotalWine(data.totalPage);
          setTotalPage(Math.ceil(data.totalPage / 20));
        }
      });
    } else {
      AuthApi("/api/main/wine", {
        page: currentPage - 1,
      }).then((data) => {
        setWineList(data.wineList);
        setTotalWine(data.totalPage);
        setTotalPage(Math.ceil(data.totalPage / 20));
      });
    }
  }, [currentPage, searchBtn]);

  return (
    <div className="admin_wine_container">
      <div className="admin_wine_tag_container">
        <div className="admin_wine_search">
          <input
            className="admin_wine_search-txt"
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchWine(e.target.value)}
          />
          <button
            className="admin_search-btn"
            onClick={() => {
              setCurrentPage(1);
              setSearchBtn(searchBtn + 1);
            }}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="1x"
              className="search-icon"
            />
          </button>
          <button
            id="admin_wineInsert"
            onClick={() => {
              navigate("/admin/wineInsert");
            }}
          >
            와인 추가
          </button>
        </div>
        <div className="admin_tag_wine_container">
          <span>와인 종류</span>
          <ul>
            {wineTagList.map(function (wine, i) {
              return (
                <li key={i} onClick={tagClick}>
                  {wine}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="admin_tag_wine_container">
          <span>아로마</span>
          <ul>
            {wineAromaList.map(function (aroma, i) {
              return (
                <li key={i} onClick={tagAromaClick}>
                  {aroma}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="admin_wineList_container">
        <div>
          <div className="admin_total_wine_count">( {totalWine} 병 )</div>
          <div className="admin_wine_view">
            <ul className="admin_wine_list_prev">
              {wineList.map(function (wine, i) {
                return (
                  <li key={i}>
                    <div className="admin_wine_list_card">
                      <div className="admin_wine_names">
                        <span className="admin_wine_name">
                          {wine.wine_name}
                        </span>
                        <hr></hr>
                        <span className="admin_wine_name_en">
                          {wine.wine_name_en}
                        </span>
                      </div>

                      <img src={wine.wine_image} alt="" />

                      <div className="admin_wine_info">
                        <span>
                          <b>{wine.wine_info[0]}</b> | {wine.wine_info[1]} |{" "}
                          {wine.wine_info[2]}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="admin_wine_view">
            <ul className="admin_wine_list_current">
              {wineList.map(function (wine, i) {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      wineDetailsNav(wine.id);
                    }}
                  >
                    <div className="admin_wine_list_card">
                      <div className="admin_wine_names">
                        <span className="admin_wine_name">
                          {wine.wine_name}
                        </span>
                        <hr></hr>
                        <span className="admin_wine_name_en">
                          {wine.wine_name_en}
                        </span>
                      </div>

                      <img src={wine.wine_image} alt="" />

                      <div className="admin_wine_info">
                        <span>
                          <b>{wine.wine_info[0]}</b> | {wine.wine_info[1]} |{" "}
                          {wine.wine_info[2]}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="admin_wine_view">
            <ul className="admin_wine_list_next">
              {wineList.map(function (wine, i) {
                return (
                  <li key={i}>
                    <div className="admin_wine_list_card">
                      <div className="admin_wine_names">
                        <span className="admin_wine_name">
                          {wine.wine_name}
                        </span>
                        <hr></hr>
                        <span className="admin_wine_name_en">
                          {wine.wine_name_en}
                        </span>
                      </div>

                      <img src={wine.wine_image} alt="" />

                      <div className="admin_wine_info">
                        <span>
                          <b>{wine.wine_info[0]}</b> | {wine.wine_info[1]} |{" "}
                          {wine.wine_info[2]}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div id="admin_wine_detail_Foot">
        <div className="admin_wine_page_controller">
          <div className="prev_page" onClick={handlePrevPage}>
            <FontAwesomeIcon icon={faAngleLeft} size="2x" opacity="0.5" />
          </div>

          <div className="admin_wine_page_box">
            <input
              className="page_input"
              type="number"
              defaultValue={currentPage}
              key={currentPage}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  const page = e.target.value;
                  if (page >= 1 && page <= 1014) {
                    document
                      .querySelector(".admin_wine_page_box")
                      .classList.remove("error_page");
                    document
                      .querySelector(".page_input")
                      .classList.remove("error_page");
                    setCurrentPage(page);
                  } else {
                    document
                      .querySelector(".admin_wine_page_box")
                      .classList.add("error_page");
                    document
                      .querySelector(".page_input")
                      .classList.add("error_page");
                  }
                }
              }}
            />
            &nbsp;/ &nbsp;{totalPage}
          </div>
          <div className="next_page" onClick={handleNextPage}>
            <FontAwesomeIcon icon={faAngleRight} size="2x" opacity="0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
