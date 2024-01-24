import React, { useState } from "react";
import "../css/login/login.css";
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

  // const authenticate = () => {
  //   axios
  //     .post("http://localhost:8080/login", data)
  //     .then((res) => {
  //       localStorage.setItem("token", res.headers["authorization"]);
  //       const tokeninfo = jwtDecode(res.headers["authorization"]);
  //       if (tokeninfo["role"] === "ROLE_ADMIN") {
  //         navigate("/admin", { state: tokeninfo });
  //       } else if (tokeninfo["role"] === "ROLE_USER") {
  //         navigate("/", { state: tokeninfo });
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // };

  const authenticate = () => {
    axios
      .post("http://localhost:8080/login", data)
      .then((res) => {
        localStorage.setItem("token", res.headers["authorization"]);
        console.log("/login:", localStorage.getItem("token"));
        // console.log("localStorage token:", localStorage.getItem("token"));
        const authData = jwtDecode(res.headers["authorization"]);
        const role = authData["role"];

        if (role === "ROLE_ADMIN") {
          navigate("/admin");
        } else if (role === "ROLE_USER") {
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div id="loginBlock">
      <h1>로그인</h1>
      <div>
        <div id="inputIdBlock">
          <Form.Label htmlFor="inputLoginId">아이디</Form.Label>
          <Form.Control
            type="email"
            id="inputLoginId"
            name="email"
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
          <Button variant="light" type="submit" onClick={authenticate}>
            로그인
          </Button>
          <Button variant="light">회원가입</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
