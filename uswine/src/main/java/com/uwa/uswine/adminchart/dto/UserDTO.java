package com.uwa.uswine.adminchart.dto;

import com.uwa.uswine.user.entity.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private long id;
    private String email;
    private String password;
    private String nickname;
    private String address;
    private String phone;
    private String joindate;
    private Role role;
}
