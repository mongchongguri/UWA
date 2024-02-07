import { jwtDecode } from "jwt-decode";
import "../../css/seller/SalesManagement.css";
import { useEffect, useState } from "react";
import AuthApi from "../../AuthApi";
import PhoneNumberFormant from "../../function/PhoneNumberFormat";
import DateFormat from "../../function/DateFormat";

function SalesManagement() {
  const token = localStorage.getItem("token") || "";
  if (token == "") {
    alert("로그인이 필요한 서비스 입니다.");
    window.history.back();
    return <></>;
  } else {
    const userinfo = jwtDecode(token);
    if (userinfo.role != "ROLE_SELLER") {
      alert("권한이 없습니다.");
      window.history.back();
      return <></>;
    } else {
      return <SalesManagementComponent userinfo={userinfo} />;
    }
  }
}

function SalesManagementComponent({ userinfo }) {
  let [info, setInfo] = useState({});
  let [wineList, setWineList] = useState([]);
  let [totalStock, setTotalStock] = useState(0);

  useEffect(() => {
    setTotalStock(0);
    AuthApi("/api/seller/management/info", {
      email: userinfo.username,
    }).then((data) => {
      console.log(data);
      setInfo(data.info);
      setWineList(data.wine.content);

      for (let i = 0; i < data.wine.content.length; i++) {
        setTotalStock(totalStock + parseInt(data.wine.content[i].stock, 10));
      }
    });
  }, []);
  return (
    <div className="sales_management_container">
      <div className="management_container">
        <div className="seller_info_card">
          <div className="seller_detail_info">
            <p>{info.email}</p>
            <p>
              {userinfo.nickname} <span>{PhoneNumberFormant(info.phone)}</span>
            </p>
            <p className="sell_total_income">총 수익 : {info.totalMoney} 원</p>
            <div className="sell_detail_info">
              <div className="sell_wine_count">
                <p>판매중인 와인</p>
                <p>{wineList.length}</p>
              </div>
              <div className="sell_wine_count">
                <p>판매중인 와인 재고</p>
                <p>{totalStock}</p>
              </div>
              <div className="sell_wine_count">
                <p>판매완료 와인</p>
                <p>0</p>
              </div>
              <div className="sell_wine_count">
                <p>출금 가능 금액</p>
                <p>
                  {info.money} <span className="money_unit">원</span>
                </p>
              </div>
            </div>
            <div className="sell_withdraw_container">
              <div>
                <span>{info.bank}</span>
                <span>{info.account}</span>
                <button className="withdraw_btn">출금하기</button>
              </div>
            </div>
          </div>
        </div>
        <div className="wine_info_list_container">
          <ul>
            <li>
              <ul className="sell_wine_list sell_list_title">
                <li>품목 번호</li>
                <li>와인 이름</li>
                <li>판매 금액</li>
                <li>등록 시간</li>
                <li>판매 상태</li>
                <li>재고 현황</li>
                <li>판매 처리</li>
              </ul>
            </li>
            <li>
              {wineList != null
                ? wineList.map(function (wine, i) {
                    return (
                      <ul className="sell_wine_list" key={i}>
                        <li>{wine.id}</li>
                        <li>{wine.wineName}</li>
                        <li>{wine.sellMoney}</li>
                        <li>{DateFormat(wine.selldate)}</li>
                        <li>{wine.sellState == 0 ? "판매중" : "판매완료"}</li>
                        <li>{wine.stock} 개</li>
                        <li>
                          <button className="sell_cancel">판매 취소</button>
                        </li>
                      </ul>
                    );
                  })
                : null}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SalesManagement;
