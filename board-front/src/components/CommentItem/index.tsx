import React from 'react';
import './style.css';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import CommentListItem from 'types/interface/comment-list-item-interface';

import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoginUserStore } from 'stores';
import { deleteCommentRequest } from 'apis';
import { DeleteCommentResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { BOARD_DETAIL_PATH, BOARD_PATH } from 'constant';

interface Props{
    commentListItem: CommentListItem;
}
//          component: Comment List Item 컴포넌트               //
export default function CommentItem({ commentListItem }: Props) {
    
    //          state: properties          //
    const { commentNumber, nickname, profileImage, writeDatetime, content } = commentListItem;
    //            state : 게시물 번호 path variable 상태            //
    const { boardNumber } = useParams();
    //            state : 로그인 유저 상태            //
    const { loginUser } = useLoginUserStore(); 
    //            state : 쿠키 상태               //
    const [cookies, setCookies] = useCookies();
    
    //          function: 네비게이트 함수         //
    const navigate = useNavigate();

    //          event handler : 수정 버튼 수정 클릭 이벤트 처리        //
    const onDeleteButtonClickHandler = () => {
        if(!boardNumber || !loginUser){
          return;
        }
        if(loginUser.nickname !== nickname){
          return;
        }
        
        if (window.confirm("삭제 하시겠습니까??")) {
          deleteCommentRequest(boardNumber, commentNumber, cookies.accessToken).then(deleteCommentResponse);
          navigate(0);
        }
        
   
      }
    //          function: deleteCommentResponse 함수 처리   //
    const deleteCommentResponse = (responseBody: DeleteCommentResponseDto | ResponseDto | null) => {
        if(!responseBody) return;
        const { code } = responseBody;
        if(code === 'VF') alert('잘못된 접근입니다.');
        if(code === 'NU') alert('존재하지 않는 유저입니다.');
        if(code === 'NB') alert('존재하지 않는 게시물입니다.');
        if(code === 'DBE') alert('데이터베이스 오류입니다.');
        if(code === 'AF') alert('인증에 실패했습니다.');
        if(code === 'NP') alert('권한이 없습니다.');
        if(code !== 'SU') return;
      
        
    }

  

    //          function: 작성일 경과시간 함수              //
    const getElapsedTime = () => {
        const now = dayjs().add(9, 'hour');
        const writeTime = dayjs(writeDatetime);

        const gap = now.diff(writeTime, 's');
        if(gap < 60) return `${gap}초 전`;
        if(gap < 3600) return `${Math.floor(gap / 60)}분 전`;
        if(gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
        return `${Math.floor(gap / 86400)}일 전`;
    }

    //          render: Comment List Item 렌더링               //
  return (
    <div className='comment-list-item'>
        <div className='comment-list-item-top'>
            <div className='comment-list-item-profile-box'>
                <div className='comment-list-item-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage}) `}}></div>
            </div>
            <div className='comment-list-item-nickname'>{nickname}</div>
            <div className='comment-list-item-divider'>{'\|'}</div>
            <div className='comment-list-item-time'>{getElapsedTime()}</div>
            <div className='comment-list-item-delete' onClick={onDeleteButtonClickHandler}>{'삭제'}</div>
        </div>
        <div className='comment-list-item-main'>
            <div className='comment-list-item-content'>
                {content}
            </div>
        </div>
    </div>
  )
}
