import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import defaultprofileImage from 'assets/image/default-profile-image.png';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardListItem } from 'types/interface';
import { latestBoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import { BOARD_PATH, BOARD_WRITE_PATH, USER_PATH } from 'constant';
import { useLoginUserStore } from 'stores';

//          component: 유저 화면 컴포넌트           //
export default function User() {

  //          state : user email 상태      //
  const { userEmail } =useParams();
  //          state : 로그인 유저 상태    //
  const { loginUser } = useLoginUserStore();
  //          state : 마이페이지 여부 상태      //
  const [isMyPage, setMyPage] = useState<boolean>(true);

  //        function : 네비게이트 함수      //
  const navigate = useNavigate();

  //        component: 유저 화면 상단 컴포넌트    //
  const UserTop = () => {
  //          state : image파일 인풋 상태       //
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  //          state : 닉네임 변경 여부 상태      //
  const [isNicknameChange, setNicknameChange] = useState<boolean>(false);
  //          state : 닉네임 상태      //
  const [nickname, setNickname] = useState<string>('');
  //          state : 변경 닉네임 상태      //
  const [changeNickname, setChangeNickname] = useState<string>('');
  //          state : 프로필 이미지 상태      //
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  //          event handler : 프로일 사진 수정 버튼 클릭 이벤트 //
  const onProfileBoxClickHandler = () => {
    if(!isMyPage) return;
    if(!imageInputRef.current) return;
    imageInputRef.current.click();
  };
  
  //          event handler : 닉네임 수정 버튼 클릭 이벤트 //
  const onNicknameEditButtonClickHandler = () => {
    setChangeNickname(nickname);
    setNicknameChange(!isNicknameChange);
  };

  //          event handler : 프로일 이미지 변경 이벤트처리  //
  const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files || !event.target.files.length) return;

    const file = event.target.files[0];
    const data = new FormData();
    data.append('file', file);
  };

  //          event handler : 닉네임 변경 이벤트처리  //
  const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setChangeNickname(value);
  }

  //       Effect: userEmail path varaible 변경시 실행할 함수 //
  useEffect(() => {

    if(!userEmail) return;
    setNickname('나는이현일');
    setProfileImage('data:image/jpeg;base64,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');

  }, [userEmail]);

    //        render: 유저 화면 상단 컴포넌트 렌더링   //
    return (
      <div id='user-top-wrapper'>
        <div className='user-top-container'>
          {isMyPage ? 
          <div className='user-top-my-profileImage-box' onClick={onProfileBoxClickHandler}>
            {profileImage !== null ?
            <div className='user-top-profile-image' style={{ backgroundImage: `url(${profileImage})` }}></div> :
            <div className='icon-box-large'>
              <div className='icon image-box-white-icon'></div>
            </div>
            }
            <input ref={imageInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={onProfileImageChangeHandler} />
          </div> :
          <div className='user-top-profile-image-box' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultprofileImage })` }}></div>
          }
          <div className='user-top-info-box'>
            <div className='user-top-info-nickname-box'>
              {isMyPage ? 
              <>
              {isNicknameChange ?
              <input className='user-top-info-nickname-input' type='text' size={changeNickname.length + 2} value={changeNickname} onChange={onNicknameChangeHandler} /> :
              <div className='user-top-info-nickname'>{nickname}</div>
              }
              <div className='icon-button' onClick={onNicknameEditButtonClickHandler}>
                <div className='icon edit-icon'></div>
              </div>
              </> :
              <div className='user-top-info-nickname'>{nickname}</div>
              }
            </div>
            <div className='user-top-info-email'>{'hy_0327@naver.com'}</div>
          </div>
        </div>
      </div>
    );

  };

  //        component: 유저 화면 하단 컴포넌트    //
  const UserBottom = () => {

    //        state: 게시물 개수 상태       //
    const [ count, setCount ] = useState<number>(2);
    //        state: 게시물  리스트개수 상태       //
    const [ userBoardList, setUserBoardList ] = useState<BoardListItem[]>([]);

    //         event handler : 사이드 카드 클릭 이벤트 처리함수     //
    const onSideCardClickHandler = () => {
      if(isMyPage) navigate(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
      else if(loginUser) {
        navigate(USER_PATH(loginUser.email));
      }
    }

    //      effect: user email path variable 변경될떄마다 실행할 함수   //
    useEffect(() => {
      setUserBoardList(latestBoardListMock);
    },[userEmail]);

    //        render: 유저 화면 하단 컴포넌트 렌더링   //
    return (
      <div id='user-bottom-wrapper'>
        <div className='user-bottom-container'>
          <div className='user-bottom-title'>{isMyPage ? '내 게시물 ' : '게시물 '}<span className='emphasis'>{count}</span></div>
          <div className='user-bottom-contents-box'>
            {count === 0 ? 
            <div className='user-bottom-contents-nothing'>{'게시물이 없습니다.'}</div> :
            <div className='user-bottom-contents'>
                {userBoardList.map(boardListItem => <BoardItem boardListItem={boardListItem} />)}
            </div>
            }
            <div className='user-bottom-side-box'>
              <div className='user-bottom-side-card' onClick={onSideCardClickHandler}>
                <div className='user-bottom-side-container'>
                  {isMyPage ? 
                  <>
                  <div className='icon-box'>
                    <div className='icon edit-icon'></div>
                  </div>
                  <div className='user-bottom-side-text'>{'글쓰기'}</div>
                  </> :
                  <>
                  <div className='user-bottom-side-text'>{'내 게시물로 가기'}</div>
                  <div className='icon-box'>
                    <div className='icon arrow-right-icon'></div>
                  </div>
                  </>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='user-bottom-pagination-box'></div>
        </div>
      </div>
    );

  };

  //          render: 유저 화면 컴포넌트 렌더링          //
  return (
    <>
    <UserTop />
    <UserBottom />
    </>
  );
}
