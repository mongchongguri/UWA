import React, { useEffect, useState } from "react";
import AuthApi from "../../../AuthApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "../../../css/admin/admin_chart/admin_alltradechart.css";
import DateFormat from "../../../function/DateFormat";

const AllWithdrawChart = () => {
  let [page, setPage] = useState(1);
  let [totalPage, setTotalPage] = useState(0);
  let [withdrawlist, setWithdrawlist] = useState([]);

  function handlePrevPage(e) {
    if (page > 1) {
      setPage(parseInt(page) - 1);
    } else {
      alert("첫번째 페이지 입니다.");
    }
  }
  function handleNextPage(e) {
    if (page < totalPage) {
      setPage(parseInt(page) + 1);
    } else {
      alert("마지막 페이지 입니다.");
    }
  }

  useEffect(() => {
    AuthApi("/api/admin/chart/withdrawchart", {
      page: page - 1,
    })
      .then((res) => {
        setTotalPage(res.totalPage + 1);
        setWithdrawlist(res.withdrawList);
      })
      .catch((error) => console.error(error));
  }, [page]);

  return (
    <div id="tradeChart">
      <h5>출금내역</h5>
      <ul id="tradeTable" style={{ width: "100%" }}>
        <li>
          <ul id="tableHeader">
            <li style={{ width: "10%" }}>출금번호</li>
            <li style={{ width: "30%" }}>아이디</li>
            <li style={{ width: "30%" }}>출금금액</li>
            <li style={{ width: "30%" }}>수수료</li>
          </ul>
        </li>
        {withdrawlist.map(function (withdraw, i) {
          return (
            <li key={i}>
              <ul>
                <li style={{ width: "10%" }}>{withdraw.id}</li>
                <li style={{ width: "30%" }}>{withdraw.email}</li>
                <li style={{ width: "30%" }}>
                  &#8361;{" "}
                  {withdraw.withdraw
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </li>
                <li
                  style={{
                    width: "30%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  &#8361;{" "}
                  {withdraw.revenue
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
      <div
        className="admin_wine_page_controller"
        style={{ justifyContent: "center" }}
      >
        <div className="prev_page" onClick={handlePrevPage}>
          <FontAwesomeIcon icon={faAngleLeft} size="2x" opacity="0.5" />
        </div>

        <div className="admin_wine_page_box">
          <input
            className="page_input"
            type="number"
            defaultValue={page}
            key={page}
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
                  setPage(page);
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
  );
};

export default AllWithdrawChart;
