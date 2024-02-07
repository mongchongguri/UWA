package com.uwa.uswine.user.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.uwa.uswine.user.dto.MailDTO;
import com.uwa.uswine.user.dto.UserRequestDTO;
import com.uwa.uswine.user.entity.Role;
import com.uwa.uswine.user.service.JoinService;



@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	JoinService joinService;

	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	@PostMapping("/join")
	public String join(@RequestBody UserRequestDTO data) {
		data.setPassword(bCryptPasswordEncoder.encode(data.getPassword()));
		data.setRole(Role.ROLE_USER);
		try {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			data.setJoindate(dateFormat.format(new Date()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		int rs =joinService.saveMember(data.toEntity());
		if(rs==1) {
			return "join successful";
		}else {
			return "join failed";
		}
	}
	
	@PostMapping("/sendEmail")
	public String execMail(@RequestBody MailDTO md) {
		Random random = new Random();
		String num = "";
		for(int i = 0;i<6;i++) {
			num+=random.nextInt(10);
		}
		md.setTitle("인증번호 요청입니다. 인증번호: "+num);
		md.setMessage("인증번호 : "+num);
		joinService.mailSend(md);
		return num;
	}
	
	@PostMapping("/checkNickName")
	public int checkNickname(@RequestBody Map<String,String> map) {
		String nickname = map.get("nickname");
		
		return joinService.checkNickName(nickname);
	}
	


	
	
	
	
//	페이징확인용 유저추가메소드
//	@PostMapping("/Add")
//	public int addUser(@RequestBody String add) {
//		for(int i=9;i<=100;i++) {
//			UserRequestDTO user = new UserRequestDTO();
//			user.setAddress("임시 주소입니다");
//			user.setEmail("pagingCheckuser"+i+"@user");
//			user.setPassword(bCryptPasswordEncoder.encode("1234"));
//			try {
//				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//				user.setJoindate(dateFormat.format(new Date()));
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//			user.setNickname("pagingCheckuser"+i);
//			user.setPhone("0101234567"+i);
//			user.setRole(Role.ROLE_USER);
//			joinService.addUser(user.toEntity());			
//		}
//		return 1;
//	}
}
