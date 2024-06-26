import { jwtDecode } from "jwt-decode";
import "../../../css/home/WriteBoard.css";
import ReactQuill, { Quill } from "react-quill";
import { ImageResize } from "quill-image-resize-module-ts";
import { useMemo, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import AuthApi from "../../../AuthApi";
import AwsUpload from "../../../function/AWSs3";

function WriteBoard() {
  const token = localStorage.getItem("token") || "";
  if (token == "") {
    alert("로그인이 필요한 서비스 입니다.");
    window.history.back();
    return <></>;
  } else {
    const userinfo = jwtDecode(token);
    return <WriteBoardComponent userinfo={userinfo} />;
  }
}

function WriteBoardComponent({ userinfo }) {
  const quillRef = useRef(null);

  const nickname = userinfo.nickname;

  let [title, setTitle] = useState();
  let [content, setContent] = useState();

  // ImageHandler
  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      console.log(file);

      try {
        const upload = AwsUpload("input", file);

        const IMG_URL = await upload.promise().then((res) => res.Location);

        // 에디터 삽입
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", IMG_URL);
      } catch (error) {
        console.log(error);
      }
    });
  };

  // Quill Modules
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
  const handlerSubmit = async () => {
    const date = new Date();
    AuthApi("/api/board/write", {
      nickname: nickname,
      title: title,
      content: content,
      writedate: date,
    }).then((data) => {
      if (data === 1) {
        alert("게시글이 등록되었습니다.");
        window.history.back();
      } else {
        alert("게시글 등록에 실패했습니다.");
      }
    });
  };
  return (
    <div className="write_container">
      <div className="board_container">
        <input
          id="board_title"
          type="text"
          placeholder="제목을 입력해주세요."
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill
          id="Quill_editor"
          ref={quillRef}
          modules={modules}
          onChange={setContent}
        />
      </div>
      <div className="write_controller">
        <div className="write_save" onClick={handlerSubmit}>
          <FontAwesomeIcon icon={faPenToSquare} size="lg" opacity="0.5" />
        </div>
        <div className="write_cancel" onClick={() => window.history.back()}>
          <FontAwesomeIcon icon={faXmark} size="xl" opacity="0.5" />
        </div>
      </div>
    </div>
  );
}

export default WriteBoard;
