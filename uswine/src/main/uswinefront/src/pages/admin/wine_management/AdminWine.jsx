import React, { useEffect, useState } from "react";
import "../../../css/admin/wine_management/admin_wine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import AuthApi from "../../../AuthApi";
import { Link, useNavigate } from "react-router-dom";

const AdminWine = () => {
  let navigate = useNavigate();

  let [mongoWineList, setMongoWineList] = useState([]);
  let [mysqlWineList, setMysqlWineList] = useState([]);

  let [searchWine, setSearchWine] = useState("");

  let [totalPage, setTotalPage] = useState("");
  let [currentPage, setCurrentPage] = useState(1);

  let [searchBtn, setSearchBtn] = useState(0);

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

  useEffect(() => {
    AuthApi("/api/admin/management/wine/", {
      page: currentPage - 1,
      searchWine: searchWine,
    })
      .then((res) => {
        console.log(res.mysql);
        setMongoWineList(res.mongo);
        setMysqlWineList(res.mysql);
        setTotalPage(res.totalpage + 1);
      })
      .catch((error) => console.error(error));
  }, [currentPage]);

  return (
    <div id="management_wine_container">
      <div id="management_wine_content">
        <h1>MD판매 와인관리</h1>
        <div id="switch_seller_btn">
          <button
            onClick={() => {
              navigate("/admin/management/wine");
            }}
          >
            MD판매
          </button>
          <button
            onClick={() => {
              navigate("/admin/management/sellerwine");
            }}
          >
            Seller판매
          </button>
        </div>
        <div className="admin_wine_tag_container">
          <div className="admin_wine_search">
            <input
              className="admin_wine_search-txt"
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchWine(e.target.value)}
            />
            <button
              className="search-btn"
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
          </div>
        </div>
        <div className="admin_wineList_container">
          <div>
            <div className="wine_view">
              <ul className="wine_list_prev">
                {mongoWineList.map(function (wine, i) {
                  return (
                    <li key={i}>
                      <div className="admin_wine_list_card">
                        <div className="wine_names">
                          <span className="wine_name">{wine.wine_name}</span>
                          <hr></hr>
                          <span className="wine_name_en">
                            {wine.wine_name_en}
                          </span>
                        </div>

                        <img src={wine.wine_image} alt="wine_img" />

                        <div className="wine_info">
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
            <div className="wine_view">
              <ul className="wine_list_next">
                {mongoWineList.map(function (wine, i) {
                  return (
                    <li key={i}>
                      <Link
                        to={`/admin/management/MDwineDetail/${mysqlWineList[i].id}`}
                        id="admin_wine_link"
                      >
                        <div className="admin_wine_list_card">
                          <div className="wine_names">
                            <span className="wine_name">{wine.wine_name}</span>
                            <hr></hr>
                            <span className="wine_name_en">
                              {wine.wine_name_en}
                            </span>
                          </div>

                          <img src={wine.wine_image} alt="" />

                          <div className="wine_info">
                            <span>
                              <b>{wine.wine_info[0]}</b> | {wine.wine_info[1]} |{" "}
                              {wine.wine_info[2]}
                            </span>
                          </div>

                          <div className="wine_seller_info">
                            <div>{mysqlWineList[i].nickname}</div>
                            <div>
                              {mysqlWineList[i].sellStock === "0"
                                ? "품절"
                                : mysqlWineList[i].sellMoney.toLocaleString() +
                                  "원"}
                            </div>
                          </div>
                        </div>
                      </Link>
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
    </div>
  );
};

export default AdminWine;
