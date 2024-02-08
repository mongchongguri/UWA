package com.uwa.uswine.event.repository;

import com.uwa.uswine.event.entity.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<EventEntity, Long> {



}
