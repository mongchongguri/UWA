package com.uwa.uswine.adminseller.service;

import com.uwa.uswine.adminseller.dto.MNWInfoWineSellDTO;
import com.uwa.uswine.adminseller.dto.MNWWineDTO;
import com.uwa.uswine.adminseller.repository.MNWInfoWineJPARepository;
import com.uwa.uswine.adminseller.repository.MNWInfoWineMongoRepository;
import com.uwa.uswine.adminseller.repository.MNWSellWineSqlMongoRepository;
import com.uwa.uswine.adminseller.repository.MNWSellWineSqlRepository;
import com.uwa.uswine.main.wine.entity.WineEntity;
import com.uwa.uswine.seller.InfoWine.entity.InfoWineSellEntity;
import com.uwa.uswine.seller.sellWine.dto.SellWineDTO;
import com.uwa.uswine.seller.sellWine.dto.SellWineSQLDTO;
import com.uwa.uswine.seller.sellWine.entity.SellWineEntity;
import com.uwa.uswine.seller.sellWine.entity.SellWineSqlEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MNWInfoWineService {

    private final MNWInfoWineJPARepository infoWineJPARepository;
    private final MNWInfoWineMongoRepository infoWineMongoRepository;
    private final MNWSellWineSqlRepository sellWineSqlRepository;
    private final MNWSellWineSqlMongoRepository sellWineSqlMongoRepository;

    public MNWInfoWineService(MNWInfoWineJPARepository infoWineJPARepository,
            MNWInfoWineMongoRepository infoWineMongoRepository, MNWSellWineSqlRepository sellWineSqlRepository,
            MNWSellWineSqlMongoRepository sellWineSqlMongoRepository) {
        this.infoWineJPARepository = infoWineJPARepository;
        this.infoWineMongoRepository = infoWineMongoRepository;
        this.sellWineSqlRepository = sellWineSqlRepository;
        this.sellWineSqlMongoRepository = sellWineSqlMongoRepository;
    }

    public List<MNWWineDTO> getWineList(List<String> itemIdList) {

        List<MNWWineDTO> wineList = new ArrayList<>();

        for (String itemId : itemIdList) {
            WineEntity entity = infoWineMongoRepository.findById(itemId).block();
            MNWWineDTO dto = new MNWWineDTO();
            dto.setWine_idx(entity.getWine_idx());
            dto.setWine_info(entity.getWine_info());
            dto.setWine_name(entity.getWine_name());
            dto.setWine_name_en(entity.getWine_name_en());
            dto.setWine_image(entity.getWine_image());
            dto.setWine_taste(entity.getWine_taste());
            dto.setWine_detail_info(entity.getWine_detail_info());
            dto.setWine_region_info(entity.getWine_region_info());
            dto.setWine_note(entity.getWine_note());
            dto.setWine_aroma(entity.getWine_aroma());
            wineList.add(dto);
        }

        return wineList;
    }

    public List<MNWInfoWineSellDTO> getWineInfo(int page) {

        int size = 20;
        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("id"));

        Pageable pageable = PageRequest.of(page, size, Sort.by(sorts));

        List<MNWInfoWineSellDTO> dataList = new ArrayList<>();

        Page<InfoWineSellEntity> data = infoWineJPARepository.findAll(pageable);

        for (InfoWineSellEntity entity : data) {
            MNWInfoWineSellDTO dto = new MNWInfoWineSellDTO();
            System.out.println("Entity: " + entity);
            dto.setId(entity.getId());
            dto.setAddress(entity.getAddress());
            dto.setDetailAddress(entity.getDetailAddress());
            dto.setEmail(entity.getEmail());
            dto.setItemId(entity.getItemId());
            dto.setNickname(entity.getNickname());
            dto.setPhone(entity.getPhone());
            dto.setSellDate(entity.getSellDate());
            dto.setSellMoney(entity.getSellMoney());
            dto.setSellStock(entity.getSellStock());
            dataList.add(dto);
        }

        return dataList;
    }

    public MNWInfoWineSellDTO getWineInfo(MNWInfoWineSellDTO dto) {

        Long id = dto.getId();

        Optional<InfoWineSellEntity> entity = infoWineJPARepository.findById(id);

        MNWInfoWineSellDTO returnDTO = new MNWInfoWineSellDTO();
        returnDTO.setAddress(entity.get().getAddress());
        returnDTO.setDetailAddress(entity.get().getDetailAddress());
        returnDTO.setEmail(entity.get().getEmail());
        returnDTO.setItemId(entity.get().getItemId());
        returnDTO.setNickname(entity.get().getNickname());
        returnDTO.setPhone(entity.get().getPhone());
        returnDTO.setSellDate(entity.get().getSellDate());
        returnDTO.setSellMoney(entity.get().getSellMoney());
        returnDTO.setSellStock(entity.get().getSellStock());

        return returnDTO;
    }

    public MNWWineDTO getWine(String itemId) {

        WineEntity entity = infoWineMongoRepository.findById(itemId).block();

        MNWWineDTO dto = new MNWWineDTO();
        dto.setWine_idx(entity.getWine_idx());
        dto.setWine_info(entity.getWine_info());
        dto.setWine_name(entity.getWine_name());
        dto.setWine_name_en(entity.getWine_name_en());
        dto.setWine_image(entity.getWine_image());
        dto.setWine_taste(entity.getWine_taste());
        dto.setWine_detail_info(entity.getWine_detail_info());
        dto.setWine_region_info(entity.getWine_region_info());
        dto.setWine_note(entity.getWine_note());
        dto.setWine_aroma(entity.getWine_aroma());

        return dto;
    }

    public List<SellWineSQLDTO> getSellerWineList(int page) {

        int size = 20;
        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("id"));

        Pageable pageable = PageRequest.of(page, size, Sort.by(sorts));

        List<SellWineSQLDTO> dataList = new ArrayList<>();

        Page<SellWineSqlEntity> data = sellWineSqlRepository.findAll(pageable);

        for (SellWineSqlEntity entity : data) {
            SellWineSQLDTO dto = new SellWineSQLDTO();
            dto.setId(entity.getId());
            dto.setEmail(entity.getEmail());
            dto.setMongoId(entity.getMongoId());
            dto.setNickname(entity.getNickname());
            dto.setSellMoney(entity.getSellMoney());
            dto.setSelldate(entity.getSelldate());
            dto.setWineImageURL(entity.getWineImageURL());
            dto.setWineName(entity.getWineName());
            dto.setWineNameEn(entity.getWineNameEn());
            dto.setWineRegion(entity.getWineRegion());
            dto.setWineType(entity.getWineType());
            dto.setStock(entity.getStock());
            dataList.add(dto);
        }

        return dataList;
    }

    public List<SellWineDTO> getSellerWineList(List<String> mongoId) {

        List<SellWineDTO> mongo = new ArrayList<>();

        for (String id : mongoId) {
            SellWineEntity entity = sellWineSqlMongoRepository.findById(id).block();
            SellWineDTO dto = new SellWineDTO();
            dto.setNickName(entity.getNickName());

            dto.setPhone(entity.getPhone());
            dto.setSellerInfo(entity.getSellerInfo());
            dto.setSellMoney(entity.getSellMoney());
            dto.setPostCode(entity.getPostCode());
            dto.setAddress(entity.getAddress());
            dto.setWineImageURL(entity.getWineImageURL());
            dto.setWineType(entity.getWineType());
            dto.setWineName(entity.getWineName());
            dto.setWineNameEn(entity.getWineNameEn());
            dto.setWineInfo(entity.getWineInfo());
            dto.setAddInfo(entity.getAddInfo());
            dto.setWineTaste(entity.getWineTaste());
            dto.setWineAroma(entity.getWineAroma());
            dto.setWineRegion(entity.getWineRegion());
            dto.setAlcohol(entity.getAlcohol());
            dto.setWineMaker(entity.getWineMaker());
            dto.setWineVarieties(entity.getWineVarieties());
            dto.setWineStyle(entity.getWineStyle());
            dto.setWineBrewing(entity.getWineBrewing());
            dto.setWineTemp(entity.getWineTemp());
            dto.setWineIncome(entity.getWineIncome());
            mongo.add(dto);
        }

        return mongo;
    }

    public int deleteMDWine(Long id) {
        Optional<InfoWineSellEntity> entity = infoWineJPARepository.findById(id);

        InfoWineSellEntity saveEntity = new InfoWineSellEntity();
        saveEntity.setId(entity.get().getId());
        saveEntity.setAddress(entity.get().getAddress());
        saveEntity.setDetailAddress(entity.get().getDetailAddress());
        saveEntity.setEmail(entity.get().getEmail());
        saveEntity.setItemId(entity.get().getItemId());
        saveEntity.setNickname(entity.get().getNickname());
        saveEntity.setPhone(entity.get().getPhone());
        saveEntity.setSellDate(entity.get().getSellDate());
        saveEntity.setSellMoney(entity.get().getSellMoney());
        saveEntity.setSellStock("0");

        infoWineJPARepository.save(saveEntity);

        return 1;
    }

    public SellWineSQLDTO getSellerWineInfo(SellWineSQLDTO dto) {

        Optional<SellWineSqlEntity> entity = sellWineSqlRepository.findById(dto.getId());

        SellWineSQLDTO rdto = new SellWineSQLDTO();
        rdto.setId(entity.get().getId());
        rdto.setEmail(entity.get().getEmail());
        rdto.setMongoId(entity.get().getMongoId());
        rdto.setNickname(entity.get().getNickname());
        rdto.setSellMoney(entity.get().getSellMoney());
        rdto.setSelldate(entity.get().getSelldate());
        rdto.setWineImageURL(entity.get().getWineImageURL());
        rdto.setWineName(entity.get().getWineName());
        rdto.setWineNameEn(entity.get().getWineNameEn());
        rdto.setWineRegion(entity.get().getWineRegion());
        rdto.setWineType(entity.get().getWineType());

        return rdto;
    }

    public SellWineDTO getSellerWineMongo(String mongoId) {

        SellWineEntity entity = sellWineSqlMongoRepository.findById(mongoId).block();

        SellWineDTO dto = new SellWineDTO();
        dto.setNickName(entity.getNickName());
        dto.setPhone(entity.getPhone());
        dto.setSellerInfo(entity.getSellerInfo());
        dto.setSellMoney(entity.getSellMoney());
        dto.setPostCode(entity.getPostCode());
        dto.setAddress(entity.getAddress());
        dto.setWineImageURL(entity.getWineImageURL());
        dto.setWineType(entity.getWineType());
        dto.setWineName(entity.getWineName());
        dto.setWineNameEn(entity.getWineNameEn());
        dto.setWineInfo(entity.getWineInfo());
        dto.setAddInfo(entity.getAddInfo());
        dto.setWineTaste(entity.getWineTaste());
        dto.setWineAroma(entity.getWineAroma());
        dto.setWineRegion(entity.getWineRegion());
        dto.setAlcohol(entity.getAlcohol());
        dto.setWineMaker(entity.getWineMaker());
        dto.setWineBrewing(entity.getWineBrewing());
        dto.setWineTemp(entity.getWineTemp());
        dto.setWineIncome(entity.getWineIncome());

        return dto;
    }

    public void deleteSellerSqlWine(Long id) {
        Optional<SellWineSqlEntity> entity = sellWineSqlRepository.findById(id);

        SellWineSqlEntity saveEntity = new SellWineSqlEntity();
        saveEntity.setId(entity.get().getId());
        saveEntity.setEmail(entity.get().getEmail());
        saveEntity.setMongoId(entity.get().getMongoId());
        saveEntity.setNickname(entity.get().getNickname());
        saveEntity.setSellMoney(entity.get().getSellMoney());
        saveEntity.setSelldate(entity.get().getSelldate());
        saveEntity.setWineImageURL(entity.get().getWineImageURL());
        saveEntity.setWineName(entity.get().getWineName());
        saveEntity.setWineNameEn(entity.get().getWineNameEn());
        saveEntity.setWineRegion(entity.get().getWineRegion());
        saveEntity.setWineType(entity.get().getWineType());
        saveEntity.setSellState(entity.get().getSellState());
        saveEntity.setStock("0");

        sellWineSqlRepository.save(saveEntity);
    }
}
