package com.project.user.DTO;


import com.project.user.entity.User;

import lombok.Data;

@Data
public class UserResponseDTO {
    private Long id;
    private String role;
    private String email;
    private String nickname;
    private String address;
    private String phone;
    
    public UserResponseDTO(User entity) {
    	this.id = entity.getId();
        this.email = entity.getEmail();
        this.nickname = entity.getNickname();
        this.address = entity.getAddress();
        this.phone = entity.getPhone();
        // Enum -> String
        this.role = entity.getRole().name();
    }

}
