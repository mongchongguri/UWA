package com.uwa.uswine.user.dto;





import com.uwa.uswine.user.entity.Role;
import com.uwa.uswine.user.entity.UserEntity;

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
    private String joindate;
    
    public UserEntity toEntity() {
    	UserEntity user_entity = new UserEntity();
    	user_entity.setAddress(this.address);
    	user_entity.setEmail(this.email);
    	user_entity.setNickname(this.nickname);
    	user_entity.setPassword(this.password);
    	user_entity.setPhone(this.phone);
    	user_entity.setRole(this.role);
    	user_entity.setJoindate(this.joindate);
        return user_entity;
    }
}
