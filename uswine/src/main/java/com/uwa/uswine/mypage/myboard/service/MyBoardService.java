package com.uwa.uswine.mypage.myboard.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.uwa.uswine.main.board.entity.BoardEntity;
import com.uwa.uswine.main.board.entity.CommentEntity;
import com.uwa.uswine.main.board.entity.ReCommentEntity;
import com.uwa.uswine.main.board.repository.BoardRepository;
import com.uwa.uswine.main.board.repository.CommentRepository;
import com.uwa.uswine.main.board.repository.ReCommendRepository;
import com.uwa.uswine.main.board.repository.ReCommentRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MyBoardService {
	
	private BoardRepository boardRepository;
	private CommentRepository commentRepository;
	private ReCommentRepository reCommentRepository;
	private ReCommendRepository reCommendRepository;
	
	public Page<BoardEntity> getMyBoardList(String nickname,int size ,int page){
		Pageable pageable = PageRequest.of(page, size); 
		String title = "관리자에 의해 삭제된 게시물입니다.";
		Page<BoardEntity> entity = boardRepository.findByNicknameAndTitleNot(nickname, pageable, title);
		return entity;
	}
	public Map<String,Object> getMyCommentList(String nickname, int size, int page) {
		Map<String,Object> map = new HashMap<String,Object>();
		String comment = "관리자에 의해 삭제된 답글입니다.";
		int totalCount = 0;
		List<CommentEntity> comment_entity = commentRepository.findByNicknameAndCommentNot(nickname,comment);
		List<ReCommentEntity> recomment_entity = reCommentRepository.findByNicknameAndRecommentNot(nickname,comment);
		List<String> comment_boardIdx = new ArrayList<String>();
		List<String> recomment_boardIdx = new ArrayList<String>();
		for(CommentEntity entity : comment_entity) {
			comment_boardIdx.add(entity.getBoardIdx());
		}
		for(ReCommentEntity entity : recomment_entity) {
			recomment_boardIdx.add(entity.getBoardIdx());
		}
		Set<String> mergedSet = new HashSet<>(comment_boardIdx);
        mergedSet.addAll(recomment_boardIdx);
        List<String> mergedList  = new ArrayList<>(mergedSet);
        List<BoardEntity> returnList = new ArrayList<BoardEntity>();
        for(String id : mergedList) {
        	Long lid = (long)Integer.parseInt(id);
        	Optional<BoardEntity> optional = boardRepository.findById(lid);
        	BoardEntity entity = optional.get();
        	if(entity.getContent().equals("관리자에 의해 삭제된 게시물입니다.")) {
        		continue;
        	}else {
        		returnList.add(entity);
        	}
        }
        totalCount = returnList.size();
        if(returnList.size()<size) {
        	int totalPage = (int) Math.ceil((double)returnList.size() / size);
        	map.put("returnList", returnList);
        	map.put("totalPage", totalPage);
        	map.put("totalCount", totalCount);
        	return map;
        } else {
        	int start = page * size;
            int end = Math.min(start + size, returnList.size());
            List<BoardEntity> sublist = returnList.subList(start, end);
            int totalPage = (int) Math.ceil((double)returnList.size() / size);
            map.put("returnList", sublist);
            map.put("totalPage", totalPage);
            map.put("totalCount", totalCount);
            return map;
        }
	}

	public Long myCommentCount(String id) {
		return commentRepository.countByBoardIdx(id);
	}

	public Long myRecommentCount(String id) {
		return reCommentRepository.countByBoardIdx(id);
	}

	public Long myRecommendCount(String id) {
		return reCommendRepository.countByBoardIdx(id);
	}


}
