import AdminReCommentComponent from "./AdminNoticeRecommentList";
import { Button } from "react-bootstrap";
export default function CommentList({ comments,handleCommentCheck,recommentList,handleRecommentCheck
,DateFormat, deleteNoticeComment }) {
    return (
      <>
        <div id="buttonArea_notice_detail">
            <Button variant="light" id="deletebutton_notice_detail" onClick={deleteNoticeComment}>
                선택 삭제
            </Button>
        </div>
        <div className="admin_comment_container">
          <div id="NoticeCommentListHead">
              <div id="headColumn_notice_comment" className="headNick">
                  닉네임
              </div>
              <div id="headColumn_notice_comment" className="headContent">
                  작성내용
              </div>
              <div id="headColumn_notice_comment" className="headWriteDate">
                  작성시간
              </div>
              <div id="headColumn_notice_comment" className="headComment-Recomment">
                  댓글/답글
              </div>
          </div>
          <ul className="admin_comments_list">
            {comments.map(function (comment, i) {
              return (
                <li key={i}>
                  <div className="admin_comment_info">
                      <input
                          type="checkbox"
                          id={`${comment.nickname}_${comment.id}`}
                          name="checkbox_notice"
                          className="checkbox_notice"
                        onChange={(e)=>handleCommentCheck(e.target.id)}
                      />
                      <div className="admin_comment_info_nickname">
                          {comment.nickname}
                      </div>
                      <div className="admin_comment_info_comment">{comment.comment}</div>
                      <div className="admin_comment_info_writedate">
                          {DateFormat(comment.writedate)}
                      </div>
                      <div className="admin_comment_info_comment_recomment">
                          댓글
                      </div>

                  </div>
                  
                  <div>
                      <AdminReCommentComponent
                        commentIdx={comment.id}
                        recommentList={recommentList}
                        handleRecommentCheck={handleRecommentCheck}
                        DateFormat={DateFormat}
                      />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }