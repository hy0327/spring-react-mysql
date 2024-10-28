import React from 'react'
import './style.css';

//              component: 푸터 레이아웃            //
export default function Footer() {

    //          event handler: 인스타 아이콘 버튼 클릭 이벤트 처리          //
    const onInstaIconButtonClickHandler = () => {
        window.open('https://www.instagram.com');
    };

    const onNaverBlogIconClickHandler = () => {
        window.open('https://blog.naver.com');
    };

    const onTistoryIconClickHandler = () => {
        window.open('https://www.tistory.com');
    };
    //          event handler: 네이버 아이콘 버튼 클릭 이벤트 처리          //


    //              render: 푸터 레이아웃 렌더링        //    
  return (
    <div id='footer'>
        <div className='footer-container'>
            <div className='footer-top'>
                <div className='footer-logo-box'>
                    <div className='icon-box'>
                        <div className='icon logo-light-icon'></div>
                    </div>
                    <div className='footer-logo-text'>{'나의 이야기'}</div>
                </div>
                <div className='footer-link-box'>
                    <div className='footer-email-link'>{'hy_0327@naver.com'}</div>
                    <div className='icon-button' onClick={onInstaIconButtonClickHandler}>
                        <div className='icon insta-icon'></div>
                    </div>
                    <div className='icon-button' onClick={onNaverBlogIconClickHandler}>
                        <div className='icon naverblog-icon'></div>
                    </div>
                    <div className='icon-button' onClick={onTistoryIconClickHandler}>
                        <div className='icon tistory-icon'></div>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='footer-copyright'>{'Copyright @ 2024 Hyunil. All Rights Reserved'}</div>
            </div>
        </div>
    </div>
  )
}
