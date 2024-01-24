package com.uwa.uswine.main.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    @PostMapping("write")
    public int write(@RequestBody BoardDTO boardDTO) {
        System.out.println(boardDTO.toString());
        int rs = boardService.saveBoard(boardDTO.toEntity());
        return rs;
    }
}
