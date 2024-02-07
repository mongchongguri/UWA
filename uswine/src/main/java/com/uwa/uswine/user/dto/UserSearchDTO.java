package com.uwa.uswine.user.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSearchDTO {
	private String searchType;
	private String searchWord;
	private String searchGroup;
}
