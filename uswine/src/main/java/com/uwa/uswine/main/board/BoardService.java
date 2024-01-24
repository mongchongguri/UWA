package com.uwa.uswine.main.board;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public int saveBoard(BoardEntity board) {
        try{
            boardRepository.save(board);
            return 1;
        } catch (Exception e) {
            return -1;
        }
    }
}
