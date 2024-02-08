import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../css/admin/admin_event/admin_event_detail.css";
import AuthApi from "../../../AuthApi";
import MarkUp from "../../../function/MarkUp";
import EventDateFormat from "../../../function/EventDateFormat";

const AdminEventDetail = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [nickname, setNickname] = useState("");
  let [writedate, setWritedate] = useState("");
  let [enddate, setEnddate] = useState("");

  const handleCancel = () => {
    window.history.back();
  };

  const handleDel = () => {
    AuthApi("/api/admin/event/delete", {
      id: id,
    })
      .then((res) => {
        if (res == 1) {
          alert("이벤트가 삭제 되었습니다.");
          navigate("/admin/event");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = () => {
    navigate(`/admin/event/update/${id}`);
  };

  useEffect(() => {
    AuthApi("/api/admin/event/detail", {
      id: id,
    })
      .then((res) => {
        setTitle(res.title);
        setContent(res.content);
        setNickname(res.nickname);
        setWritedate(res.writeDate);
        setEnddate(EventDateFormat(res.endDate));
      })
      .catch((error) => console.error(error));
  });
  return (
    <div id="detailcontainer">
      <div id="detail_content_block">
        <h1>이벤트 상세</h1>
        <div id="event_detail_title">
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            value={title}
            readOnly
          />
          <div id="event_detail_enddateBlock">
            이벤트 마감일자: &nbsp;&nbsp;&nbsp;
            <div id="event_detail_enddate">{enddate}</div>
          </div>
        </div>
        <div id="event_detail_content">
          <MarkUp MakrDownData={content} />
        </div>
        <div id="event_detail_buttons">
          <div id="event_detail_btns">
            <button id="event_detail_updBtn" onClick={handleUpdate}>
              이벤트 수정
            </button>
          </div>
          <div id="event_detail_deleteBtn">
            <button id="event_detail_delBtn" onClick={handleDel}>
              이벤트 삭제
            </button>
          </div>
          <div id="event_detail_cancel">
            <button id="event_detail_canBtn" onClick={handleCancel}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEventDetail;
