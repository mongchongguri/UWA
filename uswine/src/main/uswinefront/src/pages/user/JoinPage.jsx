import { useState } from "react"
import { Button, Form } from "react-bootstrap";
import axios from 'axios'
import '../../css/join/join.css'
import PopupPostCode from "./Popup"

export default function JoinPage(){
    const [email,setEmail] = useState('')

    const [openEmailCheck,setOpenEmailCheck] = useState(false)
    const [emailCheck,setEmailCheck] = useState('')

    const [inputNum,setInputNum] = useState('')
    const [isEmailCheck,setIsEmailCheck] = useState('false')

    const [password,setPassword] = useState('')
    const [passwordCheck,setPasswordCheck] = useState('')
    const [nickname,setNickName] = useState('')
    const [postcode,setPostCode] = useState('')
    const [address,setAddress] = useState('')
    const [detailAddress,setDetailAddress] = useState('')

    const [frontResident,setFrontResident] = useState('')
    const [backResident,setBackResident] = useState('')

    const [residentCheck,setResidentCheck] = useState('false')
    const [phone,setPhone] = useState('')
    const year = new Date().getFullYear()

    function checkResident(){
        let age = parseInt(frontResident.slice(0,2), 10)
        if(age>=24){
            age+=1900
        }else{
            age+=2000
        }
        console.log(year-age)
        if(year-age>=18){
            alert("성인입니다")
            setResidentCheck('true')
        }else{
            alert("성인이 아닙니다")
            setResidentCheck('false')
        }
    }


    async function sendEmail(){
        try{
            const response = await axios.post('http://localhost:8080/api/user/sendEmail',{
                address:email
            })
            setOpenEmailCheck('true')
            setEmailCheck(response.data)
        }catch (error) {
            console.error('Error:', error);
        }
    }
    function checkNumber(num){
        if(num === emailCheck){
            setOpenEmailCheck('false')
            setIsEmailCheck('true')
        }else{
            alert('인증번호가 틀렸습니다 다시입력해주세요')
            sendEmail()
        }
    }

    async function handleSubmit() {
        
        
        const textAddress = postcode+" "+address+" "+detailAddress
        if(isEmailCheck === 'true'){
            if(residentCheck ==='true'){
                if(password === passwordCheck){
                    try {
                        const response = await axios.post('http://localhost:8080/api/user/join', {
                            email: email,
                            password: password,
                            nickname: nickname,
                            address: textAddress,
                            phone: phone
                        });
                        
                        console.log('Server response:', response.data);
                        if(response.data === "join successful"){
                            window.location.href='/LoginPage';
                        }else{
                            window.location.href='/JoinPage';
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }else{
                    alert("비밀번호가 일치하지 않습니다.")
                    document.getElementById('passwordCheck').focus();
                }
            }else{
                alert('주민등록번호 인증을 해주세요')
                document.getElementById('frontResident').focus();
            }
        }else{
            alert('이메일 인증을 해주세요.')
            document.getElementById('email').focus();
        }
    }
    return(
        <div id="joinBlock">
            <div>
                <div id="inputIdBlock">
                    <Form.Control
                        type="email"
                        id="inputJoinId"
                        name="email"
                        placeholder="이메일"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                        <div id="numCheckBlock">
                        {openEmailCheck && (
                            <div id="numInputButton">
                                <Form.Control
                                    type="text"
                                    id="numCheck"
                                    name="numCheck"
                                    placeholder="인증번호 입력"
                                    onChange={(e)=>setInputNum(e.target.value)}
                                />
                                <Button id="numCheckButton" variant="light" onClick={()=>checkNumber(inputNum)}>인증</Button>
                            </div>
                        )}
                            <Button id="checkEmailButton" variant="light" onClick={sendEmail} >
                                인증번호 발송
                            </Button>
                        </div>
                    
                </div>
                <div id="inputResidentBlock">
                    <div id="inputResident">
                        <Form.Control
                            type="text"
                            id="frontResident"
                            name="frontresident"
                            placeholder="주민등록번호 앞 6자리"
                            maxLength={6}
                            onChange={(e)=>{
                                const inputValue = e.target.value.slice(0,6)
                                setFrontResident(inputValue)
                            }}
                        />
                        -
                        <Form.Control
                            type="password"
                            id="backResident"
                            name="backresident"
                            value={backResident}
                            maxLength={1}
                            onChange={(e)=>{
                                const inputValue = e.target.value.slice(0,1)
                                setBackResident(inputValue)
                            }}
                        /><h6>● ● ● ● ● ●</h6>
                    </div>
                    <Button id="checkResidentButton" variant="light" onClick={checkResident} >
                        인증
                    </Button>
                </div>
                <div id="inputPasswordBlock">
                    <Form.Control
                        type="password"
                        id="inputJoinPassword"
                        name="password"
                        placeholder="패스워드"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div id="inputPasswordCheckBlock">
                    <Form.Control
                        type="password"
                        id="inputJoinPasswordCheck"
                        name="password"
                        placeholder="패스워드확인"
                        onChange={(e)=>setPasswordCheck(e.target.value)}
                    />
                </div>
                <div id="checkMessage">
                    {(password !== '' && passwordCheck !== '') ? (  // password와 passwordCheck가 빈 문자열이 아닌 경우에만 렌더링
                        password !== passwordCheck ? (
                        <h6 style={{ color: 'red' }}>비밀번호가 일치하지 않습니다</h6>
                        ) : (
                        <h6 style={{ color: 'green' }}>비밀번호가 일치합니다</h6>
                        )
                    ) : null}
                </div>

                <div id="inputNickNameBlock">
                    <Form.Control
                        type="text"
                        id="inputJoinNickName"
                        name="NickName"
                        placeholder="닉네임"
                        onChange={(e)=>setNickName(e.target.value)}
                    />
                </div>
                <div id="inputAddressBlock">
                    <div id ='postCodeBlock'>
                        <Form.Control
                            type="text"
                            id="postcode"
                            placeholder="우편번호"
                        />
                        <PopupPostCode setPostCode={setPostCode} setAddress={setAddress} />    
                    </div>
                    <Form.Control
                        type="text"
                        id="address"
                        placeholder="주소"
                    />
                    <Form.Control
                        type="text"
                        id="detailAddress"
                        placeholder="상세주소"
                        onChange={(e)=>setDetailAddress(e.target.value)}
                    />
                </div>
                <div id="inputPhoneBlock">
                    
                    <Form.Control
                        type="text"
                        id="inputJoinPhone"
                        name="Phone"
                        placeholder="휴대전화번호 - 빼고 넣어주세요"
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
