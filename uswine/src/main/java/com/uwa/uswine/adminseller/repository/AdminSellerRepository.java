package com.uwa.uswine.adminseller.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uwa.uswine.adminseller.entity.AdminSellerEntity;



public interface AdminSellerRepository extends JpaRepository<AdminSellerEntity, Long> {
	AdminSellerEntity findByEmail(String email);
}
