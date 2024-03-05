package com.uwa.uswine.event.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDTO {
    private Long id;
    private String title;
    private String content;
    private String nickname;
    private LocalDateTime writeDate;
    private LocalDateTime endDate;
}
