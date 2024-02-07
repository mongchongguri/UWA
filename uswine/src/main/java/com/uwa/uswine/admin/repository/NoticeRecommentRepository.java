package com.uwa.uswine.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uwa.uswine.admin.entity.NoticeRecommentEntity;


public interface NoticeRecommentRepository extends JpaRepository<NoticeRecommentEntity, Long>{
	 NoticeRecommentEntity findByNickname(String nickname);
	 NoticeRecommentEntity findByNoticeIdxAndId(String idx, Long id);
	 List<NoticeRecommentEntity> findByNoticeIdx(String idx);
	 List<NoticeRecommentEntity> findByNoticeCommentIdx(String idx);
	 List<NoticeRecommentEntity> findByNoticeIdxAndNoticeCommentIdx(String notice_id,String notice_comment_id);
	 Long countByNoticeIdx(String idx);
}
