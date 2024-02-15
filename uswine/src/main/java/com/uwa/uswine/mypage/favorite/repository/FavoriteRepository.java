package com.uwa.uswine.mypage.favorite.repository;

import com.uwa.uswine.mypage.diary.entity.DiaryEntity;
import com.uwa.uswine.mypage.favorite.entity.FavoriteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<FavoriteEntity, Object> {


    List<FavoriteEntity> findAllByEmail(String email);

    List<FavoriteEntity> findAllByEmailAndDocument(String email, int document);
}
