import React, { useEffect, useState } from "react";
import "../../../css/admin/admin_freeboard/freeboard_admin.css";
import { Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthApi from "../../../AuthApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import DateFormat from "../../../function/DateFormat";

const FreeBoard = () => {
  const navigate = useNavigate();
  let { type, page, keyword } = useParams();

  let [currentPage, setCurrentPage] = useState(page);
  let [totalPages, setTotalPages] = useState(1);
  let [checklist, setChecklist] = useState({});

  let [freeBoardList, setFreeBoardList] = useState([]);
  let [searchType, setSearchType] = useState(0);
  let [searchKeyword, setSearchKeyword] = useState("");

  let [searchbtn, setSearchbtn] = useState(0);

  let [state, setState] = useState(0);

  let [boardIDList, setBoardIDList] = useState([]);

  let [allCommentCount, setAllCommentCount] = useState([]);

  function handleCheck(e) {
    const key = e.target.value;
    setChecklist((prevChecklist) => {
      const updatedChecklist = { ...prevChecklist, [key]: e.target.checked };
      return updatedChecklist;
    });
  }

  const updateFreeboard = () => {
    AuthApi("/api/admin/updateBoard", {
      checklist: checklist,
    })
      .then((res) => {
        if (res === 1) {
          navigate("/admin/freeboard/0/1/0");
          setState(state + 1);
        }
      })
      .catch();
  };

  const handleSearchType = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  const inputSearchKeyword = () => {
    navigate(`/admin/freeboard/${searchType}/1/${searchKeyword}`);
    setSearchbtn(searchbtn + 1);
    setCurrentPage(1);
  };

  useEffect(() => {
    AuthApi("/api/admin/adminBoardlist", {
      page: currentPage - 1,
      searchType: searchType,
      searchKeyword: searchKeyword,
    }).then((res) => {
      if (res === null) {
        alert("게시물이 존재하지 않습니다");
      } else {
        setFreeBoardList(res.content);
        setTotalPages(res.totalPages);
        const updatedBoardIDList = res.content.map((board) => board.id);
        setBoardIDList(() => [...updatedBoardIDList]);
      }
    });
  }, [state, currentPage, searchbtn]);

  useEffect(() => {
    AuthApi("/api/admin/getCommentCount", {
      boardIDList,
    })
      .then((res) => {
        setAllCommentCount(res);
      })
      .catch((error) => console.error(error));
  }, [boardIDList]);

  function prevPageHandler() {
    if (currentPage > 1) {
      navigate(
        `/admin/freeboard/${searchType}/${currentPage - 1}/${searchKeyword}`
      );
      setCurrentPage(currentPage - 1);
    } else {
      alert("첫번째 페이지 입니다.");
    }
  }

  function nextPageHandler() {
    if (currentPage < totalPages) {
      navigate(
        navigate(
          `/admin/freeboard/${searchType}/${currentPage - 1}/${searchKeyword}`
        )
      );
      setCurrentPage(parseInt(currentPage, 10) + 1);
    } else {
      alert("마지막 페이지 입니다.");
    }
  }
  return (
    <div id="freeBoardContent">
      <div id="freeboradContentNameBlock">
        <h1>자유게시판 관리</h1>
      </div>
      <div id="freeboard_search_block">
        <div id="freeboard_board_deleteBtn">
          <button onClick={updateFreeboard}>선택삭제</button>
        </div>
        <div id="freeboard_search">
          <div id="freeboard_search_select">
            <select onChange={handleSearchType}>
              <option value="0">제목 + 내용</option>
              <option value="1">제목</option>
              <option value="2">내용</option>
              <option value="3">작성자</option>
            </select>
          </div>
          <input
            type="text"
            id="freeboard_search_keyword"
            placeholder="검색어를 입력해주세요"
            onChange={handleSearchKeyword}
            defaultValue={keyword}
          />
          <button id="freeboard_search_btn" onClick={inputSearchKeyword}>
            검색
          </button>
        </div>
      </div>
      <Table id="freeboard_table" variant="dark" size="m">
        <thead>
          <tr>
            <th></th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>작성날짜</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          {freeBoardList !== undefined
            ? freeBoardList.map(function (board, i) {
                return (
                  <tr key={i}>
                    <td>
                      <input
                        type="checkbox"
                        value={board.id}
                        onChange={handleCheck}
                      />
                    </td>
                    <td>
                      <Link to={`/admin/freeboard/Detail/${board.id}`}>
                        {board.title}
                        <span>{allCommentCount[i]}</span>
                      </Link>
                    </td>
                    <td>{board.nickname}</td>
                    <td>{DateFormat(board.writedate)}</td>
                    <td>
                      <button>내용보기</button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
      <div id="freeboard_page_controller">
        <div className="prev_page" onClick={prevPageHandler}>
          <FontAwesomeIcon icon={faAngleLeft} size="2x" opacity="0.5" />
        </div>
        <div id="freeboard_page_box">
          <input
            className="page_input"
            type="number"
            defaultValue={currentPage}
            key={currentPage}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                const page = e.target.value;
                if (page >= 1 && page <= totalPages) {
                  console.log("true");
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
      </div>
    </div>
  );
};

export default FreeBoard;
