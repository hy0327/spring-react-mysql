package com.hyunil.board_back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hyunil.board_back.entity.FavoriteEntity;
import com.hyunil.board_back.entity.primaryKey.FavoritePk;
import com.hyunil.board_back.repository.resultSet.GetFavoriteListResultSet;

import jakarta.transaction.Transactional;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk>{
    
    FavoriteEntity findByBoardNumberAndUserEmail(Integer boardNumber, String userEmail);

    @Query(
        value=
        "SELECT " +
            "U.email as email, " +
            "U.nickname as nickname, " +
            "U.profile_image as profileImage " +
        "from favorite as f " +
        "inner join user as u " +
        "on f.user_email = u.email " +
        "where f.board_number = ?1 ",
        nativeQuery = true
    )
    List<GetFavoriteListResultSet> getFavoriteList(Integer boardNumber);

    @Transactional
    void deleteByBoardNumber(Integer boardNumber);
}
