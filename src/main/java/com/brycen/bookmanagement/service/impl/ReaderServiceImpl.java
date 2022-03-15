package com.brycen.bookmanagement.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.brycen.bookmanagement.converter.CustomConverter;
import com.brycen.bookmanagement.dto.request.ChangePasswordRequest;
import com.brycen.bookmanagement.dto.response.UserDTO;
import com.brycen.bookmanagement.dto.response.UserHistoryResponse;
import com.brycen.bookmanagement.entity.BorrowEntity;
import com.brycen.bookmanagement.entity.UserEntity;
import com.brycen.bookmanagement.exception.BookAPIException;
import com.brycen.bookmanagement.exception.ResourceNotFoundException;
import com.brycen.bookmanagement.repository.BorrowRespository;
import com.brycen.bookmanagement.repository.UserRepository;
import com.brycen.bookmanagement.security.SecurityUtils;
import com.brycen.bookmanagement.security.service.UserDetailsImpl;
import com.brycen.bookmanagement.service.ReaderService;

@Service
public class ReaderServiceImpl implements ReaderService{
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BorrowRespository borrowRespository;
	
	@Autowired
	private CustomConverter customConverter;
	
    @Autowired
    PasswordEncoder encoder;
	
	@Override
	public UserDTO getInfo() {
		try {
			UserDetailsImpl userDetails =SecurityUtils.getPrincipal();
			UserDTO us= new UserDTO();
			us.setId(userDetails.getId());
			us.setFullname(userDetails.getFullname());
			us.setAddress(userDetails.getAddress());
			us.setBirth(userDetails.getBirth());
			us.setEmail(userDetails.getEmail());
			us.setSex(userDetails.isSex());
			us.setCmnd(userDetails.getCmnd());
			us.setUsername(userDetails.getUsername());
			return us;
		} catch (Exception e) {
			throw new BookAPIException(HttpStatus.BAD_REQUEST, "User không hợp lệ");
		}
	}

    //reader update info
	@Override
	public UserDTO save(UserDTO dto) {
		if (userRepository.existsEmailByOther(dto.getEmail(), dto.getUsername()) !=null) {
			throw new BookAPIException(HttpStatus.BAD_REQUEST,"Error: Email đã được sử dụng !");
		}
		UserEntity entity = new UserEntity();
		UserDetailsImpl userDetails =SecurityUtils.getPrincipal();
			UserEntity oldUser = userRepository.findById(userDetails.getId()).orElseThrow(()->
			 new ResourceNotFoundException("User", "id", userDetails.getId()));
			if(!userDetails.getUsername().equals(dto.getUsername())) {
				throw new BookAPIException(HttpStatus.BAD_REQUEST, "User không hợp lệ!");
			}
			entity = customConverter.mapToEntity(dto, oldUser);
			entity = userRepository.save(entity);
			return customConverter.mapToDTO(entity, UserDTO.class);
	}
   //delete history
	public void deleteHistory(long[] ids) {
		String username = SecurityUtils.getPrincipal().getUsername();
		Long userId = SecurityUtils.getPrincipal().getId();
		for (long id : ids) {
			borrowRespository.deleteUserHistory(userId,id);
		}
	}

	public int changePassword(ChangePasswordRequest password) {
		UserDetailsImpl userDetails =SecurityUtils.getPrincipal();
		if(encoder.matches(password.getOldPassword(),userDetails.getPassword())) {
			return userRepository.changePassword(userDetails.getUsername(), 
					encoder.encode(password.getNewPassword()));
		}
		return -1;
	}
}
