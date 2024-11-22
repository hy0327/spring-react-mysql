package com.hyunil.board_back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import com.hyunil.board_back.entity.CommentEntity;
import com.hyunil.board_back.repository.resultSet.GetCommentListResultSet;

import jakarta.transaction.Transactional;

@Repository
public interface DeleteCommentRepository extends JpaRepository<CommentEntity, Integer>{

    boolean existsByBoardNumberAndCommentNumber(Integer boardNumber, Integer commentNumber);

    CommentEntity findByBoardNumberAndCommentNumber(Integer boardNumber, Integer commentNumber);
    
    @Query(
        value=
        "SELECT " +
        "   C.comment_number AS commentNumber, "+
        "   U.nickname AS nickname, " +
        "   U.profile_image AS profileImage, " +
        "   C.write_datetime AS writeDatetime, " +
        "   C.content AS content " +
        "FROM comment AS C " +
        "INNER JOIN user AS U " +
        "ON C.user_email = U.email " +
        "WHERE C.board_number = ?1 " +
        "AND C.comment_number = ?2 " +
        "ORDER BY writeDatetime DESC ",
        nativeQuery = true
    )
    List<GetCommentListResultSet> getCommentList(Integer boardNumber);

    @Transactional
    void deleteByBoardNumber(Integer boardNumber);
}
