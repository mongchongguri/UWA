package com.uwa.uswine.user.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.uwa.uswine.user.dto.MailDTO;
import com.uwa.uswine.user.entity.UserEntity;
import com.uwa.uswine.user.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class JoinService {
	private final UserRepository userRepository;
	private JavaMailSender javaMailSender;
	
	public int saveMember(UserEntity data) {
		try {
            userRepository.save(data);
            return 1; // 저장 성공을 나타내는 값
        } catch (Exception e) {
            // 데이터베이스 저장 실패 시 예외 처리
            return -1; // 실패를 나타내는 값
        }
	}
	
	public void mailSend(MailDTO mailDto) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(mailDto.getAddress());
		message.setSubject(mailDto.getTitle());
		message.setText(mailDto.getMessage());
		javaMailSender.send(message);
	}

	public int checkNickName(String nickname) {
		UserEntity entity = userRepository.findByNickname(nickname);
		if(entity==null) {
			return -1;
		}
		return 1;
	}
	
}
