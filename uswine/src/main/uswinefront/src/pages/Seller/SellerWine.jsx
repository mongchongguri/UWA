import { jwtDecode } from "jwt-decode";
import "../../css/seller/SellerWine.css";
import { useState } from "react";
import PopupPostCode from "../user/Popup";
import AuthApi from "../../AuthApi";
import AwsUpload from "../../function/AWSs3";

function SellerWine() {
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
      return <SellerWineComponent userinfo={userinfo} />;
    }
  }
}

function SellerWineComponent({ userinfo }) {
  let [phoneNumber, setPhoneNumber] = useState("");
  let [sellerInfo, setSellerInfo] = useState("");
  let [sellMoney, setSellMoney] = useState("");
  let [sellStock, setSellStock] = useState(0);
  let [postcode, setPostCode] = useState("");
  let [address, setAddress] = useState("");
  let [detailAddress, setDetailAddress] = useState("");

  let [wineType, setWineType] = useState("");
  let [wineImage, setWineImage] = useState("");
  let [wineName, setWineName] = useState("");
  let [wineNameEn, setWineNameEn] = useState("");
  let [wineInfo, setWineInfo] = useState("");
  let [addInfo, setAddInfo] = useState("");

  // 당도,산도,바디,타닌
  let [sugar, setSugar] = useState(0);
  let [acidity, setAcidity] = useState(0);
  let [body, setBody] = useState(0);
  let [tannine, setTannine] = useState(0);

  let [aroma, setAroma] = useState("");
  let [region, setRegion] = useState("");
  let [alcohol, setAlcohol] = useState("");
  let [wineMaker, setWineMaker] = useState("");
  let [wineVarieties, setWineVarieties] = useState("");
  let [wineStyle, setWineStyle] = useState("");
  let [winebrewing, setWineBrewing] = useState("");
  let [wineTemp, setWineTemp] = useState("");
  let [wineIncome, setWineIncome] = useState("");

  async function salesRegistration() {
    if (
      phoneNumber.length == 11 &&
      sellMoney != "" &&
      postcode != "" &&
      address != "" &&
      wineType != "" &&
      wineImage != "" &&
      wineName != "" &&
      wineInfo != "" &&
      aroma != "" &&
      region != "" &&
      alcohol != ""
    ) {
      const btn = document.querySelector(".wine_sell_btn");
      btn.innerHTML = "등록중";
      btn.classList.add("wine_sell_loading");
      btn.disabled = true;

      try {
        const aromaStr = aroma;
        const aromaList = aromaStr.split("/");
        const upload = AwsUpload("sell", wineImage);
        const IMG_URL = await upload.promise().then((res) => res.Location);
        await AuthApi("/api/seller/wine/upload", {
          nickName: userinfo.nickname,
          email: userinfo.username,
          phone: phoneNumber,
          sellerInfo: sellerInfo,
          sellMoney: sellMoney,
          postCode: postcode,
          address: address + " " + detailAddress,
          wineType: wineType,
          wineImageURL: IMG_URL,
          wineName: wineName,
          wineNameEn: wineNameEn,
          wineInfo: wineInfo,
          addInfo: addInfo,
          wineTaste: [
            ["당도", sugar],
            ["산도", acidity],
            ["바디", body],
            ["타닌", tannine],
          ],
          wineAroma: aromaList,
          wineRegion: region,
          alcohol: alcohol,
          wineMaker: wineMaker,
          wineVarieties: wineVarieties,
          wineStyle: wineStyle,
          wineBrewing: winebrewing,
          wineTemp: wineTemp,
          wineIncome: wineIncome,
        }).then((data) => {
          const date = new Date();
          AuthApi("/api/seller/wine/idsave", {
            nickname: userinfo.nickname,
            email: userinfo.username,
            wineName: wineName,
            wineNameEn: wineNameEn,
            wineImageURL: IMG_URL,
            sellMoney: sellMoney,
            stock: sellStock,
            wineType: wineType,
            wineRegion: region,
            mongoId: data,
            selldate: date,
          }).then((data) => {
            console.log(data);
            if (data == 1) {
              alert("와인 판매 등록이 완료되었습니다.");
              window.history.back();
            } else {
              alert("판매 등록에 실패했습니다. 잠시후에 다시 시도해보세요.");
              btn.innerHTML = "와인 판매 등록하기";
              btn.classList.remove("wine_sell_loading");
              btn.disabled = false;
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("필수 항목을 입력해주세요.");
    }
  }
  return (
    <div className="seller_container">
      <div className="seller_wine_container">
        <p style={{ fontSize: "20px", fontWeight: "900" }}>와인 판매 등록</p>
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
              <p className="sell_info">판매자 소개</p>
              <div className="sell_info_input">
                <input
                  type="text"
                  placeholder="추가적인 소개가 있다면 입력해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setSellerInfo(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">
                와인 대표 사진
                <span className="sell_essential">
                  (<span className="sell_essential_star">*</span>)
                </span>
              </p>
              <div className="sell_info_input">
                <input
                  type="file"
                  id="sell_wine_image"
                  className="sell_wine_name"
                  accept="image/*"
                  onChange={(e) => setWineImage(e.target.files[0])}
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
                와인 종류
                <span className="sell_essential">
                  (<span className="sell_essential_star">*</span>)
                </span>
              </p>
              <div className="sell_info_input">
                <input
                  type="text"
                  placeholder="판매할 와인의 종류를 입력해주세요. ( ex. 레드 )"
                  className="sell_wine_name"
                  onChange={(e) => {
                    setWineType(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">
                와인 이름
                <span className="sell_essential">
                  (<span className="sell_essential_star">*</span>)
                </span>
              </p>
              <div className="sell_info_input">
                <input
                  type="text"
                  placeholder="판매할 와인의 이름을 입력해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setWineName(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">와인 영문 이름</p>
              <div className="sell_info_input">
                <input
                  type="text"
                  placeholder="판매할 와인의 영문 이름을 입력해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setWineNameEn(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">
                와인 설명
                <span className="sell_essential">
                  (<span className="sell_essential_star">*</span>)
                </span>
              </p>
              <div className="sell_info_input">
                <input
                  type="text"
                  placeholder="판매할 와인의 설명을 입력해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setWineInfo(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">추가 설명</p>
              <div className="sell_info_input">
                <input
                  type="text"
                  placeholder="판매할 와인의 추가적인 설명이 있다면 입력해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setAddInfo(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">
                와인 정보
                <span className="sell_essential">
                  (<span className="sell_essential_star">*</span>)
                </span>
              </p>
              <div className="sell_info_input">
                <div className="sell_wine_infos">
                  <div className="sell_wine_info">
                    <span>당도</span>
                    <select
                      className="wine_info_select"
                      onChange={(e) => setSugar(e.target.value)}
                    >
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                  <div className="sell_wine_info">
                    <span>산도</span>
                    <select
                      className="wine_info_select"
                      onChange={(e) => {
                        setAcidity(e.target.value);
                      }}
                    >
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                  <div className="sell_wine_info">
                    <span>바디</span>
                    <select
                      className="wine_info_select"
                      onChange={(e) => {
                        setBody(e.target.value);
                      }}
                    >
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                  <div className="sell_wine_info">
                    <span>타닌</span>
                    <select
                      className="wine_info_select"
                      onChange={(e) => {
                        setTannine(e.target.value);
                      }}
                    >
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>
                <div className="wine_info_rule">
                  <p>단맛의 정도</p>
                  <p>신맛의 정도</p>
                  <p>걸쭉함의 정도</p>
                  <p>떫은맛의 정도</p>
                </div>
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">
                와인 아로마
                <span className="sell_essential">
                  (<span className="sell_essential_star">*</span>)
                </span>
              </p>
              <div className="sell_info_input">
                <input
                  type="text"
                  placeholder="각 아로마를 ( / )로 구분해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setAroma(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">
                와인 생산지역
                <span className="sell_essential">
                  (<span className="sell_essential_star">*</span>)
                </span>
              </p>
              <div className="sell_info_input">
                <input
                  type="text"
                  placeholder="와인의 생산지역을 입력해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setRegion(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">
                와인 알코올
                <span className="sell_essential">
                  (<span className="sell_essential_star">*</span>)
                </span>
              </p>
              <div className="sell_info_input">
                <input
                  type="number"
                  placeholder="와인의 알코올 도수를 입력해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setAlcohol(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">와인 생산자</p>
              <div className="sell_info_input">
                <input
                  type="text"
                  placeholder="와인을 생산한 사람의 정보를 입력해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setWineMaker(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>

          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">와인 주요품종</p>
              <div className="sell_info_input">
                <input
                  type="text"
                  placeholder="와인의 주요품종을 입력해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setWineVarieties(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">와인 스타일</p>
              <div className="sell_info_input">
                <input
                  type="text"
                  placeholder="와인의 스타일을 입력해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setWineStyle(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">와인 양조</p>
              <div className="sell_info_input">
                <input
                  type="text"
                  placeholder="와인의 양조과정을 입력해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setWineBrewing(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">와인 음용온도</p>
              <div className="sell_info_input">
                <input
                  type="number"
                  placeholder="와인의 음양온도 입력해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setWineTemp(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          <li className="sell_infos_container">
            <div className="sell_info_container">
              <p className="sell_info">와인 수입사</p>
              <div className="sell_info_input">
                <input
                  type="text"
                  placeholder="와인의 수입사를 입력해주세요."
                  className="sell_wine_name"
                  onChange={(e) => {
                    setWineIncome(e.target.value);
                  }}
                />
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

export default SellerWine;
