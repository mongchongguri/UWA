package com.uwa.uswine.main.board.controller;

import com.uwa.uswine.main.board.dto.BoardDTO;
import com.uwa.uswine.main.board.dto.BoardPageDTO;
import com.uwa.uswine.main.board.dto.ReCommendDTO;
import com.uwa.uswine.main.board.entity.BoardEntity;
import com.uwa.uswine.main.board.service.BoardService;
import com.uwa.uswine.main.board.service.ReCommendService;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;
    private final ReCommendService reCommendService;

    @PostMapping("write")
    public int write(@RequestBody BoardDTO boardDTO) {
        int rs = boardService.saveBoard(boardDTO.toEntity());
        return rs;
    }

    @PostMapping("boardlist")
    public ResponseEntity<Page<BoardEntity>> getBoardList(@RequestBody BoardPageDTO boardPageDTO) {
        return ResponseEntity.ok(this.boardService.getBoardList(boardPageDTO));
    }

    @PostMapping("detail")
    public BoardEntity getDetails(@RequestBody Map<String,Long> boardId) {
        Optional<BoardEntity> result = this.boardService.getBoardDetail(boardId.get("id"));
        if(result.isPresent()) {
            BoardEntity board = result.get();
            return board;
        } else {
            return null;
        }
    }
    @PostMapping("recommend")
    public int reCommend(@RequestBody ReCommendDTO reCommendDTO) {
        return reCommendService.saveReCommend(reCommendDTO.toEntity());
    }

    @PostMapping("countRecommend")
    public long countRecommend(@RequestBody ReCommendDTO reCommendDTO) {
        return reCommendService.countRecommend(reCommendDTO);
    }

    @PostMapping("findReCommend")
    public int findReCommend(@RequestBody ReCommendDTO reCommendDTO) {
        return reCommendService.findReCommend(reCommendDTO);
    }

    @PostMapping("deleteReCommend")
    public int deleteReCommend(@RequestBody ReCommendDTO reCommendDTO) {
        return reCommendService.deleteReCommend(reCommendDTO);
    }
}
