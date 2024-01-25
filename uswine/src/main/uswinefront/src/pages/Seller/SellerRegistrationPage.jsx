import { jwtDecode } from "jwt-decode";
import "../../css/seller/SellerRegistrationPage.css";
import { useEffect, useState } from "react";
import { faL } from "@fortawesome/free-solid-svg-icons";
import AuthApi from "../../AuthApi";

function SellerRegistrationPage() {
  const token = localStorage.getItem("token");
  const userinfo = jwtDecode(token);

  let [authNum, setAuthNum] = useState("");
  let [inputAuthNum, setInputAuthNum] = useState("");
  let [authCheck, setAuthCheck] = useState(false);
  let [policyCheck, setPolicyCheck] = useState(false);

  let [userEmail, setUserEmail] = useState(userinfo.username);
  let [userPhone, setUserPhone] = useState("");
  let [userBank, setUserBank] = useState("KEB하나은행");
  let [userAccount, setUserAccount] = useState("");

  const banks = [
    "KEB하나은행",
    "SC제일은행",
    "국민은행",
    "신한은행",
    "외환은행",
    "우리은행",
    "한국시티은행",
    "경남은행",
    "광주은행",
    "대구은행",
    "부산은행",
    "전북은행",
    "제주은행",
    "기업은행",
    "농협은행",
    "수협은행",
    "카카오뱅크",
    "토스뱅크",
  ];

  // 인증번호 콘솔 확인
  useEffect(() => {
    console.log(authNum);
  }, [authNum]);

  function creditAuth() {
    const min = 1000;
    const max = 9999;
    setAuthNum(Math.floor(Math.random() * (max - min + 1)) + min);
    alert("인증번호가 발급되었습니다.");
  }

  function checkAuth() {
    if (inputAuthNum == authNum) {
      alert("인증되었습니다.");
      setAuthCheck(true);
      document.querySelector(".auth_check").classList.add("input_read_only");
    } else {
      alert("인증에 실패했습니다. 계좌번호를 다시 확인해주세요.");
    }
  }
  function checkPolicy() {
    policyCheck ? setPolicyCheck(false) : setPolicyCheck(true);
  }
  function sellerRegistHandler() {
    const date = new Date();
    if (
      userEmail != null &&
      userPhone.length == 11 &&
      userBank != null &&
      userAccount != null &&
      policyCheck == true &&
      authCheck == true
    ) {
      AuthApi("/api/mypage/seller/regist", {
        email: userEmail,
        phone: userPhone,
        bank: userBank,
        account: userAccount,
        policy: authCheck,
        registdate: date,
      }).then((data) => {
        if (data == 1) {
          alert("판매자 요청이 완료되었습니다. 승인을 기달려주세요.");
        } else {
          alert("판매자 승인 대기중인 아이디 입니다.");
        }
        window.history.back();
      });
    } else if (policyCheck == false) {
      alert("개인정보 수집에 동의 해주세요.");
    } else {
      alert("입력한 값을 다시 확인해주세요.");
    }
  }
  return (
    <div className="seller_container">
      <div className="seller_regist_container">
        <p style={{ fontSize: "20px", fontWeight: "900" }}>판매자 등록</p>
        <p style={{ color: "#888" }}>
          판매자 등록 결과는 1 ~ 2일 이내에 메일로 보내드립니다.
        </p>
        <hr />
        <ul className="seller_regist_info">
          <li className="seller_regist_list">
            <div className="seller_infos">
              <p className="seller_info">판매자 닉네임</p>
              <div className="seller_input">
                <input
                  type="text"
                  className="input_box input_read_only"
                  value={userinfo.nickname}
                  readOnly
                />
              </div>
            </div>
          </li>
          <li className="seller_regist_list">
            <div className="seller_infos">
              <p className="seller_info">판매자 이메일</p>
              <div className="seller_input">
                <input
                  type="text"
                  className="input_box"
                  value={userinfo.username}
                  placeholder="이메일을 입력해주세요."
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
            </div>
          </li>
          <li className="seller_regist_list">
            <div className="seller_infos">
              <p className="seller_info">판매자 연락처</p>
              <div className="seller_input">
                <input
                  type="text"
                  className="input_box"
                  placeholder="연락처를 입력해주세요( - 빼고 입력해주세요. )"
                  onChange={(e) => setUserPhone(e.target.value)}
                  maxLength={11}
                />
              </div>
            </div>
          </li>
          <li className="seller_regist_list">
            <div className="seller_infos">
              <p className="seller_info">입금 계좌번호</p>
              <div className="seller_input">
                <select
                  className="bank_select"
                  onChange={(e) => setUserBank(e.target.value)}
                >
                  {banks.map(function (bank, i) {
                    return (
                      <option
                        key={i}
                        value={bank}
                        className="bank_select_option"
                      >
                        {bank}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="text"
                  className="input_box"
                  placeholder="입금 받을 계좌번호를 입력해주세요( - 빼고 입력해주세요 )"
                  onChange={(e) => setUserAccount(e.target.value)}
                />
                <button className="bank_auth_btn" onClick={creditAuth}>
                  인증번호 발급
                </button>
              </div>
            </div>
          </li>
          <li className="seller_regist_list">
            <div className="seller_infos">
              <p className="seller_info">인증번호</p>
              <div className="seller_input">
                <input
                  type="number"
                  className="input_box auth_check"
                  placeholder="계좌번호로 입금된 번호를 입력해주세요"
                  onChange={(e) => setInputAuthNum(e.target.value)}
                  readOnly={authCheck}
                ></input>
                <button className="bank_auth_btn" onClick={checkAuth}>
                  확인
                </button>
              </div>
            </div>
          </li>
          <li>
            <div className="privacy_policy_container">
              <p>개인정보 수집 및 이용 안내</p>
              <p>
                판매자 권한 변경을 위해서 아래와 같은 개인정보를 수집 및 이용
                합니다.
              </p>
              <p>1. 개인정보 수집 목적 : 회원관리, 고지사항 전달, 고객상담</p>
              <p>2. 개인정보 수집 항목 : 이메일, 연락처, 계좌번호</p>
              <p>3. 보유 및 이용기간 : 판매자로 등록되어있는 동안</p>
              <p className="policy_check">
                위 개인정보 수집 및 이용을 확인합니다.
              </p>
              <p className="policy_check">
                확인{" "}
                <input
                  className="policy_check_btn"
                  type="checkbox"
                  onChange={checkPolicy}
                />
              </p>
            </div>
          </li>
        </ul>
        <div className="seller_regist_btn_container">
          <button onClick={sellerRegistHandler}>판매자 등록하기</button>
          <button onClick={() => window.history.back()}>취소하기</button>
        </div>
      </div>
    </div>
  );
}

export default SellerRegistrationPage;
