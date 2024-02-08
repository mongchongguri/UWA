import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthApi from "../../../AuthApi"
import "../../../css/admin/AdminChat.css"
import {
  faArrowUp,
  faMessage,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DateFormat from "../../../function/DateFormat";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
export default function AdminChat(){
    const token = localStorage.getItem("token") || "";
    if (token === "") {
      return <></>;
    } else {
      const userinfo = jwtDecode(token);
      if(userinfo.role === "ROLE_ADMIN") {
        return <AdminChatComponent userinfo={userinfo} />;
      } else {
        return <></>
      }
      
    }
}
function AdminChatComponent({userinfo}){
  let navigate = useNavigate();
  let outNavigate = useNavigate();

  let { id } = useParams();

  let [chatList, setChatList] = useState([]);
  let [newChat,setNewChat] = useState([]);
  let [admininfo, setAdminInfo] = useState({});

  let [room, setRoom] = useState(null);
  let email = userinfo.username
  useEffect(() => {
    AuthApi("/api/adminChat/chatList", {
      email
    }).then((data) => {
      console.log(data)
      setChatList(data.chatList);
      setNewChat(data.new_chat_list);
    });
    if (id != null) {
      setRoom(id);
    } else {
      setRoom(null);
    }
    setAdminInfo({
      adminname: "admin@admin",
      adminnickname: "hongildong",
    })
  }, [navigate]);
  function outRoom(id) {
    const outChat = window.confirm("채팅방을 나가시겠습니까?");

    if (outChat) {
      AuthApi("/api/chatting/outroom", {
        room: id,
        email: userinfo.username,
      }).then((data) => {
        if (data == 1) {
          outNavigate("/admin/adminChat");
        }
      });
    }
  }
  return(
    <div className="admin_chat_List_container">
      <div id="admin_chat_title">
          <h1>문의사항</h1>
      </div>
      <div className="admin_chat_room">
        <div className="admin_chat_room_list">
          <ul className="admin_chat_room_list_ul">
            {chatList.length != 0
              ? chatList.map(function (chat, i) {
                  return (
                    <li
                      key={i}
                      className={
                        window.location.pathname == `/admin/adminChat/room/${chat.id}`
                          ? "admin_join_chat_room"
                          : null
                      }
                    >
                      <div
                        className="admin_seller_chatting"
                        onClick={() => {
                          navigate(`/admin/adminChat/room/${chat.id}`);
                        }}
                      >
                        <div className={
                          newChat[i]!=""
                          ?"newChat"
                          :null
                        }>
                          {newChat[i] != "" ? "new!" : null}
                        </div>
                        {" "}{chat.userNickname} 님의 문의
                      </div>
                      <div className="admin_chatting_remove">
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
          <ChattingRoom room={room} userinfo={userinfo} admininfo={admininfo} />
        ) : (
          <NotInRoom userinfo={userinfo} admininfo={admininfo} />
        )}
      </div>
    </div>
  )
}
function NotInRoom() {

  return (
    <div className="admin_chatting_container">
      <div className="admin_chatting_box admin_not_room">
        <p>
          <FontAwesomeIcon icon={faMessage} size="3x" color="#888" />
        </p>
        <p>선택된 채팅방이 없습니다.</p>
      </div>
    </div>
  );
}
function ChattingRoom({ room, userinfo }) {
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
    <div className="admin_chatting_container">
      <div className="admin_chatting_box">
        {messages.length != 0
          ? messages.map(function (message, i) {
              if (userinfo.username == message.email) {
                return (
                  <div className="admin_me_chat_container" key={i}>
                    <ul>
                      <li>You</li>
                      <li>{message.content}</li>
                      <li>{DateFormat(message.timestamp)}</li>
                    </ul>
                  </div>
                );
              } else {
                return (
                  <div className="admin_you_chat_container" key={i}>
                    <ul>
                      <li>{message.nickname}</li>
                      <li>{message.content}</li>
                      <li>{DateFormat(message.timestamp)}</li>
                    </ul>
                  </div>
                );
              }
            })
          : null}
      </div>
      <div className="admin_input_chat_container">
        <div className="admin_input_box">
          <input
            className="admin_input_chat"
            type="text"
            placeholder="Input Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="admin_chat_submit"
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