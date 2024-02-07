package com.uwa.uswine.admin.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.uwa.uswine.admin.entity.NoticeEntity;


public interface NoticeRepository extends JpaRepository<NoticeEntity, Long> {
	Page<NoticeEntity> findAll(Pageable pageable);
}
