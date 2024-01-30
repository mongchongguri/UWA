import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../css/home/FreeBoardDetail.css";
import AuthApi from "../../../AuthApi";
import DateFormat from "../../../function/DateFormat";
import MarkUp from "../../../function/MarkUp";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function FreeBoardDetails() {
  const token = localStorage.getItem("token") || "";
  if (token == "") {
    alert("권한이 없습니다.");
    window.history.back();
    return <></>;
  } else {
    const userinfo = jwtDecode(token);
    return <FreeBoardDetailsComponent userinfo={userinfo} />;
  }
}

function FreeBoardDetailsComponent({ userinfo }) {
  const { id } = useParams();

  let [writer, setWriter] = useState();
  let [title, setTitle] = useState();
  let [content, setContent] = useState();
  let [writeDate, setWriteDate] = useState();

  let [commentList, setCommentList] = useState([]);
  let [comment, setComment] = useState("");

  let [reCommentList, setReCommentList] = useState([]);

  let [writebtn, setWriteBtn] = useState(0);

  let [reCommend, setReCommend] = useState(false);
  let [reCommendCount, setReCommendCount] = useState(0);

  useEffect(() => {
    AuthApi("/api/board/detail", {
      id: id,
    }).then((data) => {
      setWriter(data.nickname);
      setTitle(data.title);
      setContent(data.content);
      setWriteDate(DateFormat(data.writedate));
    });
  }, []);

  useEffect(() => {
    AuthApi("/api/board/findReCommend", {
      boardIdx: id,
      nickname: userinfo.nickname,
    }).then((data) => {
      if (data == 1) {
        setReCommend(true);
      }
    });

    AuthApi("/api/board/countRecommend", {
      boardIdx: id,
    }).then((data) => {
      setReCommendCount(data);
    });
  }, [reCommend]);

  useEffect(() => {
    AuthApi("/api/comment/list", {
      boardIdx: id,
    }).then((data) => {
      setCommentList(data);
    });
  }, [writebtn]);

  useEffect(() => {
    AuthApi("/api/comment/getrecomment", {
      boardIdx: id,
    }).then((data) => {
      setReCommentList(data);
    });
  }, [writebtn]);

  function saveComment() {
    if (comment.length == 0) {
      alert("댓글을 입력해주세요.");
    } else {
      const date = new Date();
      AuthApi("/api/comment/write", {
        boardIdx: id,
        nickname: userinfo.nickname,
        comment: comment,
        writedate: date,
      }).then((data) => {
        setComment("");
        setWriteBtn(writebtn + 1);
      });
    }
  }

  function recommendBoard() {
    if (reCommend == false) {
      AuthApi("/api/board/recommend", {
        boardIdx: id,
        nickname: userinfo.nickname,
      }).then((data) => {
        if (data == 1) {
          setReCommend(true);
        }
      });
    } else {
      const recommendDel = window.confirm("정말로 추천을 취소 하시겠습니까?");
      if (recommendDel) {
        AuthApi("/api/board/deleteReCommend", {
          boardIdx: id,
          nickname: userinfo.nickname,
        }).then((data) => {
          if (data == 1) {
            setReCommend(false);
          }
        });
      }
    }
  }
  return (
    <div className="free_detail_container">
      <div className="board_details_container">
        <div className="board_detail_title">{title}</div>
        <div className="board_detail_info_container">
          <div>{writer}</div>
          <div>추천 {reCommendCount}</div>
          <div>{writeDate}</div>
          <div>댓글 {commentList.length + reCommentList.length}</div>
        </div>
        <div className="board_detail_content">
          <MarkUp MakrDownData={content} />
        </div>
        <div className="board_detail_btn_container">
          <button>
            댓글 <span>{commentList.length + reCommentList.length}</span>
          </button>
          <button
            className="board_recommend_btn"
            onClick={() => recommendBoard()}
          >
            {reCommend ? "추천 취소 " : "추천 하기 "}
            <span>{reCommendCount}</span>
          </button>
        </div>
        <div className="board_detail_comment">
          <div className="board_comment_list_container">
            {commentList.length == 0 ? null : (
              <CommentList
                comments={commentList}
                nickname={userinfo.nickname}
                writebtn={writebtn}
              />
            )}
          </div>
          <div className="board_comment_container">
            <textarea
              className="comment_area"
              placeholder="댓글을 입력해주세요."
              value={comment}
              maxLength={600}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <div className="comment_info_container">
              <span className="comment_max_length">
                <b>{comment.length}</b> / 600
              </span>
              <button className="save_comment" onClick={saveComment}>
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function CommentList({ comments, nickname }) {
    let [initReComment, setInitReComment] = useState(
      Array(comments.length).fill(false)
    );
    let [useReComment, setUseReComment] = useState([]);

    function reCommentInput(idx) {
      let copy = [...initReComment];
      copy[idx] = true;
      setUseReComment(copy);
    }

    function reCommentClose() {
      setUseReComment(initReComment);
    }

    function deleteComment(idx) {
      const userDel = window.confirm("댓글을 삭제 하시겠습니까?");

      if (userDel) {
        AuthApi("/api/comment/commentDelete", {
          id: idx,
          boardIdx: id,
        }).then((data) => {
          setWriteBtn(writebtn + 1);
        });
      }
    }

    function deleteReComment(idx) {
      const userDel = window.confirm("댓글을 삭제 하시겠습니까?");

      if (userDel) {
        AuthApi("/api/comment/reCommentDelete", {
          id: idx,
          boardIdx: id,
        }).then((data) => {
          setWriteBtn(writebtn + 1);
        });
      }
    }
    return (
      <div className="comment_container">
        <ul className="comments_list">
          {comments.map(function (comment, i) {
            return (
              <li key={i}>
                <div className="comment_info">
                  <div className="comment_info_nickname">
                    {comment.nickname}
                  </div>
                  <div className="comment_info_writedate">
                    {DateFormat(comment.writedate)}
                  </div>
                  {useReComment[i] ? (
                    <div
                      className="comment_recomment"
                      onClick={() => {
                        reCommentClose();
                      }}
                    >
                      답글 접기
                    </div>
                  ) : (
                    <div
                      className="comment_recomment"
                      onClick={() => {
                        reCommentInput(i);
                      }}
                    >
                      답글
                    </div>
                  )}
                  {comment.nickname == nickname ? (
                    <div
                      className="board_delete_comment"
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
                    >
                      삭제
                    </div>
                  ) : null}
                </div>
                <div className="comment_info_comment">{comment.comment}</div>
                <ul>
                  {reCommentList != null
                    ? reCommentList.map(function (reComment, i) {
                        if (reComment.commentIdx == comment.id) {
                          return (
                            <li key={i}>
                              <div className="comment_info">
                                <div className="comment_info_nickname">
                                  {reComment.nickname}
                                </div>
                                <div className="comment_info_writedate">
                                  {DateFormat(reComment.writedate)}
                                </div>
                                {comment.nickname == nickname ? (
                                  <div
                                    className="board_delete_comment"
                                    onClick={() => {
                                      deleteReComment(reComment.id);
                                    }}
                                  >
                                    삭제
                                  </div>
                                ) : null}
                              </div>
                              <div className="comment_info_comment">
                                {reComment.recomment}
                              </div>
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })
                    : null}
                </ul>
                <div>
                  {useReComment[i] ? (
                    <ReCommentComponent
                      commentIdx={comment.id}
                      setUseReComment={setUseReComment}
                      initReComment={initReComment}
                    />
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  function ReCommentComponent({ commentIdx, setUseReComment, initReComment }) {
    let [recomment, setReComment] = useState("");

    function saveReComment() {
      if (recomment.length == 0) {
        alert("댓글을 입력해주세요.");
      } else {
        const date = new Date();
        AuthApi("/api/comment/recomment", {
          boardIdx: id,
          nickname: userinfo.nickname,
          commentIdx: commentIdx,
          recomment: recomment,
          writedate: date,
        }).then((data) => {
          setReComment("");
          setUseReComment(initReComment);
          setWriteBtn(writebtn + 1);
        });
      }
    }
    return (
      <div className="recomment_container">
        <textarea
          className="recomment_area"
          placeholder="댓글을 입력해주세요."
          value={recomment}
          maxLength={600}
          onChange={(e) => {
            setReComment(e.target.value);
          }}
        />
        <div className="comment_info_container">
          <span className="comment_max_length">
            <b>{recomment.length}</b> / 600
          </span>
          <button className="save_comment" onClick={saveReComment}>
            등록
          </button>
        </div>
      </div>
    );
  }
}
export default FreeBoardDetails;
