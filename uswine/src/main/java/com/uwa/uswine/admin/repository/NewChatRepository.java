package com.uwa.uswine.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uwa.uswine.admin.entity.NewChatEntity;


public interface NewChatRepository extends JpaRepository<NewChatEntity, Long>{
	NewChatEntity findByUserNickname(String userNickname);
}
