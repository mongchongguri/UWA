package com.uwa.uswine.mypage.myboard.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uwa.uswine.admin.entity.NoticeEntity;
import com.uwa.uswine.main.board.entity.BoardEntity;
import com.uwa.uswine.mypage.myboard.service.MyBoardService;

import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/myboard")
public class MyBoardController {
	
	private MyBoardService myBoardService;
	
	@PostMapping("myboardList")
	public Map<String, Object> myBoardList(@RequestBody Map<String,String> map){
		System.out.println(map);
		String nickname = map.get("nickname");
		int page = Integer.parseInt(map.get("page"));
		int size = 10;
		Page<BoardEntity> board =  myBoardService.getMyBoardList(nickname,size,page-1);
		Map<String, Long> comment_map = new HashMap<String,Long>();
		Map<String, Long> recommend_map = new HashMap<String,Long>();
		Map<String, Long> recomment_map = new HashMap<String,Long>();
		Map<String, Object> return_map = new HashMap<String,Object>();
		for(BoardEntity entity : board) {
			String id = entity.getId()+"";
			Long comment_count = myBoardService.myCommentCount(id);
			Long recomment_count = myBoardService.myRecommentCount(id);
			Long recommend_count = myBoardService.myRecommendCount(id);
			comment_map.put(id, comment_count);
			recomment_map.put(id, recomment_count);
			recommend_map.put(id, recommend_count);
		}
		return_map.put("board", board);
		return_map.put("comment_map", comment_map);
		return_map.put("recomment_map", recomment_map);
		return_map.put("recommend_map", recommend_map);
		return return_map;
	}
	@SuppressWarnings("unchecked")
	@PostMapping("mycommentList")
	public Map<String, Object> mycommentList(@RequestBody Map<String,String> map){
		String nickname = map.get("nickname");
		int page = Integer.parseInt(map.get("page"));
		int size = 10;
		Map<String,Object> getmap = myBoardService.getMyCommentList(nickname,size,page-1);
		List<BoardEntity> board = (List<BoardEntity>)getmap.get("returnList");
		int totalPage = (int)getmap.get("totalPage");
		Map<String, Long> comment_map = new HashMap<String,Long>();
		Map<String, Long> recommend_map = new HashMap<String,Long>();
		Map<String, Long> recomment_map = new HashMap<String,Long>();
		Map<String, Object> return_map = new HashMap<String,Object>();
		for(BoardEntity entity : board) {
			String id = entity.getId()+"";
			Long comment_count = myBoardService.myCommentCount(id);
			Long recomment_count = myBoardService.myRecommentCount(id);
			Long recommend_count = myBoardService.myRecommendCount(id);
			comment_map.put(id, comment_count);
			recomment_map.put(id, recomment_count);
			recommend_map.put(id, recommend_count);
		}
		return_map.put("board", board);
		return_map.put("totalPage", totalPage);
		return_map.put("comment_map", comment_map);
		return_map.put("recomment_map", recomment_map);
		return_map.put("recommend_map", recommend_map);
		return return_map;
	}
	
}
