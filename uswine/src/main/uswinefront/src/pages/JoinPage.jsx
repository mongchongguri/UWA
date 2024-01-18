import { useState } from "react"
import axios from 'axios'
import '../css/join.css'
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
            const response = await axios.post('http://localhost:8080/api/join', {
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
        <div className="container my-3">
            <div>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>
                                <label>이메일 :</label>
                                <input type = "email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>비밀번호 :</label>
                                <input type = "password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>닉네임 :</label>
                                <input type="text" name="name" value={nickname} onChange={(e)=>setNickName(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>주소 :</label>
                                <input type="text" name="address" value={address} onChange={(e)=>setAddress(e.target.value)} />
                            </td>
                            <td>
                                <button onClick={openPostCode} >우편번호 검색</button>
                                <div id='popupDom'>
                                    {isPopupOpen && (
                                        <PopupPostCode setAddress={setAddress} onClose={closePostCode} />
                                    )}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>휴대전화</label>
                                <input type="number" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} 
                                placeholder="-를 빼고 입력해주세요" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type = "button" name="join" onClick={handleSubmit} value="submit" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
