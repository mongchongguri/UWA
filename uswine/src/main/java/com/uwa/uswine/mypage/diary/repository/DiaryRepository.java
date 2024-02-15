package com.uwa.uswine.mypage.diary.repository;

import com.uwa.uswine.mypage.diary.entity.DiaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<DiaryEntity, Object> {
    List<DiaryEntity> findAllByDiarydateContainingAndEmail(String diarydate, String email);

    List<DiaryEntity> findAllByEmail(String email);
}
