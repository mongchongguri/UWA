import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthApi from "../../../AuthApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import EventDateFormat from "../../../function/EventDateFormat";

const EventBoard = () => {
  const { page } = useParams();

  let navigate = useNavigate();

  let [currentPage, setCurrentPage] = useState(page);
  let [totalPages, setTotalPages] = useState(1);
  let [eventList, setEventList] = useState([]);

  useEffect(() => {
    AuthApi("/api/event/getEventList", {
      page: currentPage - 1,
    }).then((data) => {
      setEventList(data.content);
      setTotalPages(data.totalPages);
    });
  }, [currentPage]);

  function prevPageHandler() {
    if (currentPage > 1) {
      navigate(`/event/${currentPage - 1}`);
      setCurrentPage(currentPage - 1);
    } else {
      alert("첫번째 페이지 입니다.");
    }
  }

  function nextPageHandler() {
    if (currentPage < totalPages) {
      navigate(`/event/${parseInt(currentPage, 10) + 1}`);
      setCurrentPage(parseInt(currentPage, 10) + 1);
    } else {
      alert("마지막 페이지 입니다.");
    }
  }

  return (
    <div className="free_board_container">
      <div className="board_container">
        <p className="board_info_text">고객님들을 위한 이벤트 공간입니다.</p>

        <ul className="board_list_container">
          <li>
            <ul className="board_info_container">
              <li
                className="board_info_title"
                style={{ color: "#666", width: "45%" }}
              >
                제목
              </li>
              <li
                className="board_info_title"
                style={{ color: "#666", width: "15%" }}
              >
                글쓴이
              </li>
              <li
                className="board_info_title"
                style={{ color: "#666", fontSize: "15px", width: "20%" }}
              >
                시작일
              </li>
              <li
                className="board_info_title"
                style={{ color: "#666", fontSiz: "15px", width: "20%" }}
              >
                마감일
              </li>
            </ul>
          </li>
          <li>
            {eventList !== undefined
              ? eventList.map(function (board, i) {
                  // enddate가 writedate보다 큰지 확인하여 조건에 따라 스타일 및 텍스트 변경
                  const isEventOver =
                    new Date(board.endDate).getTime() > new Date().getTime();
                  return (
                    <ul
                      className={`board_info_container board_list ${
                        isEventOver ? "event_over" : ""
                      }`}
                      key={i}
                    >
                      <li
                        onClick={() => {
                          navigate(`/event/eventDetail/${board.id}`);
                        }}
                        style={{
                          width: "45%",
                          color: isEventOver ? "black" : "#aaa",
                        }}
                      >
                        {isEventOver
                          ? "[ 진행중인 이벤트 ]  " + board.title
                          : "[ 종료된 이벤트 ]  " + board.title}
                      </li>
                      <li style={{ width: "15%" }}>{board.nickname}</li>
                      <li style={{ width: "20%" }}>
                        {EventDateFormat(board.writeDate)}
                      </li>
                      <li style={{ width: "20%" }}>
                        {EventDateFormat(board.endDate)}
                      </li>
                    </ul>
                  );
                })
              : null}
          </li>
        </ul>
      </div>
      <div className="page_controller">
        <div
          className="page_up"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <FontAwesomeIcon icon={faAngleUp} size="2x" opacity="0.5" />
        </div>
        <div className="prev_page" onClick={prevPageHandler}>
          <FontAwesomeIcon icon={faAngleLeft} size="2x" opacity="0.5" />
        </div>
        <div className="page_box">
          <input
            className="page_input"
            type="number"
            defaultValue={currentPage}
            key={currentPage}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                const page = e.target.value;
                if (page >= 1 && page <= totalPages) {
                  document
                    .querySelector(".page_box")
                    .classList.remove("error_page");
                  document
                    .querySelector(".page_input")
                    .classList.remove("error_page");
                  navigate(`/board/${page}`);
                  setCurrentPage(page);
                } else {
                  document
                    .querySelector(".page_box")
                    .classList.add("error_page");
                  document
                    .querySelector(".page_input")
                    .classList.add("error_page");
                  alert("없는 페이지 입니다.");
                }
              }
            }}
          />
          &nbsp;/ &nbsp;{totalPages}
        </div>
        <div className="next_page" onClick={nextPageHandler}>
          <FontAwesomeIcon icon={faAngleRight} size="2x" opacity="0.5" />
        </div>
        <div
          className="page_down"
          onClick={() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          <FontAwesomeIcon icon={faAngleDown} size="2x" opacity="0.5" />
        </div>
      </div>
    </div>
  );
};

export default EventBoard;
