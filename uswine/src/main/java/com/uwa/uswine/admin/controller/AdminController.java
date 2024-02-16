package com.uwa.uswine.admin.controller;


import java.util.*;

import com.uwa.uswine.main.board.entity.BoardEntity;
import com.uwa.uswine.main.board.entity.CommentEntity;
import com.uwa.uswine.main.board.entity.ReCommentEntity;
import com.uwa.uswine.main.board.service.CommentService;
import com.uwa.uswine.main.board.service.ReCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uwa.uswine.admin.dto.AdminNoticeDTO;
import com.uwa.uswine.admin.dto.UserSearchDTO;
import com.uwa.uswine.admin.dto.WineInsertDTO;
import com.uwa.uswine.admin.entity.NoticeCommentEntity;
import com.uwa.uswine.admin.entity.NoticeEntity;
import com.uwa.uswine.admin.entity.NoticeRecommentEntity;
import com.uwa.uswine.admin.service.AdminService;
import com.uwa.uswine.adminseller.entity.AdminSellerEntity;
import com.uwa.uswine.adminseller.service.AdminSellerService;
import com.uwa.uswine.mypage.sellerRigist.entity.SellerRegistEntity;
import com.uwa.uswine.user.dto.MailDTO;
import com.uwa.uswine.user.entity.UserEntity;
import com.uwa.uswine.user.service.JoinService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	AdminService adminService;
	@Autowired
	JoinService joinService;
	@Autowired
	AdminSellerService sellerService;

	private final CommentService commentService;
	private final ReCommentService reCommentService;

	public AdminController(CommentService commentService, ReCommentService reCommentService){
		this.commentService = commentService;
		this.reCommentService = reCommentService;
	}

	@PostMapping("getCommentCount")
	public List<Long> getCommentCount(@RequestBody Map<String, Object> boardIdList){

		List<Integer> list = (List<Integer>) boardIdList.get("boardIDList");

		List<Long> allCountList = new ArrayList<>();

		for(int i=0; i<list.size(); i++){

			String idx = String.valueOf(list.get(i));
			long commentCount = commentService.countComment(idx);
			long recommentCount = reCommentService.getCountReComments(idx);

			long allCount = commentCount + recommentCount;

			allCountList.add(allCount);
		}


		return allCountList;
	}


	@PostMapping("updateBoardDetail")
	public String updateBoardDetail (@RequestBody Map<String, Object> param){

		String temp = (String) param.get("boardID");
		int temp2 = Integer.parseInt(temp);

		Long boardID = (long) temp2;

		adminService.updateBoardDetail(boardID);

		return null;
	}


	@PostMapping("updteBoardComments")
	public String updateBoardComments(@RequestBody Map<String, Object> params){

		Map<String, Object> commentCheckList = (Map<String, Object>) params.get("commentChecklist");
		Map<String, Object> recommentCheckList = (Map<String, Object>) params.get("recommentChecklist");


		String success = "0";

		for(Map.Entry<String, Object> commentCheck: commentCheckList.entrySet()){
			String key = commentCheck.getKey();
			Long id = (long) Integer.parseInt(key);
			Boolean value = (Boolean)commentCheck.getValue();

			if(value == false){
				continue;
			}else {this.adminService.updateBoardComment(id);}
		}

		for(Map.Entry<String, Object> recommentCheck: recommentCheckList.entrySet()){
			String key = recommentCheck.getKey();
			Long id = (long) Integer.parseInt(key);
			Boolean value = (Boolean)recommentCheck.getValue();

			if(value == false){
				continue;
			} else{
				this.adminService.updateBoardRecomment(id);
			}
		}

		success = "1";

		return success;
	}



	@PostMapping("getFreeBoardReComment")
	public ResponseEntity<List<ReCommentEntity>> getFreeBoardReComment(@RequestBody Map<String, String> param){

		String boardID = param.get("boardID");

		return ResponseEntity.ok(this.adminService.getReComment(boardID));

	}


	@PostMapping("getFreeBoardComment")
	public ResponseEntity<List<CommentEntity>> getFreeBoardComment(@RequestBody Map<String, String> param){

		String id = param.get("boardID");

		return ResponseEntity.ok(this.adminService.getComment(id));
	}

	@PostMapping("getFreeBoard")
	public ResponseEntity<Optional<BoardEntity>> getFreeBoard(@RequestBody Map<String, String> param){

		Long id = Long.valueOf(param.get("boardID"));

		return ResponseEntity.ok(this.adminService.getBoard(id));
	}

	@PostMapping("adminBoardlist")
	public Page<BoardEntity> getBoardList(@RequestBody Map<String, Object> page){
		int currentpage = (int) page.get("page");
		int size = 10;

		int searchType = (int)page.get("searchType");
		String searchKeyword = (String)page.get("searchKeyword");

		return this.adminService.getboardList(currentpage, size, searchType, searchKeyword);
	}

	@PostMapping("updateBoard")
	public String updateBoard(@RequestBody Map<String, Object> checklist){

		ArrayList<Long> truelist = new ArrayList<>();

		String finish = "0";

		for(Map.Entry<String, Object> check: checklist.entrySet()){
			String key = check.getKey();
			Map<String, Object> value = (Map<String, Object>) check.getValue();

			for(Map.Entry<String, Object> num: value.entrySet()){
				Long id = Long.valueOf(num.getKey());
				Boolean checked = (Boolean) num.getValue();

				if(checked == false){
					continue;
				}

				truelist.add(id);
				finish = "1";
			}
		}

		adminService.updateBoard(truelist);
		return finish;
	}


	@PostMapping("/List")
	public Page<UserEntity> getUserList(@RequestBody UserSearchDTO userSearch){
		Page<UserEntity> userList = adminService.getUserList(userSearch);
		return userList;
	}
	
	@PostMapping("/Delete")
	public int deleteUser(@RequestBody Map<String,Object> users) {
		@SuppressWarnings("unchecked")
		Map<String,Boolean> getUsers=(Map<String,Boolean>)users.get("users");
		for(Map.Entry<String, Boolean> entry : getUsers.entrySet()) {
			String userNick=entry.getKey();
			adminService.deleteUser(userNick);
		}
		return 1;
	}
	
	@PostMapping("/Update")
	public int updateUser(@RequestBody Map<String, Object> user) {
		String changeNick = (String)user.get("changeNick");
		String changeRole = (String)user.get("changeRole");
		@SuppressWarnings("unchecked")
		Map<String,String> updatedUser = (Map<String,String>)user.get("user");
		String userNick = updatedUser.get("nickname");
		if(changeRole.equals("seller")) {
			SellerRegistEntity sr_entity = sellerService.findRegist(userNick);
			if(sr_entity==null) {
				return -1;
			}
		}
		adminService.updateUser(changeNick,changeRole,userNick);
		return 1;
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("/UpdateUsers")
	public int udateUsers(@RequestBody Map<String,Object> users) {
		Map<String,Boolean> getUsers=(Map<String,Boolean>)users.get("users");
		Map<String,String> changeRoles = (Map<String,String>)users.get("userChangeRoles");
		Map<String,String> changeNicks = (Map<String,String>)users.get("userChangeNicks");
		for(Map.Entry<String, Boolean> entry : getUsers.entrySet()) {
			String userNick=entry.getKey();
			String changeRole = (String)changeRoles.get(userNick);
			if(changeRole.equals("seller")) {
				AdminSellerEntity s_entity = sellerService.findSeller(userNick);
				if(s_entity==null) {
					SellerRegistEntity sr_entity = sellerService.findRegist(userNick);
					if(sr_entity==null) {
						return -1;
					}
				}
			}
		}
		for(Map.Entry<String, Boolean> entry : getUsers.entrySet()) {
			String userNick=entry.getKey();
			String changeNick = (String)changeNicks.get(userNick);
			String changeRole = (String)changeRoles.get(userNick);
			adminService.updateUser(changeNick,changeRole,userNick);
		}
		return 1;
	}
	
	@PostMapping("SellerRequest")
	public Page<SellerRegistEntity> getSellerRequest(@RequestBody Map<String,Object> map){
		int page=Integer.parseInt((String)map.get("currentPage"));
		Page<SellerRegistEntity> sellerRequest = adminService.getSellerRequest(page-1);
		return sellerRequest;
	}
	@PostMapping("RequestConfirm")
	public int requestConfirm(@RequestBody Map<String,String> map) {
		String email = map.get("email");
		sellerService.requestConfirm(email);
		MailDTO sendMail = new MailDTO();
		sendMail.setAddress(email);
		sendMail.setTitle("판매자 자격 승인요청이 승인되었습니다.");
		sendMail.setMessage("이제 판매자 권한을 가지고 상품을 등록하실수 있습니다");
		joinService.mailSend(sendMail);
		return 1;
	}
	
	@PostMapping("DeniedConfirm")
	public int deniedConfrim(@RequestBody Map<String,String> map) {
		String email = map.get("email");
		sellerService.deniedConfirm(email);
		MailDTO sendMail = new MailDTO();
		String denied_reason = "";
		sendMail.setAddress(email);
		sendMail.setTitle("판매자 자격 승인요청이 거절되었습니다.");
		sendMail.setMessage("거절 사유: "+denied_reason);
		joinService.mailSend(sendMail);
		return 1;
	}
	
	
	
	
	@PostMapping("NoticeWrite")
	public int noticeWrite(@RequestBody AdminNoticeDTO dto) {
		NoticeEntity entity = dto.toEntity();
		entity.setHits(0);
		
		try {
			adminService.noticeWrite(entity);
		} catch (Exception e) {
			System.out.println(e);
			return -1;
		}
		return 1;
	}
	
	@PostMapping("NoticeList")
	public Map<String, Object>  getNoticeList(@RequestBody Map <String,String> map){
		int page = Integer.parseInt(map.get("currentPage"));
		Page<NoticeEntity> notice_List = adminService.getNoticeList(page-1);
		Map<String, Long> comment_map = new HashMap<String,Long>();
		Map<String, Long> recomment_map = new HashMap<String,Long>();
		Map<String, Object> return_map = new HashMap<String,Object>();
		for(NoticeEntity entity : notice_List) {
			String id = entity.getId()+"";
			Long comment_count =adminService.adminCommentCount(id);
			Long recomment_count =adminService.adminRecommentCount(id);
			comment_map.put(id, comment_count);
			recomment_map.put(id, recomment_count);
		}
		return_map.put("notice_List", notice_List);
		return_map.put("comment_map", comment_map);
		return_map.put("recomment_map", recomment_map);
		return return_map;
	}
	@PostMapping("getNotice")
	public NoticeEntity getNotice(@RequestBody Map<String,String> map) {
		int intid = Integer.parseInt(map.get("id"));
		Long id = (long) intid;
		
		NoticeEntity entity = adminService.getNotice(id);
		return entity;
	}
	@PostMapping("getCommentList")
	public Map<String,Object> getNoticeComment(@RequestBody Map<String,String> map){
		String id = map.get("id");
		int page =Integer.parseInt(map.get("currentPage"));
		
		Map<String, Object> returnMap = new HashMap<String,Object>();
		Page<NoticeCommentEntity> commentList = adminService.getNoticeComment(id,page-1);
		
		returnMap.put("commentList", commentList);
		for(NoticeCommentEntity entity : commentList) {
			List<NoticeRecommentEntity> recommentList = adminService.getNoticeRecomment(entity);
			int inotice_comment_id = (int)entity.getId();
			String notice_comment_id = Integer.toString(inotice_comment_id);
			returnMap.put(notice_comment_id, recommentList);
		}
		
		return returnMap;
	}
	
	@PostMapping("deleteNotice")
	public int deleteNotice(@RequestBody Map<String,String> map) {
		Long id = (long)Integer.parseInt(map.get("id").split("_")[1]); 
		adminService.deleteNotice(id);
		return 1;	
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("deleteNoticeComment")
	public int deleteNoticeComment(@RequestBody Map <String,Object> map) {
		Map<String, Boolean> recommentCheck = (Map<String,Boolean>)map.get("recommentCheck");
		for(Map.Entry<String, Boolean> entry : recommentCheck.entrySet()) {
			String sid=entry.getKey().split("_")[1];
			Long id = (long)Integer.parseInt(sid);
			 
			adminService.deleteRecomment(id);
		}
		Map<String, Boolean> commentCheck = (Map<String,Boolean>)map.get("commentCheck");
		for(Map.Entry<String, Boolean> entry : commentCheck.entrySet()) {
			String sid=entry.getKey().split("_")[1];
			Long id = (long)Integer.parseInt(sid);
			adminService.deleteComment(id);
		}
		return 1;
	}
	
	@PostMapping("adminRecommentCount")
	public long adminRecommentCount(@RequestBody Map<String,String> map) {
		String id = map.get("id");
		return adminService.adminRecommentCount(id);
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("wineInsert")
	public int wineInsert(@RequestBody Map<String,Object> map) {
		System.out.println(map);
		List<String> wine_info = (List<String>)map.get("wineInfo");
		String wine_name = (String)map.get("wineName");
		String wine_name_en = (String)map.get("wineNameEN");
		String wine_image = (String)map.get("uploadImgUrtl");
		List<Object> wine_taste = (List<Object>)map.get("wineTaste");
		List<String> wine_aroma = (List<String>)map.get("insertAromas");
		
		Map<String,String> wine_detail_info = new HashMap<String,String>();
		String manufacturer = (String)map.get("manufacturer");
		String wine_country_city = (String)map.get("wine_country_city");
		String wineVariety = (String)map.get("wineVariety");
		String wineStyle = (String)map.get("wineStyle");
		String wineBrewing = (String)map.get("wineBrewing");
		String wineMature = (String)map.get("wineMature");
		String wineAlcohol = (String)map.get("wineAlcohol");
		String wineTemperature = (String)map.get("wineTemperature");
		String wineImporter = (String)map.get("wineImporter");
		if(!manufacturer.equals("")) {
			wine_detail_info.put("생산자", manufacturer);
		}
		if(!wine_country_city.equals("")) {
			wine_detail_info.put("국가/생산지역", wine_country_city);
		}
		if(!wineVariety.equals("")) {
			wine_detail_info.put("주요품종", wineVariety);
		}
		if(!wineStyle.equals("")) {
			wine_detail_info.put("스타일", wineStyle);
		}
		if(!wineBrewing.equals("")) {
			wine_detail_info.put("양조", wineBrewing);
		}
		if(!wineMature.equals("")) {
			wine_detail_info.put("숙성", wineMature);
		}
		if(!wineAlcohol.equals("")) {
			wine_detail_info.put("알코올", wineAlcohol);
		}
		if(!wineTemperature.equals("")) {
			wine_detail_info.put("음용온도", wineTemperature);
		}
		if(!wineImporter.equals("")) {
			wine_detail_info.put("수입사", wineImporter);
		}
		
		
		String wine_note = (String)map.get("wineNote");
		
		WineInsertDTO dto = new WineInsertDTO();
		dto.setWine_info(wine_info);
		dto.setWine_name(wine_name);
		dto.setWine_name_en(wine_name_en);
		dto.setWine_image(wine_image);
		dto.setWine_taste(wine_taste);
		dto.setWine_aroma(wine_aroma);
		dto.setWine_detail_info(wine_detail_info);
		dto.setWine_note(wine_note);
		
		int rs = adminService.insertWine(dto);
		return rs; 
	}
	@PostMapping("wineDelete")
	public int wineDelete(@RequestBody Map<String,String> map) {
		String id = map.get("id");
		int rs = adminService.deleteWine(id);
		return rs;
	}
}
