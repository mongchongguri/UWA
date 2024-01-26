package com.uwa.uswine.main.board;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    @PostMapping("write")
    public int write(@RequestBody BoardDTO boardDTO) {
        int rs = boardService.saveBoard(boardDTO.toEntity());
        return rs;
    }

    @PostMapping("boardlist")
    public ResponseEntity<Page<BoardEntity>> getBoardList(@RequestBody BoardPageDTO boardPageDTO) {
        return ResponseEntity.ok(this.boardService.getBoardList(boardPageDTO));
    }
}
