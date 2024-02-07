package com.uwa.uswine.mypage.diary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiaryRepository extends JpaRepository<DiaryEntity, Object> {
    List<DiaryEntity> findAllByDiarydateContainingAndEmail(String diarydate, String email);


    List<DiaryEntity> findAllByEmail(String email);
}
