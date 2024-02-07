package com.uwa.uswine.admin.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.uwa.uswine.admin.entity.NoticeCommentEntity;


public interface NoticeCommentRepository extends JpaRepository<NoticeCommentEntity, Long> {
	NoticeCommentEntity findByNickname(String nickname);
	NoticeCommentEntity findByNoticeIdxAndId(String idx, Long id);
	Page<NoticeCommentEntity> findByNoticeIdx(String idx,Pageable pageable);
	List<NoticeCommentEntity> findByNoticeIdx(String idx);
	Long countByNoticeIdx(String idx); 
	
}
