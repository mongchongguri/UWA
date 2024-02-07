import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../css/home/NoticeBoardDetail.css";
import AuthApi from "../../../AuthApi";
import DateFormat from "../../../function/DateFormat";
import MarkUp from "../../../function/MarkUp";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function NoticeBoardDetails() {
  const token = localStorage.getItem("token") || "";
  if (token == "") {
    alert("권한이 없습니다.");
    window.history.back();
    return <></>;
  } else {
    const userinfo = jwtDecode(token);
    return <NoticeBoardDetailsComponent userinfo={userinfo} />;
  }
}

function NoticeBoardDetailsComponent({ userinfo }) {
  const { id } = useParams();

  let [title, setTitle] = useState();
  let [content, setContent] = useState();
  let [writeDate, setWriteDate] = useState();

  let [commentList, setCommentList] = useState([]);
  let [comment, setComment] = useState("");

  let [reCommentList, setReCommentList] = useState([]);

  let [writebtn, setWriteBtn] = useState(0);


  useEffect(() => {
    AuthApi("/api/notice/noticeDetail", {
      id: id,
    }).then((data) => {
      setTitle(data.title);
      setContent(data.content);
      setWriteDate(DateFormat(data.writedate));
    });
  }, []);


  useEffect(() => {
    AuthApi("/api/notice/noticeCommentList", {
      noticeIdx: id,
    }).then((data) => {
      setCommentList(data);
    });
  }, [writebtn]);

  useEffect(() => {
    AuthApi("/api/notice/getnoticerecomment", {
      noticeIdx: id,
    }).then((data) => {
      console.log(data)
      setReCommentList(data);
    });
  }, [writebtn]);

  function saveComment() {
    if (comment.length == 0) {
      alert("댓글을 입력해주세요.");
    } else {
      const date = new Date();
      AuthApi("/api/notice/commentWrite", {
        noticeIdx: id,
        nickname: userinfo.nickname,
        comment: comment,
        writedate: date,
      }).then((data) => {
        setComment("");
        setWriteBtn(writebtn + 1);
      });
    }
  }

  
  return (
    <div className="free_detail_container">
      <div className="board_details_container">
        <div className="board_detail_title">{title}</div>
        <div className="board_detail_info_container">
          <div>관리자</div>
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
        AuthApi("/api/notice/noticeCommentDelete", {
          id: idx,
          noticeIdx: id,
        }).then((data) => {
          setWriteBtn(writebtn + 1);
        });
      }
    }

    function deleteReComment(idx) {
      const userDel = window.confirm("댓글을 삭제 하시겠습니까?");

      if (userDel) {
        AuthApi("/api/notice/noticeRecommentDelete", {
          id: idx,
          noticeIdx: id,
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
                <div>
                  {useReComment[i] ? (
                    <ReCommentComponent
                      noticeCommentIdx={comment.id}
                      setUseReComment={setUseReComment}
                      initReComment={initReComment}
                      nickname={nickname}
                      deleteReComment={deleteReComment}
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

  function ReCommentComponent({ noticeCommentIdx, setUseReComment, initReComment,
    nickname,deleteReComment,noticeComment }) {
    let [recomment, setReComment] = useState("");

    function saveReComment() {
      if (recomment.length == 0) {
        alert("댓글을 입력해주세요.");
      } else {
        const date = new Date();
        AuthApi("/api/notice/saveNoticeRecomment", {
          noticeIdx: id,
          nickname: userinfo.nickname,
          noticeCommentIdx: noticeCommentIdx,
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
      <div>
          <ul>
          {reCommentList != null
            ? reCommentList.map(function (reComment, i) {
                if (reComment.noticeCommentIdx == noticeCommentIdx) {
                  return (
                    <li key={i}>
                      {recomment.commentIdx}
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
      </div>
    );
  }
}
export default NoticeBoardDetails;
