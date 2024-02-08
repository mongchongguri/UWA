import React, { useEffect, useState } from "react";
import "../../../css/admin/admin_freeboard/freeboard_detail_admin.css";
import { useParams } from "react-router-dom";
import AuthApi from "../../../AuthApi";
import DateFormat from "../../../function/DateFormat";
import MarkUp from "../../../function/MarkUp";

const AdminFreeBoardDetail = () => {
  let { id } = useParams();

  //board 관련 변수
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");
  const [writeDate, setWriteDate] = useState("");

  //comment 관련 변수
  const [comments, setComments] = useState([]);

  //recomment 관련 변수
  const [reComments, setReComments] = useState([]);

  //checkbox 관련 함수
  const [commentChecklist, setCommentChecklist] = useState({});
  const [recommentChecklist, setRecommentChecklist] = useState({});

  let [state, setState] = useState(0);
  let [state1, setState1] = useState(0);

  function handleCommentCheck(e) {
    const key = e.target.value;
    setCommentChecklist((prevChecklist) => {
      const updatedChecklist = { ...prevChecklist, [key]: e.target.checked };
      console.log("CommentCheck:", updatedChecklist);
      return updatedChecklist;
    });
  }

  function handleRecommentCheck(e) {
    const key = e.target.value;
    setRecommentChecklist((prevChecklist) => {
      const updatedChecklist = { ...prevChecklist, [key]: e.target.checked };
      return updatedChecklist;
    });
  }

  const updateBoardDetail = () => {
    AuthApi("/api/admin/updateBoardDetail", {
      boardID: id,
    })
      .then((res) => {
        setState1(state1 + 1);
        alert("삭제가 완료되었습니다.");
      })
      .catch((error) => console.error(error));
  };

  const updateBoardDetailComments = () => {
    if (
      Object.keys(commentChecklist).length === 0 &&
      Object.keys(recommentChecklist).length === 0
    ) {
      alert("체크 확인해주세요");
    } else {
      AuthApi("/api/admin/updteBoardComments", {
        commentChecklist: commentChecklist,
        recommentChecklist: recommentChecklist,
      })
        .then((res) => {
          console.log(res);
          if (res === 1) {
            setState(state + 1);
            alert("삭제가 완료되었습니다.");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    AuthApi("/api/admin/getFreeBoard", {
      boardID: id,
    })
      .then((res) => {
        setTitle(res.title);
        setNickname(res.nickname);
        setContent(res.content);
        setWriteDate(DateFormat(res.writedate));
      })
      .catch((error) => {
        console.log(error);
      });

    AuthApi("/api/admin/getFreeBoardReComment", {
      boardID: id,
    })
      .then((res) => {
        setReComments(res);
      })
      .catch((error) => console.error(error));
    AuthApi("/api/admin/getFreeBoardComment", {
      boardID: id,
    })
      .then((res) => {
        setComments(res);
      })
      .catch((error) => console.error(error));
  }, [state, state1]);

  return (
    <div id="freeboardDetailContents">
      <div id="freeboard_Detail_top">
        <div>
          <button
            id="freeboard_Detail_boardDeleteBtn"
            onClick={updateBoardDetail}
          >
            게시글 삭제
          </button>
        </div>
        <div id="freeboard_Detail_title">
          <p>{title}</p>
        </div>
        <div id="freeboard_Detail_top_bottom">
          <div id="freeboard_Detail_nickname">
            <span>{nickname}</span>
          </div>
          <div id="freeboard_Detail_writeDate">
            <span>{writeDate}</span>
          </div>
        </div>
        <div id="freeboard_Detail_content">
          <MarkUp MakrDownData={content} />
        </div>
      </div>
      <div id="freeboard_Detail_bottom">
        <button
          id="freeboard_Detail_deleteBtn"
          onClick={updateBoardDetailComments}
        >
          선택삭제
        </button>
        <ul className="freeboard_Detail_commentmain">
          <li>
            <ul className="freeboard_Detail_commentsub">
              <li></li>
              <li>유저명</li>
              <li>작성내용</li>
              <li>작성시간</li>
              <li>댓글/답글</li>
            </ul>
          </li>
          {comments.map(function (comment, i) {
            return (
              <li key={i}>
                <ul className="freeboard_Detail_commentsub">
                  <li>
                    <input
                      type="checkbox"
                      value={comment.id}
                      onChange={handleCommentCheck}
                    />
                  </li>
                  <li>{comment.nickname}</li>
                  <li>{comment.comment}</li>
                  <li>{DateFormat(comment.writedate)}</li>
                  <li>댓글</li>
                </ul>
                {reComments != null
                  ? reComments.map(function (reComment, i) {
                      if (comment.id == reComment.commentIdx) {
                        return (
                          <ul key={i} className="freeboard_Detail_commentsub">
                            <li>
                              <input
                                type="checkbox"
                                value={reComment.id}
                                onChange={handleRecommentCheck}
                              />
                            </li>
                            <li style={{ color: "#aaa" }}>
                              {reComment.nickname}
                            </li>
                            <li style={{ color: "#aaa" }}>
                              {reComment.recomment}
                            </li>
                            <li style={{ color: "#aaa" }}>
                              {DateFormat(reComment.writedate)}
                            </li>
                            <li style={{ color: "#aaa" }}>답글</li>
                          </ul>
                        );
                      } else {
                        return null;
                      }
                    })
                  : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminFreeBoardDetail;
