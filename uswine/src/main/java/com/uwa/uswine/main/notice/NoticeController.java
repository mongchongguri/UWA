package com.uwa.uswine.main.notice;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.uwa.uswine.admin.entity.NoticeCommentEntity;
import com.uwa.uswine.admin.entity.NoticeEntity;
import com.uwa.uswine.admin.entity.NoticeRecommentEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/notice")
public class NoticeController {

    private final NoticeService noticeService;


    @PostMapping("noticelist")
    public ResponseEntity<Page<NoticeEntity>> getNoticeList(@RequestBody NoticePageDTO noticePageDTO) {
        return ResponseEntity.ok(this.noticeService.getNoticeList(noticePageDTO));
    }

    @PostMapping("noticeDetail")
    public NoticeEntity getDetails(@RequestBody Map<String,Long> noticeId) {
        Optional<NoticeEntity> result = this.noticeService.getBoardDetail(noticeId.get("id"));
        if(result.isPresent()) {
            NoticeEntity board = result.get();
            return board;
        } else {
            return null;
        }
    }
    
    @PostMapping("commentWrite")
    public int commentWrite(@RequestBody NoticeCommentDTO commentDTO) {
        int rs = noticeService.saveNoticeComment(commentDTO.toEntity());
        return rs;
    }

    @PostMapping("noticeCommentList")
    public List<NoticeCommentEntity> noticeCommentList(@RequestBody NoticeCommentDTO commentDTO) {
        return noticeService.getNoticeComments(commentDTO.getNoticeIdx());
    }

    @PostMapping("noticeCommentDelete")
    public int noticeCommentDelete(@RequestBody NoticeCommentDTO commentDTO) {
        return noticeService.deleteNoticeComment(commentDTO);
    }

    @PostMapping("noticeCountComment")
    public long countComment(@RequestBody NoticeCommentDTO commentDTO) {
        return noticeService.countNoticeComment(commentDTO.getNoticeIdx());
    }

    @PostMapping("saveNoticeRecomment")
    public int noticeRecomment(@RequestBody NoticeRecommentDTO reCommentDTO) {
        int rs = noticeService.saveNoticeRecomment(reCommentDTO.toEntity());
        return rs;
    }

    @PostMapping("getnoticerecomment")
    public List<NoticeRecommentEntity> getnoticerecomment(@RequestBody NoticeRecommentDTO reCommentDTO) {
        return noticeService.getNoticeRecomments(reCommentDTO);
    }

    @PostMapping("noticeRecommentDelete")
    public int noticeRecommentDelete(@RequestBody NoticeRecommentDTO reCommentDTO) {
        return noticeService.deleteNoticeRecomment(reCommentDTO);
    }

    @PostMapping("noticeCountRecomment")
    public long noticeCountRecomment(@RequestBody NoticeRecommentDTO reCommentDTO) {
        return noticeService.getNoticeCountRecomments(reCommentDTO.getNoticeIdx());
    }
    


}
