import { useState } from "react"
import axios from 'axios'
import '../css/join.css'
import PopupPostCode from "./Popup"

export default function JoinPage(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [address,setAddress] = useState('')
    const [phone_number,setPhone_Number] = useState('')
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    function openPostCode(){
        setIsPopupOpen(true)
    }

    function closePostCode(){
        setIsPopupOpen(false)
    }

    async function handleSubmit() {
        setPhone_Number(phone_number.replace(/\D/g, ''))
        if(phone_number === 10 || phone_number ===11){
            setPhone_Number(phone_number.replace(/(\d{3})(\d{3,4})(\d{3,4})/, '$1-$2-$3'))
        }
    
        try {
            const response = await axios.post('http://localhost:8080/api/join', {
                email: email,
                password: password,
                name: name,
                address: address,
                phone_number: phone_number
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
                                <label>이름 :</label>
                                <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
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
                                <label>전화번호 :</label>
                                <input type="number" name="phone_number" value={phone_number} onChange={(e)=>setPhone_Number(e.target.value)} 
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
