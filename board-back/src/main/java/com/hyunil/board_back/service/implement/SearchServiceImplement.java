package com.hyunil.board_back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hyunil.board_back.dto.response.ResponseDto;
import com.hyunil.board_back.dto.response.search.GetPopularListResponseDto;
import com.hyunil.board_back.repository.SearchLogRepository;
import com.hyunil.board_back.repository.resultSet.GetPopularListResultSet;
import com.hyunil.board_back.service.SearchService;

import java.util.List;
import java.util.ArrayList;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchServiceImplement implements SearchService{
    
    private final SearchLogRepository searchLogRepository;

    @Override 
    public ResponseEntity<? super GetPopularListResponseDto> getPopularList() {
        
        List<GetPopularListResultSet> resultSets = new ArrayList<>();

        try {
            
            resultSets = searchLogRepository.getPopularList();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetPopularListResponseDto.success(resultSets);
    }
    
}
