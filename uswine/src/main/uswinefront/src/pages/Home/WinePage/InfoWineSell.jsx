import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthApi from "../../../AuthApi";
import PopupPostCode from "../../user/Popup";
import "../../../css/seller/SellerWine.css";
import "../../../css/home/InfoWineSell.css";

function InfoWineSell() {
  const token = localStorage.getItem("token") || "";
  if (token == "") {
    alert("로그인이 필요한 서비스 입니다.");
    window.history.back();
    return <></>;
  } else {
    const userinfo = jwtDecode(token);
    if (userinfo.role == "ROLE_SELLER") {
      return <InfoWineSellComponent userinfo={userinfo} />;
    } else {
      alert("권한이 존재하지 않습니다.");
      window.history.back();
    }
  }
}

function InfoWineSellComponent({ userinfo }) {
  let { id } = useParams();

  let [wineDetail, setWineDetail] = useState([]);

  let [phoneNumber, setPhoneNumber] = useState("");
  let [sellMoney, setSellMoney] = useState("");
  let [sellStock, setSellStock] = useState("");
  let [postcode, setPostCode] = useState("");
  let [address, setAddress] = useState("");
  let [detailAddress, setDetailAddress] = useState("");
  let [delivery, setDelivery] = useState(null);

  useEffect(() => {
    AuthApi("/api/wine/idx", {
      Id: id,
    }).then((data) => {
      setWineDetail(data);
    });
  }, []);

  function salesRegistration() {
    if (
      phoneNumber.length == 11 &&
      sellMoney != "" &&
      sellStock != "" &&
      postcode != "" &&
      address != "" &&
      delivery != null
    ) {
      const date = new Date();
      AuthApi("/api/seller/info/sell", {
        email: userinfo.username,
        nickname: userinfo.nickname,
        itemId: id,
        phone: phoneNumber,
        sellMoney: sellMoney,
        sellStock: sellStock,
        address: postcode + address,
        detailAddress: detailAddress,
        delivery: delivery,
        sellDate: date,
      }).then((data) => {
        if (data == 1) {
          alert("판매 등록이 완료되었습니다.");
          window.history.back();
        }
      });
    } else {
      alert("필수 항목을 모두 입력해주세요.");
    }
  }

  return (
    <div className="seller_container">
      <div className="seller_wine_container">
        <p style={{ fontSize: "20px", fontWeight: "900" }}>와인 판매 등록</p>
        <p style={{ fontSize: "18px" }}>
          상품명 : {wineDetail.wine_name} ( {wineDetail.wine_name_en} )
        </p>
        <p style={{ color: "#888" }}>
          (<span className="sell_essential_star">*</span>) 항목은 필수로
          입력해주세요.
        </p>
        <hr />
        <ul>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">
                판매자 닉네임
                <span className="sell_essential">
                  (<span className="sell_essential_star">*</span>)
                </span>
              </p>
              <div className="sell_info_input">
                <input
                  type="text"
                  value={userinfo.nickname}
                  className="sell_wine_name input_read_only"
                  readOnly={true}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">
                판매자 연락처
                <span className="sell_essential">
                  (<span className="sell_essential_star">*</span>)
                </span>
              </p>
              <div className="sell_info_input">
                <input
                  type="text"
                  placeholder="연락처를 입력해주세요."
                  maxLength={11}
                  className="sell_wine_name"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">
                와인 판매 금액
                <span className="sell_essential">
                  (<span className="sell_essential_star">*</span>)
                </span>
              </p>
              <div className="sell_info_input">
                <input
                  type="number"
                  placeholder="판매할 와인의 금액을 입력해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setSellMoney(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">
                와인 판매 재고
                <span className="sell_essential">
                  (<span className="sell_essential_star">*</span>)
                </span>
              </p>
              <div className="sell_info_input">
                <input
                  type="number"
                  placeholder="판매할 와인의 재고 개수를 입력해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setSellStock(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">
                와인 판매 장소
                <span className="sell_essential">
                  (<span className="sell_essential_star">*</span>)
                </span>
              </p>
              <div className="sell_info_input">
                <div>
                  <input
                    type="text"
                    id="postcode"
                    className="sell_postcode input_read_only"
                    onChange={(e) => {
                      setPostCode(e.target.value);
                    }}
                    // readOnly={true}
                  />
                  <PopupPostCode
                    setPostCode={setPostCode}
                    setAddress={setAddress}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="address"
                    className="sell_address input_read_only"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    // readOnly={true}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="sell_detail_address"
                    placeholder="상세주소를 입력해주세요."
                    onChange={(e) => {
                      setDetailAddress(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">
                배달 가능 여부
                <span className="sell_essential">
                  (<span className="sell_essential_star">*</span>)
                </span>
              </p>
              <div className="sell_info_input">
                <div className="delivery_select_container">
                  <label>
                    <input
                      type="radio"
                      value="true"
                      checked={delivery == true}
                      onChange={() => setDelivery(true)}
                    />
                    가능
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="true"
                      checked={delivery == false}
                      onChange={() => setDelivery(false)}
                    />
                    불가능
                  </label>
                </div>
              </div>
            </div>
          </li>
          <li className="wine_sell_btn_container">
            <button
              className="wine_sell_btn"
              onClick={() => {
                salesRegistration();
              }}
            >
              와인 판매 등록하기
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default InfoWineSell;
