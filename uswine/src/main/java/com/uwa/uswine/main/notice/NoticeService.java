package com.uwa.uswine.main.notice;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.uwa.uswine.admin.entity.NoticeCommentEntity;
import com.uwa.uswine.admin.entity.NoticeEntity;
import com.uwa.uswine.admin.entity.NoticeRecommentEntity;
import com.uwa.uswine.admin.repository.NoticeCommentRepository;
import com.uwa.uswine.admin.repository.NoticeRecommentRepository;
import com.uwa.uswine.admin.repository.NoticeRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NoticeService {
	
	private NoticeRepository noticeRepository;
	private NoticeCommentRepository noticeCommentRepository;
	private NoticeRecommentRepository noticeRecommentRepository;


	public Page<NoticeEntity> getNoticeList(NoticePageDTO noticePageDTO) {
		 System.out.println(noticePageDTO.toString());
	        
	        List<Sort.Order> sorts = new ArrayList<>();
	        sorts.add(Sort.Order.desc("id"));
	        Pageable pageable = PageRequest.of(noticePageDTO.getCurrentPage(),noticePageDTO.getViewPageNum(),Sort.by(sorts));
	        return noticeRepository.findAll(pageable);
	}

	public Optional<NoticeEntity> getBoardDetail(Long id) {
		return noticeRepository.findById(id);
	}

	public int saveNoticeComment(NoticeCommentEntity entity) {
		 try{
	            noticeCommentRepository.save(entity);
	            return 1;
	        } catch (Exception e) {
	            return 0;
	        }
	}

	public List<NoticeCommentEntity> getNoticeComments(String noticeIdx) {
		return noticeCommentRepository.findByNoticeIdx(noticeIdx);
	}

	public int deleteNoticeComment(NoticeCommentDTO commentDTO) {
		NoticeCommentEntity delComment = noticeCommentRepository.findByNoticeIdxAndId(commentDTO.getNoticeIdx(),commentDTO.getId());

	       if(delComment != null) {
	           delComment.setComment("작성자에 의해 삭제된 댓글입니다.");
	           noticeCommentRepository.save(delComment);
	           return 1;
	       } else {
	           return 0;
	       }
	}

	public long countNoticeComment(String noticeIdx) {
		return noticeCommentRepository.countByNoticeIdx(noticeIdx);
	}

	public int saveNoticeRecomment(NoticeRecommentEntity entity) {
		try{
            noticeRecommentRepository.save(entity);
            return 1;
        } catch (Exception e) {
            return 0;
        }
	}

	public List<NoticeRecommentEntity> getNoticeRecomments(NoticeRecommentDTO reCommentDTO) {
		return noticeRecommentRepository.findByNoticeIdx(reCommentDTO.getNoticeIdx());
	}

	public int deleteNoticeRecomment(NoticeRecommentDTO reCommentDTO) {
		NoticeRecommentEntity delReComment = noticeRecommentRepository.findByNoticeIdxAndId(reCommentDTO.getNoticeIdx(),reCommentDTO.getId());

        if(delReComment != null) {
            delReComment.setRecomment("작성자에 의해 삭제된 댓글입니다.");
            noticeRecommentRepository.save(delReComment);
            return 1;
        } else {
            return 0;
        }
	}

	public long getNoticeCountRecomments(String noticeIdx) {
		return noticeRecommentRepository.countByNoticeIdx(noticeIdx);
	}

	

}
