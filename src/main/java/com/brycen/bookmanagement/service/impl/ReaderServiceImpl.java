package com.brycen.bookmanagement.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.brycen.bookmanagement.converter.BorrowConverter;
import com.brycen.bookmanagement.converter.CustomConverter;
import com.brycen.bookmanagement.dto.request.ChangePasswordRequest;
import com.brycen.bookmanagement.dto.response.UserDTO;
import com.brycen.bookmanagement.dto.response.UserHistoryDTO;
import com.brycen.bookmanagement.dto.response.UserHistoryOutput;
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
	private BorrowConverter borrowConverter;
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
			us.setPhone(userDetails.getPhone());
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
		}else throw new BookAPIException(HttpStatus.BAD_REQUEST,"Mật khẩu cũ không chính xác");
	}

	
	public UserHistoryOutput getListUserHistory(String username,String type,Pageable pageable) {
		Page<BorrowEntity> lists ;
		UserHistoryOutput output = new UserHistoryOutput();
		switch (type) {
		case "OUTDATE":
			lists = borrowRespository.getHistoryBorrowUserOutDate(username,pageable);
			break;
		case "PAID":
			lists = borrowRespository.getHistoryBorrowUserPaidOrUnPaid(username,true,pageable);
			break;
		case "UNPAID":
			lists = borrowRespository.getHistoryBorrowUserPaidOrUnPaid(username,false,pageable);
			break;
		default:
			lists = borrowRespository.getByUsername(username,pageable);
			break;
		}
		List<UserHistoryDTO> results = new  ArrayList<UserHistoryDTO>(); 
		for (BorrowEntity borrowEntity : lists) {
			results.add(borrowConverter.mapEntityToHistoryResponse(borrowEntity));
		}
		output.setListResult(results);
		output.setPage(lists.getNumber()+1);
		output.setTotalPage(lists.getTotalPages());
		return output;
	}

	@Override
	public void delete(long[] ids) {
		for (long id : ids) {
			borrowRespository.deleteById(id);
		}
	}

}
