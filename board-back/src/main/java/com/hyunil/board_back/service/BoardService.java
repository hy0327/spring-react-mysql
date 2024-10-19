package com.hyunil.board_back.service;

import org.springframework.http.ResponseEntity;

import com.hyunil.board_back.dto.request.board.PostBoardRequestDto;
import com.hyunil.board_back.dto.request.board.PostCommentRequestDto;
import com.hyunil.board_back.dto.response.board.DeleteBoardResponseDto;
import com.hyunil.board_back.dto.response.board.GetBoardResponseDto;
import com.hyunil.board_back.dto.response.board.GetCommentListResponseDto;
import com.hyunil.board_back.dto.response.board.GetFavoriteListResponseDto;
import com.hyunil.board_back.dto.response.board.IncreaseViewCountResponseDto;
import com.hyunil.board_back.dto.response.board.PostBoardResponseDto;
import com.hyunil.board_back.dto.response.board.PostCommentResponseDto;
import com.hyunil.board_back.dto.response.board.PutFavoriteResponseDto;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);
    ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber);
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber,  String eamil);
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);
    ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(Integer boardNumber);
    ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email);
}
