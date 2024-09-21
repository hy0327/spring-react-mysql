package com.hyunil.board_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hyunil.board_back.entity.BoardEntity;
import com.hyunil.board_back.repository.resultSet.GetBoardResultSet;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    
    boolean existsByBoardNumber(Integer boardNumber);

    BoardEntity findByBoardNumber(Integer boardNumber);

    @Query(
        value =
        "select "  +
        "b.board_number as boardNumber, " +
        "b.title as title, " +
        "b.content as content, " +
        "b.write_datetime as writerDatetime, " +
        "b.writer_email as writerEmail, " +
        "u.nickname as writerNickname, " +
        "u.profile_image as writerProfileImage " +
        "from board as b " +
        "inner join user as u " +
        "on b.writer_email = u.email " +
        "where board_number = ?1 ",
        nativeQuery = true
    )
    GetBoardResultSet getBoard(Integer boardNumber);

}
