package com.uwa.uswine.adminseller.repository;


import com.uwa.uswine.seller.InfoWine.entity.InfoWineSellEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MNWInfoWineJPARepository extends JpaRepository<InfoWineSellEntity, Long> {

}
