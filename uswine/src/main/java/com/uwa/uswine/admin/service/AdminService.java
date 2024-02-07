package com.uwa.uswine.admin.service;



import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.uwa.uswine.admin.dto.UserSearchDTO;
import com.uwa.uswine.admin.dto.WineInsertDTO;
import com.uwa.uswine.admin.entity.NoticeCommentEntity;
import com.uwa.uswine.admin.entity.NoticeEntity;
import com.uwa.uswine.admin.entity.NoticeRecommentEntity;
import com.uwa.uswine.admin.repository.NoticeCommentRepository;
import com.uwa.uswine.admin.repository.NoticeRecommentRepository;
import com.uwa.uswine.admin.repository.NoticeRepository;
import com.uwa.uswine.adminseller.service.AdminSellerService;
import com.uwa.uswine.main.wine.entity.WineEntity;
import com.uwa.uswine.main.wine.repository.WineListRepository;
import com.uwa.uswine.mypage.sellerRigist.entity.SellerRegistEntity;
import com.uwa.uswine.mypage.sellerRigist.repository.SellerRegistRepository;
import com.uwa.uswine.user.entity.Role;
import com.uwa.uswine.user.entity.UserEntity;
import com.uwa.uswine.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminService {
	
	@Autowired
	AdminSellerService sellerService;
	
	private final UserRepository userRepository;
	private final SellerRegistRepository sellerRegistRepository;
	private final NoticeRepository noticeRepository;
	private final NoticeCommentRepository noticeCommentRepository;
	private final NoticeRecommentRepository noticeRecommentRepository;
	private final WineListRepository wineListRepository;
	
	public Page<UserEntity> getUserList(UserSearchDTO userSearch) {
		Page<UserEntity> returnList = null;
		List<UserEntity> userList = null;
		int pageNumber = userSearch.getPage();
		int pageSize = 10;
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		String DESC = userSearch.getSearchDESC();
		String searchType = userSearch.getSearchType();
		String searchWord = userSearch.getSearchWord();
		String searchGroup = userSearch.getSearchGroup();
		int startDate = 0;
		int endDate = 0;
		
		if(searchType.equals("id")) {
			if(searchGroup.equals("all")) {
				if(DESC.equals("ASC")) {
					userList=userRepository.findByEmailContaining(searchWord);
				}else if(DESC.equals("DESC")){
					userList=userRepository.findByEmailContaining(searchWord,Sort.by(Sort.Direction.DESC,"email"));
				}else if(DESC.equals("ASC_date")) {
					userList=userRepository.findByEmailContaining(searchWord,Sort.by(Sort.Direction.ASC,"joindate"));
				}else if(DESC.equals("DESC_date")) {
					userList=userRepository.findByEmailContaining(searchWord,Sort.by(Sort.Direction.DESC,"joindate"));
				}
			}else if(searchGroup.equals("admin")) {
				if(DESC.equals("ASC")) {
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_ADMIN);
				}else if(DESC.equals("DESC")){
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_ADMIN,Sort.by(Sort.Direction.DESC,"email"));
				}else if(DESC.equals("ASC_date")) {
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_ADMIN,Sort.by(Sort.Direction.ASC,"joindate"));
				}else if(DESC.equals("DESC_date")) {
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_ADMIN,Sort.by(Sort.Direction.DESC,"joindate"));
				}
			}else if(searchGroup.equals("user")) {
				if(DESC.equals("ASC")) {
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_USER);
				}else if(DESC.equals("DESC")){
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_USER,Sort.by(Sort.Direction.DESC,"email"));
				}else if(DESC.equals("ASC_date")) {
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_USER,Sort.by(Sort.Direction.ASC,"joindate"));
				}else if(DESC.equals("DESC_date")) {
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_USER,Sort.by(Sort.Direction.DESC,"joindate"));
				}
			}else if(searchGroup.equals("seller")) {
				if(DESC.equals("ASC")) {
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_SELLER);
				}else if(DESC.equals("DESC")){
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_SELLER,Sort.by(Sort.Direction.DESC,"email"));
				}else if(DESC.equals("ASC_date")) {
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_SELLER,Sort.by(Sort.Direction.ASC,"joindate"));
				}else if(DESC.equals("DESC_date")) {
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_SELLER,Sort.by(Sort.Direction.DESC,"joindate"));
				}
			}else if(searchGroup.equals("ban")) {
				if(DESC.equals("ASC")) {
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_BAN);
				}else if(DESC.equals("DESC")){
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_BAN,Sort.by(Sort.Direction.DESC,"email"));
				}else if(DESC.equals("ASC_date")) {
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_BAN,Sort.by(Sort.Direction.ASC,"joindate"));
				}else if(DESC.equals("DESC_date")) {
					userList=userRepository.findByEmailContainingAndRole(searchWord,Role.ROLE_BAN,Sort.by(Sort.Direction.DESC,"joindate"));
				}
			}
					
		}else if(searchType.equals("nickname")) {
			if(searchGroup.equals("all")) {
				if(DESC.equals("ASC")) {
					userList=userRepository.findByNicknameContaining(searchWord);
				}else if(DESC.equals("DESC")){
					userList=userRepository.findByNicknameContaining(searchWord,Sort.by(Sort.Direction.DESC,"nickname"));
				}else if(DESC.equals("ASC_date")) {
					userList=userRepository.findByNicknameContaining(searchWord,Sort.by(Sort.Direction.ASC,"joindate"));
				}else if(DESC.equals("DESC_date")) {
					userList=userRepository.findByNicknameContaining(searchWord,Sort.by(Sort.Direction.DESC,"joindate"));
				}
			}else if(searchGroup.equals("admin")) {
				if(DESC.equals("ASC")) {
					userList=userRepository.findByNicknameContainingAndRole(searchWord,Role.ROLE_ADMIN);
				}else if(DESC.equals("DESC")){
					userList=userRepository.findByNicknameContainingAndRole(searchWord,Role.ROLE_ADMIN,Sort.by(Sort.Direction.DESC,"nickname"));
				}else if(DESC.equals("ASC_date")) {
					userList=userRepository.findByNicknameContainingAndRole(searchWord,Role.ROLE_ADMIN,Sort.by(Sort.Direction.ASC,"joindate"));
				}else if(DESC.equals("DESC_date")) {
					userList=userRepository.findByNicknameContainingAndRole(searchWord,Role.ROLE_ADMIN,Sort.by(Sort.Direction.DESC,"joindate"));
				}
			}else if(searchGroup.equals("user")) {
				if(DESC.equals("ASC")) {
					userList=userRepository.findByNicknameContainingAndRole(searchWord,Role.ROLE_USER);
				}else if(DESC.equals("DESC")){
					userList=userRepository.findByNicknameContainingAndRole(searchWord,Role.ROLE_USER,Sort.by(Sort.Direction.DESC,"nickname"));
				}else if(DESC.equals("ASC_date")) {
					userList=userRepository.findByNicknameContainingAndRole(searchWord,Role.ROLE_USER,Sort.by(Sort.Direction.ASC,"joindate"));
				}else if(DESC.equals("DESC_date")) {
					userList=userRepository.findByNicknameContainingAndRole(searchWord,Role.ROLE_USER,Sort.by(Sort.Direction.DESC,"joindate"));
				}
			}else if(searchGroup.equals("seller")) {
				if(DESC.equals("ASC")) {
					userList=userRepository.findByNicknameContainingAndRole(searchWord,Role.ROLE_SELLER);
				}else if(DESC.equals("DESC")){
					userList=userRepository.findByNicknameContainingAndRole(searchWord,Role.ROLE_SELLER,Sort.by(Sort.Direction.DESC,"nickname"));
				}else if(DESC.equals("ASC_date")) {
					userList=userRepository.findByNicknameContainingAndRole(searchWord,Role.ROLE_SELLER,Sort.by(Sort.Direction.ASC,"joindate"));
				}else if(DESC.equals("DESC_date")) {
					userList=userRepository.findByNicknameContainingAndRole(searchWord,Role.ROLE_SELLER,Sort.by(Sort.Direction.DESC,"joindate"));
				}
			}
		}
		
		if(!(userSearch.getSearchStartDate()==null)&&!(userSearch.getSearchEndDate()==null)){
			startDate = Integer.parseInt(userSearch.getSearchStartDate().replace("-",""));
			endDate = Integer.parseInt(userSearch.getSearchEndDate().replace("-",""));
			List<UserEntity> tempUserList = new ArrayList<UserEntity>();
			for(UserEntity user : userList) {
				String sjoinDate = user.getJoindate();
				sjoinDate = sjoinDate.split(" ")[0];
				int joinDate = Integer.parseInt(sjoinDate.replace("-", ""));
				if(joinDate>=startDate&&joinDate<=endDate) {
					tempUserList.add(user);
				}
			}
			int fromIndex = pageNumber*pageSize;
			int toIndex = Math.min((pageNumber + 1) * pageSize, tempUserList.size());
			List<UserEntity> pageContent = tempUserList.subList(fromIndex, toIndex);
			returnList = new PageImpl<UserEntity>(pageContent,pageable,tempUserList.size());
			
			return returnList;
		}else if(userSearch.getSearchStartDate() == null && userSearch.getSearchEndDate() == null){
			int fromIndex = pageNumber*pageSize;
			int toIndex = Math.min((pageNumber + 1) * pageSize, userList.size());
			List<UserEntity> pageContent = userList.subList(fromIndex, toIndex);
			returnList = new PageImpl<UserEntity>(pageContent,pageable,userList.size());
			return returnList;
		}else {
			return null;
		}

		
		
	}
	public void deleteUser(String userNick) {
		System.out.println(userNick);
		UserEntity user = userRepository.findByNickname(userNick);
		userRepository.delete(user);
	}
	
	@Transactional
	public void updateUser(String changeNick, String changeRole, String userNick) {
		UserEntity user = userRepository.findByNickname(userNick);
		
		
		
        if (user != null) {
        	if(!user.getRole().equals(Role.ROLE_SELLER)) {
        		if(changeRole.equals("seller")) {
        			sellerService.requestConfirm(user.getEmail());
        		}
        	}
        	if(user.getRole().equals(Role.ROLE_SELLER)) {
        		if(!changeRole.equals("seller")) {
        			sellerService.deleteSeller(user.getEmail());
        		}
        	}
            // 필드 업데이트
            user.setNickname(changeNick);
            if(changeRole.equals("admin")) {
            	user.setRole(Role.ROLE_ADMIN);
            }else if(changeRole.equals("seller")) {
            	user.setRole(Role.ROLE_SELLER);
            }else if(changeRole.equals("user")) {
            	user.setRole(Role.ROLE_USER);
            }else if(changeRole.equals("ban")) {
            	user.setRole(Role.ROLE_BAN);
            }

            // userRepository.save 메서드를 통해 업데이트 반영
            userRepository.save(user);
            
        }
	}
	public Page<SellerRegistEntity> getSellerRequest(int page) {
		int pageSize = 10;
		Pageable pageable = PageRequest.of(page, pageSize);
		return sellerRegistRepository.findAll(pageable);
	}
	
	public void noticeWrite(NoticeEntity entity) {
		noticeRepository.save(entity);
	}
	public Page<NoticeEntity> getNoticeList(int page) {
		int pageSize = 10;
		Pageable pageable = PageRequest.of(page, pageSize);
		Page<NoticeEntity> notice_List = noticeRepository.findAll(pageable);
		return notice_List;
	}
	public NoticeEntity getNotice(Long id) {
		Optional<NoticeEntity> opEntity = noticeRepository.findById(id);
		return opEntity.get();
	}
	public Page<NoticeCommentEntity> getNoticeComment(String id,int page) {
		int pageSize = 10;
		Pageable pageable = PageRequest.of(page, pageSize);
		return noticeCommentRepository.findByNoticeIdx(id,pageable);
	}
	public List<NoticeRecommentEntity> getNoticeRecomment(NoticeCommentEntity entity) {
		String notice_id = entity.getNoticeIdx();
		int inotice_comment_id = (int)entity.getId();
		String notice_comment_id = Integer.toString(inotice_comment_id);
		
		return noticeRecommentRepository.findByNoticeIdxAndNoticeCommentIdx(notice_id, notice_comment_id);
	}
	
	
	public void deleteRecomment(Long id) {
		Optional<NoticeRecommentEntity> optional = noticeRecommentRepository.findById(id);
		NoticeRecommentEntity entity = optional.get();
		entity.setRecomment("관리자에 의해 삭제된 댓글입니다.");
		noticeRecommentRepository.save(entity);
//		noticeRecommentRepository.delete(entity);
	}
	public void deleteComment(Long id) {
		Optional<NoticeCommentEntity> optional = noticeCommentRepository.findById(id);
		NoticeCommentEntity entity  = optional.get();
		entity.setComment("관리자에 의해 삭제된 댓글입니다.");
		noticeCommentRepository.save(entity);
//		int inotice_comment_id = (int)entity.getId();
//		String notice_comment_id = Integer.toString(inotice_comment_id);
//		List<NoticeRecommentEntity> re_entitys = noticeRecommentRepository.findByNoticeCommentIdx(notice_comment_id);
//		for(NoticeRecommentEntity re_entity : re_entitys) {
//			noticeRecommentRepository.delete(re_entity);
//		}
//		noticeCommentRepository.delete(entity);
	}
	public void deleteNotice(Long id) {
		Optional<NoticeEntity> optional = noticeRepository.findById(id);
		NoticeEntity entity=optional.get();
		noticeRepository.delete(entity);
	}
	public long adminRecommentCount(String id) {
		
		return noticeRecommentRepository.countByNoticeIdx(id);
	}
	public long adminCommentCount(String id) {
		return noticeCommentRepository.countByNoticeIdx(id);
	}
	public int insertWine(WineInsertDTO dto) {
		try {
			wineListRepository.save(dto.toEntity()).block();
			return 1;
		} catch (Exception e) {
			return -1;
		}
	}
	public int deleteWine(String id) {
		WineEntity entity = wineListRepository.findById(id).block();
		try {
			wineListRepository.delete(entity).block();
			return 1;
		} catch (Exception e) {
			return -1;
		}
	}
}
