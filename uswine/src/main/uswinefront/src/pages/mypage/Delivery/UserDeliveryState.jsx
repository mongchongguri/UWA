import { jwtDecode } from "jwt-decode";
import "../../../css/mypage/userdeliverystate.css";

function UserDeliveryState() {
  const token = localStorage.getItem("token") || "";
  if (token == "") {
    alert("로그인이 필요한 서비스 입니다.");
    window.history.back();
    return <></>;
  } else {
    const userinfo = jwtDecode(token);
    return <UserDeliveryStateComponet userinfo={userinfo} />;
  }
}

function UserDeliveryStateComponet({ userinfo }) {
  return (
    <div className="user_delivery_container">
      <div className="user_delivery">ddd</div>
    </div>
  );
}
export default UserDeliveryState;
