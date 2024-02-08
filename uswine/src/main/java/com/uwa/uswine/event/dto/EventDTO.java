package com.uwa.uswine.event.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class EventDTO {
    private Long id;
    private String title;
    private String content;
    private String nickname;
    private LocalDateTime writeDate;
    private LocalDateTime endDate;
}
