package com.uwa.uswine.event;

import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uwa.uswine.event.dto.EventDTO;
import com.uwa.uswine.event.entity.EventEntity;
import com.uwa.uswine.event.service.EventService;

@RestController
@RequestMapping("/api/event")
public class UserEventController {
	
	private final EventService eventService;

    public UserEventController(EventService eventService){
        this.eventService = eventService;
    }

    @PostMapping("getEventList")
    public Page<EventEntity> getEventList(@RequestBody Map<String, String> param){

        int currentPage = Integer.parseInt(param.get("page"));

        return eventService.getEventList(currentPage);
    }
    
    @PostMapping("detail")
    public Optional<EventEntity> getEvent(@RequestBody EventDTO dto){
        return eventService.getEvent(dto);
    }
}
