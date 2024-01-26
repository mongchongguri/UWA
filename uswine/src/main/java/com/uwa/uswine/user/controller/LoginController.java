package com.uwa.uswine.user.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class LoginController {
	
	@GetMapping("login")
	public int getLoginPage() {
		System.out.println("read");
        return -1; // 리액트의 로그인 페이지 URL로 리다이렉션
    }
}
