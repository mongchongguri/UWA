import {
  faArrowUp,
  faHeadset,
  faMessage,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../../../css/mypage/chatting.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import AuthApi from "../../../AuthApi";
import DateFormat from "../../../function/DateFormat";

function Chatting() {
  const token = localStorage.getItem("token") || "";
  if (token == "") {
    alert("로그인이 필요한 서비스 입니다.");
    window.history.back();
    return <></>;
  } else {
    const userinfo = jwtDecode(token);
    return <ChattingComponent userinfo={userinfo} />;
  }
}

function ChattingComponent({ userinfo }) {
  let navigate = useNavigate();
  let outNavigate = useNavigate();
  let { seller, item } = useParams();
  let { id } = useParams(); //roomId

  let [sellerinfo, setSellerInfo] = useState({});
  let [chatList, setChatList] = useState([]);

  let [room, setRoom] = useState(null);

  useEffect(() => {
    if (seller) {
      AuthApi("/api/onsale/email", {
        nickname: seller,
      }).then((data) => {
        setSellerInfo({
          sellername: data,
          sellernickname: seller,
          sellitem: item,
        });
      });
    }

    if (id != null) {
      setRoom(id);
    } else {
      setRoom(null);
    }
  }, [navigate]);

  useEffect(() => {
    AuthApi("/api/chatting/chatlist", {
      email: userinfo.username,
    }).then((data) => {
      setChatList(data);
    });
  }, [navigate]);

  function outRoom(id) {
    const outChat = window.confirm("채팅방을 나가시겠습니까?");

    if (outChat) {
      AuthApi("/api/chatting/outroom", {
        room: id,
        email: userinfo.username,
      }).then((data) => {
        if (data == 1) {
          outNavigate("/");
        }
      });
    }
  }
  return (
    <div className="chat_room">
      <div className="chat_room_list">
        <ul className="chat_room_list_ul">
          {chatList.length != 0
            ? chatList.map(function (chat, i) {
                return (
                  <li
                    key={i}
                    className={
                      window.location.pathname == `/mypage/chat/room/${chat.id}`
                        ? "join_chat_room"
                        : null
                    }
                  >
                    <div
                      className="seller_chatting"
                      onClick={() => {
                        navigate(`/mypage/chat/room/${chat.id}`);
                      }}
                    >
                      {userinfo.username == chat.userEmail
                        ? chat.sellerEmail == "admin@admin"
                          ? "관리자와의 채팅"
                          : `판매자 ${chat.sellerNickname} 과의 채팅`
                        : `구매자 ${chat.userNickname} 과의 채팅`}
                    </div>
                    <div className="chatting_remove">
                      <button
                        onClick={() => {
                          outRoom(chat.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                      </button>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
      {room != null ? (
        <ChattingRoom room={room} userinfo={userinfo} sellerinfo={sellerinfo} />
      ) : (
        <NotInRoom
          userinfo={userinfo}
          sellerinfo={sellerinfo}
          setSellerInfo={setSellerInfo}
        />
      )}
    </div>
  );
}
function NotInRoom({ userinfo, sellerinfo, setSellerInfo }) {
  let navigate = useNavigate();
  let [message, setMessage] = useState();
  let [inquiry, setInquiry] = useState(false);

  useEffect(() => {
    AuthApi("/api/chatting/create", {
      userEmail: userinfo.username,
      userNickname: userinfo.nickname,
      sellerEmail: sellerinfo.sellername,
      sellerNickname: sellerinfo.sellernickname,
      sellItemId: sellerinfo.sellitem,
    }).then((data) => {
      if (data.id != undefined) {
        navigate(`/mypage/chat/room/${data.id}`);
      }
    });
  }, [sellerinfo]);

  function inquiryHandler() {
    const inquiryMessage = window.confirm(
      "상담을 위해 새로운 채팅방을 개설합니다."
    );

    if (inquiryMessage) {
      setSellerInfo({
        sellername: "admin@admin",
        sellernickname: "hongildong",
        sellitem: "0",
      });
    }
  }
  return (
    <div className="chatting_container">
      <div className="chatting_box not_room">
        <p>
          <FontAwesomeIcon icon={faMessage} size="3x" color="#888" />
        </p>
        <p>선택된 채팅방이 없습니다.</p>
        <div className="amdin_chat_contaeinr" onClick={() => inquiryHandler()}>
          <button className="admin_chat">
            <FontAwesomeIcon icon={faHeadset} size="xl" color="#fff" />
          </button>
          <p>문의하기</p>
        </div>
      </div>
    </div>
  );
}
function ChattingRoom({ room, userinfo, sellerinfo }) {
  let navigate = useNavigate();
  let [message, setMessage] = useState();
  let [messages, setMessages] = useState([]);
  let [stompClient, setStompClient] = useState(null);

  console.log(messages);
  useEffect(() => {
    console.log(room);
    AuthApi("/api/chatting/getchat", {
      room: room,
    }).then((data) => {
      console.log(data);
      setMessages(data);
    });
  }, [room]);

  useEffect(() => {
    setMessages([]);

    if (room != null) {
      const socket = new SockJS("http://localhost:8080/ws");
      const client = Stomp.over(socket);
      const headers = {
        Authorization: localStorage.getItem("token"),
      };

      client.connect({}, () => {
        client.subscribe(`/queue/messages/${room}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      });

      setStompClient(client);

      return () => {
        if (client.connected) {
          client.disconnect();
        }
      };
    }
  }, [room, navigate]);

  function meesageHandler() {
    if (message.trim() && stompClient) {
      const date = new Date();
      const chatMessage = {
        nickname: userinfo.nickname,
        email: userinfo.username,
        roomId: room,
        content: message,
        timestamp: date,
      };

      stompClient.send(`/app/chat/${room}`, {}, JSON.stringify(chatMessage));
      setMessage("");
    }
  }

  return (
    <div className="chatting_container">
      <div className="chatting_box">
        {messages.length != 0
          ? messages.map(function (message, i) {
              console.log(message);
              if (userinfo.username == message.email) {
                return (
                  <div className="me_chat_container" key={i}>
                    <ul>
                      <li>You</li>
                      <li>{message.content}</li>
                      <li>{DateFormat(message.timestamp)}</li>
                    </ul>
                  </div>
                );
              } else {
                return (
                  <div className="you_chat_container" key={i}>
                    <ul>
                      <li>{message.nickName}</li>
                      <li>{message.content}</li>
                      <li>{DateFormat(message.timestamp)}</li>
                    </ul>
                  </div>
                );
              }
            })
          : null}
      </div>
      <div className="input_chat_container">
        <div className="chat_input_box">
          <input
            className="input_chat"
            type="text"
            placeholder="Input Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="chat_submit"
            onClick={() => {
              meesageHandler();
            }}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatting;
