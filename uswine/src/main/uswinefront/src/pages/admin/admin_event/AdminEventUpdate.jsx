import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../../css/admin/admin_event/admin_event_create.css";
import ReactQuill, { Quill } from "react-quill";
import { ImageResize } from "quill-image-resize-module-ts";
import AWS from "aws-sdk";
import AuthApi from "../../../AuthApi";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import EventDateFormat from "../../../function/EventDateFormat";

const AdminEventUpdate = () => {
  let { id } = useParams();

  const quillRef = useRef(null);

  const navigate = useNavigate();

  const [eventtitle, setEventTitle] = useState("");
  const [eventcontent, setEventContent] = useState("");
  const [enddate, setEndDate] = useState(new Date());

  const eventTitleHandler = (e) => {
    setEventTitle(e.target.value);
  };

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files?.[0]; //이미지 정보
      try {
        const name = Date.now();
        AWS.config.update({
          //AWS 관련 지역정보, 접근키, 보안키
          region: "ap-northeast-2",
          accessKeyId: "AKIAZNVISYDYJEQ3FE46",
          secretAccessKey: "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",
        });

        const upload = new AWS.S3.ManagedUpload({
          params: {
            Bucket: "mongchongguriforum",
            Key: `upload/${name}`,
            Body: file,
          },
        });

        const IMG_URL = await upload.promise().then((res) => res.Location); //위에서 만든 img_url을 가져옴

        //insert editor
        const editor = quillRef.current.getEditor(); //현재 Editor 변수
        const range = editor.getSelection();

        //실제 insert를 시켜주는 소스
        //인자 => 이미지의 배열 인덱스, 타입, url
        editor.insertEmbed(range.index, "image", IMG_URL);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(() => {
    Quill.register("modules/ImageResize", ImageResize);
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          [{ align: [] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "underline", "italic", "strike", "blockquote", "image"],
          [
            { list: "ordered" },
            { list: "bullet" },
            "link",
            { indent: "-1" },
            { indent: "+1" },
          ],
          [
            {
              color: [],
            },
            { background: [] },
          ],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    };
  }, []);

  const handleSubmit = async () => {
    const date = new Date();
    AuthApi("/api/admin/event/update", {
      id: id,
      nickname: "admin",
      title: eventtitle,
      content: eventcontent,
      writeDate: date,
      endDate: enddate,
    })
      .then((res) => {
        alert("이벤트 수정이 완료되었습니다.");
        navigate("/admin/event");
      })
      .catch();
  };

  useEffect(() => {
    AuthApi("/api/admin/event/detail", {
      id: id,
    })
      .then((res) => {
        setEventTitle(res.title);
        setEventContent(res.content);
        setEndDate(res.endDate);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="event_create_container">
      <div id="event_create_contentBlock">
        <div id="event_create_intro">
          <h1>이벤트 수정</h1>
        </div>
        <div id="event_create_title">
          <input
            type="text"
            placeholder={eventtitle}
            id="eventtitle"
            onChange={eventTitleHandler}
          />
          <div id="event_writedate_title">이벤트 마감일자:</div>
          <ReactDatePicker
            selected={enddate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy.MM.dd" // 시간 포맷 변경
            showPopperArrow={false} // 화살표 변경
            minDate={new Date()} // 오늘 날짜 전은 선택 못하게
            style={{ width: "30%" }}
            value={EventDateFormat(enddate)}
          />
        </div>
        <div id="event_create_content">
          <ReactQuill
            id="quill_editor"
            ref={quillRef}
            modules={modules}
            onChange={setEventContent}
            value={eventcontent}
          />
        </div>
        <div id="event_create_buttons">
          <div id="event_save">
            <button id="event_save_btn" onClick={handleSubmit}>
              이벤트 수정
            </button>
          </div>
          <div id="event_cancel">
            <button id="event_cancel_btn" onClick={() => window.history.back()}>
              취소하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEventUpdate;
