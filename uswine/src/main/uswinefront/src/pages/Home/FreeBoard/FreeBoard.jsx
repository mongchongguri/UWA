import { useNavigate } from "react-router-dom";

function FreeBoard() {
  let navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate("/board/write");
      }}
    >
      글쓰기
    </button>
  );
}

export default FreeBoard;
