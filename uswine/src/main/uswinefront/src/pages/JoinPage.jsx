import { useState } from "react"
import { Button, Form } from "react-bootstrap";
import axios from 'axios'
import '../css/join/join.css'
import PopupPostCode from "./Popup"

export default function JoinPage(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [nickname,setNickName] = useState('')
    const [address,setAddress] = useState('')
    const [phone,setPhone] = useState('')
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    function openPostCode(){
        setIsPopupOpen(true)
    }

    function closePostCode(){
        setIsPopupOpen(false)
    }

    async function handleSubmit() {
        setPhone(phone.replace(/\D/g, ''))
        if(phone === 10 || phone ===11){
            setPhone(phone.replace(/(\d{3})(\d{3,4})(\d{3,4})/, '$1-$2-$3'))
        }
    
        try {
            const response = await axios.post('http://localhost:8080/api/user/join', {
                email: email,
                password: password,
                nickname: nickname,
                address: address,
                phone: phone
            });
    
            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return(
        <div id="joinBlock">
            <h1>회원가입</h1>
            <div>
                <div id="inputIdBlock">
                    <Form.Label htmlFor="inputJoinId">이메일</Form.Label>
                    <Form.Control
                        type="email"
                        id="inputJoinId"
                        name="email"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div id="inputPasswordBlock">
                    <Form.Label htmlFor="inputJoinPassword">비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputJoinPassword"
                        name="password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div id="inputNickNameBlock">
                    <Form.Label htmlFor="inputJoinNickName">닉네임 :</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputJoinNickName"
                        name="NickName"
                        onChange={(e)=>setNickName(e.target.value)}
                    />
                </div>
                <div id="inputAddressBlock">
                    <Form.Label htmlFor="inputJoinAdress">주소 :</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputJoinAddress"
                        name="Address"
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                    />
                    <div id="FindAddressBtnBlock">
                        <Button variant="light" onClick={openPostCode} >
                            우편번호 검색
                        </Button>
                        <div id='popupDom'>
                            {isPopupOpen && (
                                <PopupPostCode setAddress={setAddress} onClose={closePostCode} />
                            )}
                        </div>
                    </div>
                </div>
                <div id="inputPhoneBlock">
                    <Form.Label htmlFor="inputJoinPhone">휴대전화</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputJoinPhone"
                        name="Phone"
                        onChange={(e)=>setPhone(e.target.value)}
                    />
                </div>
                <div id="JoinBtnBlock">
                    <Button variant="light" name="join" onClick={handleSubmit} >
                        회원가입
                    </Button>
                </div>
            </div>
        </div>
    )
}
