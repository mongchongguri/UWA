package com.uwa.uswine.event.service;

import com.uwa.uswine.event.dto.EventDTO;
import com.uwa.uswine.event.entity.EventEntity;
import com.uwa.uswine.event.repository.EventRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    public void createEvent(EventDTO event){

        EventEntity entity = new EventEntity();
        entity.setTitle(event.getTitle());
        entity.setContent(event.getContent());
        entity.setNickname(event.getNickname());
        entity.setWriteDate(event.getWriteDate());
        entity.setEndDate(event.getEndDate());
        eventRepository.save(entity);
    }

    public Page<EventEntity> getEventList(int currentPage) {

        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("writeDate"));

        int size = 10;
        Pageable pageable = PageRequest.of(currentPage, size, Sort.by(sorts));

        return eventRepository.findAll(pageable);
    }

    public Optional<EventEntity> getEvent(EventDTO dto) {
        Long id = dto.getId();
        return eventRepository.findById(id);
    }

    public void deleteEvent(EventDTO dto) {
        Long id = dto.getId();
        eventRepository.deleteById(id);
    }

    public void updateEvent(EventDTO dto) {

        System.out.println(dto);
        eventRepository.findById(dto.getId()).ifPresent(entity -> {
            entity.setTitle(dto.getTitle());
            entity.setContent(dto.getContent());
            entity.setNickname("admin");
            entity.setWriteDate(LocalDateTime.now());
            entity.setEndDate(dto.getEndDate());
            System.out.println(entity);
            eventRepository.save(entity);
        });
    }
}
