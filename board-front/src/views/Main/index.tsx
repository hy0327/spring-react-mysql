import React, { useEffect, useState } from 'react'
import './style.css';
import Top3Item from 'components/Top3Item';
import { BoardListItem } from 'types/interface';
import { latestBoardListMock, top3BoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import Pagination from 'components/Pagination';
import { getTop3BoardListRequest } from 'apis';
import { GetTop3BoardListResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PATH } from 'constant';

//          component: 메인 화면 컴포넌트           //
export default function Main() {

  //        component: 메인 화면 상단 컴포넌트      //
  const MainTop = () => {

    //          state: 주간 top3 게시물 리스트 상태       //
    const [top3BoardList, setTop3BoardList] = useState<BoardListItem[]>([]);

    //        function: getTop3BoardListResponse 처리 함수    //
    const getTop3BoardListResponse = (responseBody: GetTop3BoardListResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const { code } = responseBody;
      if(code == 'DBE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU') return;

      const { top3List } = responseBody as GetTop3BoardListResponseDto;
      setTop3BoardList(top3List);
    }

    //        effect: 첫 마운트 시 실행될 함수        //
    useEffect(() => {
      getTop3BoardListRequest().then(getTop3BoardListResponse);
    }, []);
      
    //          render: 메인 화면 상단 컴포넌트 렌더링           //
    return (
      <div id='main-top-wrapper'>
        <div className='main-top-container'>
          <div className='main-top-title'>{'나의 이야기에서\n다양한 이야기를 나눠보세요.'}</div>
          <div className='main-top-contents-box'>
            <div className='main-top-contents-title'>{'주간 TOP 3 게시물'}</div>
            <div className='main-top-contents'>
              {top3BoardList.map(top3ListItem => <Top3Item top3ListItem={top3ListItem} />)}  
            </div>
          </div>
        </div>
      </div>
    )
  }

  //        component: 메인 화면 하단 컴포넌트      //
  const MainBottom = () => {
    
    //        function: 네비게이트 함수       //
    const navigate = useNavigate();

    //          state: 최신 게시물 리스트 상태 (임시)     //
    const [currentBoardList, setCurrentBoardList] = useState<BoardListItem[]>([]);
    //          state: 인기 검색 리스트 상태        //
    const [popularWordList, setPopularWordList] = useState<string[]>([]);

    //        event handler: 인기 검색어 클릭 이벤트 처리       //
    const onPopularWordClickHandler = (word: string) => {
      navigate(SEARCH_PATH(word));
    }

    //        effect: 첫 마운트 시 실행될 함수        //
    useEffect(() => {
      setCurrentBoardList(latestBoardListMock);
      setPopularWordList(['안녕','잘가','또봐']);
    }, []);
    //          render: 메인 화면 하단 컴포넌트 렌더링           //
    return (
      <div id='main-bottom-wrapper'>
        <div className='main-bottom-container'>
          <div className='main-bottom-title'>{'최신 게시물'}</div>
          <div className='main-bottom-contents-box'>
            <div className='main-bottom-current-contents'>
              {currentBoardList.map(boardlistItem => <BoardItem boardListItem={boardlistItem}/>)}
            </div>
            <div className='main-bottom-popular-box'>
              <div className='main-bottom-popular-card'>
                <div className='main-bottom-popular-card-container'>
                  <div className='main-bottom-popular-card-title'>{'인기 검색어'}</div>
                  <div className='main-bottom-popular-card-contents'>
                    {popularWordList.map(word => <div className='word-badge' onClick={() => onPopularWordClickHandler(word)}>{word}</div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='main-bottom-pagination-box'>
            {/* <Pagination /> */}
          </div>
        </div>
      </div>
    )
  }

  //      render: 메인 화면 컴포넌트 렌더링         //
  return (
    <>
      <MainTop />
      <MainBottom />
    </>
  )
  
}
