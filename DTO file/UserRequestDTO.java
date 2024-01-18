package com.project.user.DTO;


import com.project.user.entity.Role;
import com.project.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
	private Role role;
    private String email;
    private String address;
    private String nickname;
    private String password;
    private String phone;
    
    public User toEntity() {
        return User.builder()
                .role(this.role)
                .email(this.email)
                .password(this.password)
                .nickname(this.nickname)
                .address(this.address)
                .phone(this.phone)
                .build();
    }
}
