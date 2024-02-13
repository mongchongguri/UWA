import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthApi from "../../../AuthApi";
import "../../../css/home/WineDetailsPage.css";
import "../../../css/home/OnSaleWineDetail.css";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OnSaleDetail() {
  const token = localStorage.getItem("token") || "";
  if (token == "") {
    alert("로그인이 필요한 서비스 입니다.");
    window.history.back();
    return <></>;
  } else {
    const userinfo = jwtDecode(token);
    return <OnSaleDetailCheck userinfo={userinfo} />;
  }
}

function OnSaleDetailCheck({ userinfo }) {
  let { stock, id } = useParams();

  let [wineInfo, setWineInfo] = useState({});
  useEffect(() => {
    AuthApi("/api/onsale/wine", {
      id: id,
    }).then((data) => {
      console.log(data);
      setWineInfo(data);
    });
  }, []);

  return (
    <div className="wine_detail_container">
      <div className="wine_detail_component">
        {wineInfo == null ? (
          <p>정보가 없는 와인입니다.</p>
        ) : (
          <OnSaleDetailComponent
            wineInfo={wineInfo}
            stock={stock}
            userinfo={userinfo}
          />
        )}
      </div>
    </div>
  );
}

function OnSaleDetailComponent({ wineInfo, stock, userinfo }) {
  let navigate = useNavigate();
  console.log(wineInfo);
  console.log(userinfo);
  function cartFunction() {
    AuthApi("/api/mypage/cart/buyWine", {
      mongoId: wineInfo.id,
      username: userinfo.nickname,
      useremail: userinfo.username,
      sellername: wineInfo.nickName,
      selleremail: wineInfo.email,
      price: wineInfo.sellMoney,
      document: 1,
    }).then((data) => {
      if (data === 1) {
        const cart = window.confirm(
          "장바구니에 담았습니다. 장바구니로 이동하시겠습니까?"
        );
        if (cart) {
          navigate("/mypage/cart");
        }
      } else {
        const cart = window.confirm(
          "이미 장바구니에 있는 항목입니다. 장바구니로 이동하시겠습니까?"
        );
        if (cart) {
          navigate("/mypage/cart");
        }
      }
    });
  }
  return (
    <>
      <div className="wine_detail_img">
        <img src={wineInfo.wineImageURL} alt="wine" />
        <div>
          <ul className="wine_detail_info_list seller_info">
            <li>
              <div className="info_title">판매자</div>
              <div className="info_detail">{wineInfo.nickName}</div>
            </li>
            <li>
              <div className="info_title">판매금액</div>
              <div className="info_detail">{wineInfo.sellMoney} 원</div>
            </li>
            <li>
              <div className="info_title">판매처</div>
              <div className="info_detail">
                <span>{wineInfo.postCode}</span>
                <br />
                <span>{wineInfo.address}</span>
              </div>
            </li>
            <li>
              <div className="info_title">연락처</div>
              <div className="info_detail">{wineInfo.phone}</div>
            </li>
            <li>
              <div className="info_title">판매자 정보</div>
              <div className="info_detail">{wineInfo.sellerInfo}</div>
            </li>
            <li>
              <div className="info_title">남은 수량</div>
              <div className="info_detail">{stock} 개</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="wine_details_info">
        <ul className="wine_detail_list">
          <li>
            <ul className="wine_detail_info">
              <li>{wineInfo.wineType}</li>
              <li>{wineInfo.wineRegion}</li>
              <li>
                <FontAwesomeIcon icon={regularStar} size="xl" />
              </li>
            </ul>
          </li>
          <li className="wine_detail_name">{wineInfo.wineName}</li>
          <li className="wine_detail_name_en">{wineInfo.wineNameEn}</li>
          <li className="wine_detail_note">{wineInfo.wineInfo}</li>
          <li className="wine_detail_note">
            <p>
              <b>판매자 추가 정보</b>
            </p>
            {wineInfo.addInfo}
          </li>
          <li>
            <div className="wine_info_table">
              {wineInfo.wineTaste != null
                ? wineInfo.wineTaste.map((taste, idx) => {
                    return (
                      <ul className="wine_info_list" key={idx}>
                        <li>{taste[0]}</li>
                        {Array.from({ length: 5 }, (_, i) => {
                          if (taste[1] > i) {
                            return (
                              <li
                                key={i}
                                className={`wine_detail_taste taste_${i + 1}`}
                              ></li>
                            );
                          } else {
                            return (
                              <li className="wine_detail_taste" key={i}></li>
                            );
                          }
                        })}
                      </ul>
                    );
                  })
                : null}
            </div>
          </li>
          <li>
            <div className="wine_detail_aroma">아로마</div>
            <ul className="wine_aroma_list">
              {wineInfo.wineAroma != null
                ? wineInfo.wineAroma.map((aroma, i) => {
                    if (i + 1 === wineInfo.wineAroma.length) {
                      return <li>{aroma}</li>;
                    } else {
                      return (
                        <>
                          <li>{aroma}</li>
                          <li style={{ color: "#888" }}>|</li>
                        </>
                      );
                    }
                  })
                : null}
            </ul>
          </li>
          <li>
            <ul className="wine_detail_info_list">
              <li>
                <div className="info_title">생산자</div>
                <div className="info_detail">
                  {wineInfo.wineMaker == "" ? "정보 없음" : wineInfo.wineMaker}
                </div>
              </li>
              <li>
                <div className="info_title">국가/샌산지역</div>
                <div className="info_detail">
                  {wineInfo.Region == "" ? "정보 없음" : wineInfo.wineRegion}
                </div>
              </li>
              <li>
                <div className="info_title">주요품종</div>
                <div className="info_detail">
                  {wineInfo.wineVarieties == ""
                    ? "정보 없음"
                    : wineInfo.wineVarieties}
                </div>
              </li>
              <li>
                <div className="info_title">스타일</div>
                <div className="info_detail">
                  {wineInfo.wineStyle == "" ? "정보 없음" : wineInfo.wineStyle}
                </div>
              </li>
              <li>
                <div className="info_title">양조</div>
                <div className="info_detail">
                  {wineInfo.wineBrewing == ""
                    ? "정보 없음"
                    : wineInfo.wineBrewing}
                </div>
              </li>
              <li>
                <div className="info_title">알코올</div>
                <div className="info_detail">
                  {wineInfo.alcohol == ""
                    ? "정보 없음"
                    : wineInfo.alcohol + " %"}
                </div>
              </li>
              <li>
                <div className="info_title">음용온도</div>
                <div className="info_detail">
                  {wineInfo.wineTemp == "" ? "정보 없음" : wineInfo.wineTemp}
                </div>
              </li>
              <li>
                <div className="info_title">수입사</div>
                <div className="info_detail">
                  {wineInfo.wineIncome == ""
                    ? "정보 없음"
                    : wineInfo.wineIncome}
                </div>
              </li>
            </ul>
          </li>
          <div className="wine_buy_btn">
            <div>
              <button
                onClick={() => {
                  navigate(
                    `/onsale/chat/room/${wineInfo.nickName}/${wineInfo.id}`
                  );
                }}
              >
                채팅하기
              </button>
              <button
                onClick={() => {
                  cartFunction();
                }}
              >
                장바구니
              </button>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
}

export default OnSaleDetail;
