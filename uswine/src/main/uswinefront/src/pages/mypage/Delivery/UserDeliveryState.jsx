import { jwtDecode } from "jwt-decode";
import "../../../css/mypage/userdeliverystate.css";
import { useEffect, useState } from "react";
import AuthApi from "../../../AuthApi";
import DateFormat from "../../../function/DateFormat";

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
  let [wineDelviery, setWineDelivery] = useState([]);
  let [wineInfo, setWineInfo] = useState([]);

  useEffect(() => {
    AuthApi("/api/mypage/delivery/list", {
      useremail: userinfo.username,
    }).then((data) => {
      console.log(data);
      setWineDelivery(data.delivery);
      setWineInfo(data.wineInfo);
    });
  }, []);

  return (
    <div className="user_delivery_container">
      <div className="user_delivery">
        <p style={{ fontSize: "20px", fontWeight: "900" }}>
          구매 와인 배송 현황
        </p>
        <p style={{ color: "#888" }}>
          현재 {userinfo.nickname}님의 배송 와인 현황입니다. ( 배송 완료 항목은
          제외됩니다. )
        </p>
        <hr />
        <div className="delivery_wine_list_container"></div>
        {wineDelviery.length != 0
          ? wineDelviery.map(function (wine, i) {
              return (
                <div className="delivery_wine_wrap" key={i}>
                  <div className="delivery_wine_image_container">
                    <img src={wineInfo[i][0]} />
                  </div>
                  <div className="delivery_wine_info_container">
                    <ul>
                      <li>
                        <ul className="delivery_wine_info_list">
                          <li>{wine[1].wineName}</li>
                          <li>
                            {wineInfo[i][1] ? `( ${wineInfo[i][1]} )` : null}
                          </li>
                          <li>{wine[1].stock} 개</li>
                          <li>
                            {parseInt(wine[1].stock, 10) *
                              parseInt(wine[1].price, 10)}{" "}
                            원
                          </li>
                          <li>{DateFormat(wine[1].timestamp)}</li>
                        </ul>
                      </li>
                      <li>
                        <span style={{ fontWeight: "900" }}>배송지 : </span>
                        {wine[1].useraddress.slice(5)} (
                        {wine[1].useraddress.substring(0, 5)} )
                      </li>
                      <li>
                        <ul className="delviery_wine_state">
                          <DeliveryState wine={wine[0]} />
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

function DeliveryState({ wine }) {
  if (wine.delivery === 0) {
    return (
      <>
        <li>{DateFormat(wine.orderTime)}</li>
        <li>입고 중</li>
      </>
    );
  } else if (wine.delivery === 1) {
    return (
      <>
        <li>{DateFormat(wine.stockingTime)}</li>
        <li>입고 완료</li>
      </>
    );
  } else if (wine.delivery === 2) {
    return (
      <>
        <li>{wine.courierCompany}</li>
        <li>{wine.invoiceNumber}</li>
        <li>{DateFormat(wine.deliveryTime)}</li>
        <li>배송 중</li>
      </>
    );
  }
}
export default UserDeliveryState;
