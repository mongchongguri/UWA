package com.uwa.uswine.admin.service;



import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.uwa.uswine.admin.dto.UserSearchDTO;
import com.uwa.uswine.user.entity.Role;
import com.uwa.uswine.user.entity.UserEntity;
import com.uwa.uswine.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminService {
	private final UserRepository userRepository;
	public Page<UserEntity> getUserList(UserSearchDTO userSearch) {
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
		if(!(userSearch.getSearchStartDate()==null)&&!(userSearch.getSearchEndDate()==null)){
			startDate = Integer.parseInt(userSearch.getSearchStartDate().replace("-",""));
			endDate = Integer.parseInt(userSearch.getSearchEndDate().replace("-",""));
		}else if(userSearch.getSearchStartDate() == null && userSearch.getSearchEndDate() == null){
			return userRepository.findAll(pageable);
		}else {
			return null;
		}
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
		Page<UserEntity> returnList = null;
		System.out.println(startDate+"-"+endDate);
		if(startDate != endDate) {
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
		}else {
			int fromIndex = pageNumber*pageSize;
			int toIndex = Math.min((pageNumber + 1) * pageSize, userList.size());
			List<UserEntity> pageContent = userList.subList(fromIndex, toIndex);
			returnList = new PageImpl<UserEntity>(pageContent,pageable,userList.size());
		}
		return returnList;
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
            // 필드 업데이트
            user.setNickname(changeNick);
            if(changeRole.equals("admin")) {
            	user.setRole(Role.ROLE_ADMIN);
            }else if(changeRole.equals("seller")) {
            	user.setRole(Role.ROLE_SELLER);
            }else if(changeRole.equals("user")) {
            	user.setRole(Role.ROLE_USER);
            }

            // userRepository.save 메서드를 통해 업데이트 반영
            userRepository.save(user);
        }
	}
	public Page<UserEntity> getSellerRequest() {
		
		return null;
	}
}
