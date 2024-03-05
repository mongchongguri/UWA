import React, { useState } from "react";
import "../../css/login/login.css";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const navigate = useNavigate();

  const data = new URLSearchParams();
  data.append("username", email);
  data.append("password", pw);

  const onChangeId = (e) => {
    setEmail(e.target.value);
  };

  const onChangePw = (e) => {
    setPw(e.target.value);
  };

  const authenticate = () => {
    axios
      .post("http://localhost:8080/login", data)
      .then((res) => {
        const token = res.headers["authorization"];
        localStorage.setItem("token", token);
        const authData = jwtDecode(token);
        const role = authData["role"];

        console.log(role);

        if (role === "ROLE_ADMIN") {
          navigate("/admin/chart");
        } else {
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div id="loginBlock">
      <div>
        <div id="inputIdBlock">
          <Form.Control
            type="email"
            id="inputLoginId"
            name="email"
            onChange={onChangeId}
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <div id="inputPasswordBlock">
          <Form.Control
            type="password"
            id="inputLoginPassword"
            name="password"
            onChange={onChangePw}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <div id="loginAndJoinBtnBlock">
          <div id="loginBtnBlock">
            <Button variant="light" type="submit" onClick={authenticate}>
              로그인
            </Button>
          </div>
          <div id="joinBtnBlock">
            <Button variant="light">회원가입</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
