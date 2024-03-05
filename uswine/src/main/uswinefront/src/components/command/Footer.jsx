import React from 'react';
import '../../css/footer.css';
import logo_footer from '../../css/imgs/logo_footer.png';

const Footer = () => {
    return (
        <footer>
            <div className="logo">
                <img src={logo_footer} />
            </div>
            <div className="copyRight">ⓒ 2024. UWA. All right reserved.</div>
            <div style={{ fontSize: '15px', color: '#ccc' }}>
                ※ 본 사이트는 상업적 목적이 아닌 포트폴리오 사이트로 제작되었습니다.
            </div>
        </footer>
    );
};

export default Footer;
