package com.uwa.uswine.mypage.myinfo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uwa.uswine.main.board.entity.BoardEntity;
import com.uwa.uswine.mypage.cart.entity.WineTransactionEntity;
import com.uwa.uswine.mypage.myboard.service.MyBoardService;
import com.uwa.uswine.mypage.myinfo.service.MyInfoService;
import com.uwa.uswine.user.entity.UserEntity;

import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/myinfo")
public class MyInfoController {
	
	private MyInfoService myInfoService;
	private MyBoardService myBoardService;
	
	@SuppressWarnings("unchecked")
	@PostMapping("getInfo")
	public UserEntity getInfo(@RequestBody Map<String,Object> map) {
		Map<String,String> userinfo = (Map<String,String>)map.get("userinfo");
		return myInfoService.getUserInfo(userinfo);
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("getList")
	public Map<String,Object> getList(@RequestBody Map<String,Object> map){
		Map<String,String> userinfo = (Map<String,String>)map.get("userinfo");
		String nickname = userinfo.get("nickname");
		int page = 0;
		int size = 5;
		Page<BoardEntity> board =  myBoardService.getMyBoardList(nickname,size,page);
		Map<String, Long> comment_map = new HashMap<String,Long>();
		Map<String, Long> recomment_map = new HashMap<String,Long>();
		Map<String, Object> return_map = new HashMap<String,Object>();
		for(BoardEntity entity : board) {
			String id = entity.getId()+"";
			Long comment_count = myBoardService.myCommentCount(id);
			Long recomment_count = myBoardService.myRecommentCount(id);
			comment_map.put(id, comment_count);
			recomment_map.put(id, recomment_count);
		}
		return_map.put("board", board);
		return_map.put("comment_map", comment_map);
		return_map.put("recomment_map", recomment_map);
		return return_map;
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("getCommentList")
	public Map<String,Object> getCommentList(@RequestBody Map<String,Object> map){
		Map<String,String> userinfo = (Map<String,String>)map.get("userinfo");
		String nickname = userinfo.get("nickname");
		int page = 1;
		int size = 5;
		Map<String,Object> getmap = myBoardService.getMyCommentList(nickname,size,page-1);
		List<BoardEntity> board = (List<BoardEntity>)getmap.get("returnList");
		int totalCount = (int)getmap.get("totalCount");
		Map<String, Long> comment_map = new HashMap<String,Long>();
		Map<String, Long> recomment_map = new HashMap<String,Long>();
		Map<String, Object> return_map = new HashMap<String,Object>();
		for(BoardEntity entity : board) {
			String id = entity.getId()+"";
			Long comment_count = myBoardService.myCommentCount(id);
			Long recomment_count = myBoardService.myRecommentCount(id);
			comment_map.put(id, comment_count);
			recomment_map.put(id, recomment_count);
		}
		return_map.put("board", board);
		return_map.put("totalCount", totalCount);
		return_map.put("comment_map", comment_map);
		return_map.put("recomment_map", recomment_map);
		return return_map;
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("buywine")
	public Page<WineTransactionEntity> buywine(@RequestBody Map<String,Object> map) {
		Map<String,String> userinfo = (Map<String,String>)map.get("userinfo");
		int page = Integer.parseInt(map.get("currentPage") + "");
		System.out.println(map);
		return myInfoService.buywine(userinfo,page-1);
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("getState")
	public Page<Object> getState(@RequestBody Map<String,Object> map) {
		Map<String,String> userinfo = (Map<String,String>)map.get("userinfo");
		int page = Integer.parseInt(map.get("currentPage") + "");
		return myInfoService.getState(userinfo,page-1);
		
	}
	
	@PostMapping("checkNewNickname")
	public int checkNewNickname(@RequestBody Map<String,String> map){
		String new_nickname = map.get("newNickname"); 
		return myInfoService.checkNewNickname(new_nickname);
	}
	@SuppressWarnings("unchecked")
	@PostMapping("updateNickname")
	public int updateNickname(@RequestBody Map<String,Object> map) {
		Map<String,String> userinfo = (Map<String,String>)map.get("userinfo");
		String new_nickname = (String)map.get("newNickname");
		
		return myInfoService.updateNickname(userinfo,new_nickname);
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("updatePassword")
	public int updatePassword(@RequestBody Map<String,Object> map) {
		Map<String,String> userinfo = (Map<String,String>)map.get("userinfo");
		String new_password = (String)map.get("newPassword");
		
		return myInfoService.updatePassword(userinfo,new_password);
	}
}
