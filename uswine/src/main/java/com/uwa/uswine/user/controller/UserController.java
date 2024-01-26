package com.uwa.uswine.user.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.uwa.uswine.user.dto.MailDTO;
import com.uwa.uswine.user.dto.UserRequestDTO;
import com.uwa.uswine.user.dto.UserSearchDTO;
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
	
	@PostMapping("/List")
	public List<String> getUserList(@RequestBody UserSearchDTO userSerch){
		List<String> userList = new ArrayList<String>();
		return userList;
	}
	
	@PostMapping("/logout")
	public String logout(){

		System.out.println("Arrive at logout");

		return "http://localhost:3000/";
	}


}
