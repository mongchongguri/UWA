import { Outlet, useNavigate, useParams } from "react-router-dom";
import "../../../css/home/FreeBoard.css";
import AuthApi from "../../../AuthApi";
import { useEffect, useState } from "react";
import DateFormat from "../../../function/DateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

function FreeBoard() {
  let navigate = useNavigate();
  let { type, page, keyword } = useParams();

  let [currentPage, setCurrentPage] = useState(page);
  let [totalPages, setTotalPages] = useState(1);
  let [boardCount, setBoardCount] = useState();

  let [initBoardList, setInitBoardList] = useState([]);
  let [freeBoardList, setFreeBoardList] = useState([]);
  let [viewBoardCount, setViewBoardCount] = useState(10);
  let [searchType, setSearchType] = useState(0);
  let [searchKeyword, setSearchKeyword] = useState("");

  let [searchbtn, setSearchbtn] = useState(0);

  function SearchKeyword() {
    navigate(`/board/${searchType}/1/${searchKeyword}`);
    setSearchbtn(searchbtn + 1);
    setCurrentPage(1);
  }

  useEffect(() => {
    AuthApi("/api/board/boardlist", {
      currentPage: currentPage - 1,
      viewPageNum: viewBoardCount,
      searchType: searchType,
      searchKeyword: keyword,
    }).then((data) => {
      setBoardCount(data.totalElements);
      setTotalPages(data.totalPages);
      setInitBoardList(data.content);
    });
  }, [currentPage, searchbtn, viewBoardCount]);

  useEffect(() => {
    async function fetchData() {
      let recommendList = [...initBoardList];

      const init = initBoardList.map(async (board, i) => {
        const data = await AuthApi("/api/board/countRecommend", {
          boardIdx: board.id,
        });
        const comment = await AuthApi("/api/comment/countComment", {
          boardIdx: board.id,
        });
        const recomment = await AuthApi("/api/comment/countReComment", {
          boardIdx: board.id,
        });
        recommendList[i].recommend = data;
        recommendList[i].comment = comment + recomment;
      });

      await Promise.all(init);
      setFreeBoardList(recommendList);
    }
    fetchData();
  }, [initBoardList]);

  function prevPageHandler() {
    if (currentPage > 1) {
      navigate(`/board/${searchType}/${currentPage - 1}/${searchKeyword}`);
      setCurrentPage(currentPage - 1);
    } else {
      alert("첫번째 페이지 입니다.");
    }
  }

  function nextPageHandler() {
    if (currentPage < totalPages) {
      navigate(
        `/board/${searchType}/${parseInt(currentPage, 10) + 1}/${searchKeyword}`
      );
      setCurrentPage(parseInt(currentPage, 10) + 1);
    } else {
      alert("마지막 페이지 입니다.");
    }
  }

  return (
    <div className="free_board_container">
      <div className="board_container">
        <p className="board_info_text">자유롭게 일상을 소통하는 공간입니다.</p>
        <div className="board_setting_container">
          <div className="board_search_container">
            <select
              className="board_search_select"
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="0">제목 + 내용</option>
              <option value="1">제목</option>
              <option value="2">내용</option>
              <option value="3">글쓴이</option>
            </select>
            <input
              className="board_search_keyword"
              type="text"
              defaultValue={keyword}
              placeholder="검색어를 입력해주세요."
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <div className="board_search_btn_container">
              <button className="board_search_btn" onClick={SearchKeyword}>
                검색
              </button>
            </div>
          </div>
          <div className="board_count">( {boardCount} 개 )</div>
          <div className="board_view_count_container">
            목록
            <select
              className="board_view_count"
              onChange={(e) => {
                setViewBoardCount(parseInt(e.target.value.match(/\d+/)[0], 10));
                navigate(`/board/${searchType}/1/${searchKeyword}`);
                setCurrentPage(1);
              }}
            >
              <option>10 개</option>
              <option>20 개</option>
              <option>30 개</option>
              <option>40 개</option>
              <option>50 개</option>
            </select>
          </div>
        </div>
        <ul className="board_list_container">
          <li>
            <ul className="board_info_container">
              <li className="board_info_title"></li>
              <li className="board_info_title" style={{ color: "#666" }}>
                제목
              </li>
              <li className="board_info_title" style={{ color: "#666" }}>
                글쓴이
              </li>
              <li
                className="board_info_title"
                style={{ color: "#666", fontSize: "15px" }}
              >
                작성일
              </li>
              <li
                className="board_info_title"
                style={{ color: "#666", fontSiz: "15px" }}
              >
                추천
              </li>
            </ul>
          </li>
          <li>
            {freeBoardList !== undefined
              ? freeBoardList.map(function (board, i) {
                  return (
                    <ul className="board_info_container board_list" key={i}>
                      <li>{board.id}</li>
                      <li
                        onClick={() => {
                          navigate(`/board/${board.id}`);
                        }}
                      >
                        {board.title}{" "}
                        <span className="board_comment_count">
                          {board.comment}
                        </span>
                      </li>
                      <li>{board.nickname}</li>
                      <li>{DateFormat(board.writedate)}</li>
                      <li>{board.recommend}</li>
                    </ul>
                  );
                })
              : null}
          </li>
        </ul>
        <div className="write_btn_container">
          <button
            className="write_btn"
            onClick={() => {
              navigate("/board/write");
            }}
          >
            글쓰기
          </button>
        </div>
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
                  navigate(`/board/${searchType}/${page}/${searchKeyword}`);
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
}

export default FreeBoard;
