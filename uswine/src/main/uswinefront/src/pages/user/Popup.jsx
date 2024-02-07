 import { useEffect } from "react";
 import { Button } from "react-bootstrap";
export default function PopupPostCode({setPostCode,setAddress}) {
  useEffect(() => {
    // 다음 우편번호 서비스 라이브러리 로드
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // 다음 우편번호 서비스 라이브러리 로드 후 실행되어야 할 코드
      if (window.daum && window.daum.Postcode) {
        console.log('다음 우편번호 서비스 라이브러리가 로드되었습니다.');
      } else {
        console.error('다음 우편번호 서비스 라이브러리가 로드되지 않았습니다.');
      }
    };

    return () => {
      // 컴포넌트 언마운트 시에 스크립트 제거
      document.head.removeChild(script);
    };
  }, []);

    const execDaumPostcode = () => {
      new window.daum.Postcode({
        oncomplete: function (data) {
          var addr = ''; // 주소 변수
          if (data.userSelectedType === 'R') {
            addr = data.roadAddress;
          } else {
            addr = data.jibunAddress;
          }
          setPostCode(data.zonecode);
          setAddress(addr);
          document.getElementById('postcode').value=data.zonecode
          document.getElementById('address').value=addr
        },
      }).open();
      
    };
  
    return (
      <>
        <Button id="openPopup" type="button" onClick={execDaumPostcode}
        variant="light">우편번호 찾기</Button><br />
      </>
    );
}
