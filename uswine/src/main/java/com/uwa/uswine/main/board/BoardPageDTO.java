package com.uwa.uswine.main.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BoardPageDTO {
    private Integer currentPage;
    private Integer viewPageNum;
    private Integer searchType;
    private String searchKeyword;
}
