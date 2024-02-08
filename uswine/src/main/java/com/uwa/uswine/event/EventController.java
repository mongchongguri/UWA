package com.uwa.uswine.event;

import com.uwa.uswine.event.dto.EventDTO;
import com.uwa.uswine.event.entity.EventEntity;
import com.uwa.uswine.event.service.EventService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/event")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService){
        this.eventService = eventService;
    }

    @PostMapping("getEventList")
    public Page<EventEntity> getEventList(@RequestBody Map<String, String> param){

        int currentPage = Integer.parseInt(param.get("page"));

        return eventService.getEventList(currentPage);
    }

    @PostMapping("create")
    public void createEvent(@RequestBody EventDTO event){
        eventService.createEvent(event);
    }

    @PostMapping("detail")
    public Optional<EventEntity> getEvent(@RequestBody EventDTO dto){
        return eventService.getEvent(dto);
    }

    @PostMapping("delete")
    public String deleteEvent(@RequestBody EventDTO dto){
        eventService.deleteEvent(dto);
        return "1";
    }

    @PostMapping("update")
    public String updateEvent(@RequestBody EventDTO dto){
        eventService.updateEvent(dto);
        return "1";
    }
}