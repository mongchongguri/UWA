package com.uwa.uswine.main.notice;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NoticePageDTO {
    private Integer currentPage;
    private Integer viewPageNum;
}
