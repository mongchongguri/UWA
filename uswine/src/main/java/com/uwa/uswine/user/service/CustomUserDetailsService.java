package com.uwa.uswine.user.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.uwa.uswine.user.dto.CustomUserDetails;
import com.uwa.uswine.user.entity.UserEntity;
import com.uwa.uswine.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

//    public CustomUserDetailsService(UserRepository userRepository){
//            this.userRepository = userRepository;
//    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        //DB에서 유저 유무 조회
        UserEntity userData = userRepository.findByEmail(username);

        if(userData != null){
            //UserDetails에 담아서 return -> AuthenticationManager가 검증함
            return new CustomUserDetails(userData);
        }

        return null;
    }
}
