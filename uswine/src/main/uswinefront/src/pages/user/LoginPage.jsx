import React, { useState } from "react";
import "../../css/login/login.css";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const LoginPage = () => {
  const [authority, setAuthority] = useState({});
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onChangeAuthority = (e) => {
    setAuthority(e.target.value);
  };

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePw = (e) => {
    setPw(e.target.value);
  };

  const loginSubmitBtn = () => {
    axios
      .post("/api/user/login", {
        authority: authority,
        id: id,
        password: pw,
      })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  return (
    <div id="loginBlock">
      <h1>로그인</h1>
      <div>
        <div id="authority">
          <div>
            <input
              type="radio"
              value="personal"
              name="authority"
              onChange={onChangeAuthority}
            />
            <label>일반회원</label>
          </div>
          <div>
            <input
              type="radio"
              value="company"
              name="authority"
              onChange={onChangeAuthority}
            />
            <label>기업회원</label>
          </div>
        </div>
        <div id="inputIdBlock">
          <Form.Label htmlFor="inputLoginId">아이디</Form.Label>
          <Form.Control
            type="email"
            id="inputLoginId"
            name="id"
            onChange={onChangeId}
          />
        </div>
        <br />
        <div id="inputPasswordBlock">
          <Form.Label htmlFor="inputLoginPassword">비밀번호</Form.Label>
          <Form.Control
            type="password"
            id="inputLoginPassword"
            name="password"
            onChange={onChangePw}
          />
        </div>
        <div id="loginAndJoinBtnBlock">
          <Button variant="light" type="submit" onClick={loginSubmitBtn}>
            로그인
          </Button>
          <Button variant="light">회원가입</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
