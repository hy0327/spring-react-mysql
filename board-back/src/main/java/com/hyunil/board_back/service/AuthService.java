package com.hyunil.board_back.service;

import org.springframework.http.ResponseEntity;

import com.hyunil.board_back.dto.request.auth.SignInRequestDto;
import com.hyunil.board_back.dto.request.auth.SignUpRequestDto;
import com.hyunil.board_back.dto.response.auth.SignInResponseDto;
import com.hyunil.board_back.dto.response.auth.SignUpResponseDto;

public interface AuthService {
    
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto); 
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
}
