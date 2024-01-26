package com.uwa.uswine.main.board;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public Page<BoardEntity> getBoardList(BoardPageDTO boardPageDTO) {
        System.out.println(boardPageDTO.toString());
        if(boardPageDTO.getSearchKeyword() == null) {
            boardPageDTO.setSearchKeyword("");
        }
        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("id"));
        Pageable pageable = PageRequest.of(boardPageDTO.getCurrentPage(),boardPageDTO.getViewPageNum(),Sort.by(sorts));
        switch (boardPageDTO.getSearchType()) {
            case 0: return boardRepository.findByTitleContainingOrContentContaining(boardPageDTO.getSearchKeyword(),boardPageDTO.getSearchKeyword(),pageable);
            case 1: return boardRepository.findByTitleContaining(boardPageDTO.getSearchKeyword(),pageable);
            case 2: return boardRepository.findByContentContaining(boardPageDTO.getSearchKeyword(),pageable);
            case 3: return boardRepository.findByNicknameContaining(boardPageDTO.getSearchKeyword(),pageable);
            default: return null;
        }
    }
}
