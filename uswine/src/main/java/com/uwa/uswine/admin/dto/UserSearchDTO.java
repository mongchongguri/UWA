package com.uwa.uswine.admin.dto;


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
	private String searchStartDate;
	private String searchEndDate;
	private int page;
	private String searchDESC;
}
