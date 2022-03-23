package com.brycen.bookmanagement.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.brycen.bookmanagement.converter.UserConverter;
import com.brycen.bookmanagement.dto.AdminInfoUserDTO;
import com.brycen.bookmanagement.dto.response.AdminInfoUserOutput;
import com.brycen.bookmanagement.entity.RoleEntity;
import com.brycen.bookmanagement.entity.UserEntity;
import com.brycen.bookmanagement.exception.BookAPIException;
import com.brycen.bookmanagement.exception.ResourceNotFoundException;
import com.brycen.bookmanagement.repository.RoleRepository;
import com.brycen.bookmanagement.repository.UserRepository;
import com.brycen.bookmanagement.service.AdminService;
@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserConverter userConverter;
	@Autowired
	private RoleRepository roleRepository;
	@Override
	public void delete(long[] ids) {
	for (long l : ids) {
		userRepository.deleteById(l);
	}
	}
	@Override
	public AdminInfoUserOutput showUser(String roleCode, String fullname,Pageable pageable) {
		AdminInfoUserOutput output = new AdminInfoUserOutput();
		RoleEntity roleE = roleRepository.findByCode(roleCode).orElseThrow(()->
		 new BookAPIException(HttpStatus.NOT_FOUND, "Không tìm thấy role "));

		Page<UserEntity> lists = userRepository.findUserByRoleAndFullname(roleE.getId(), fullname,pageable);
		 List<AdminInfoUserDTO> results = new ArrayList<AdminInfoUserDTO>();
		 for (UserEntity en : lists.toList()) {
			results.add(userConverter.toInfoDTO(en));
		}
		 output.setListResult(results);
		 output.setPage(lists.getNumber() + 1);
		  output.setTotalPage(lists.getTotalPages());
	  	return output;
	}
	@Override
	public AdminInfoUserDTO getUserDetail(long id) {
		UserEntity entity =  userRepository.findById(id).orElseThrow(()->
		 new ResourceNotFoundException("User", "id", id));
		AdminInfoUserDTO user = userConverter.toInfoDTO(entity);
		return user;
	}
	@Override
	public AdminInfoUserDTO updateUser(AdminInfoUserDTO dto) {
		if (userRepository.existsEmailByOther(dto.getEmail(), dto.getUsername()) !=null) {
			throw new BookAPIException(HttpStatus.BAD_REQUEST,"Error: Email đã được sử dụng !");
		}
		UserEntity entity = userRepository.findById(dto.getId()).orElseThrow(()->
		 new ResourceNotFoundException("User", "id", dto.getId()));
		entity = userConverter.mapInfoDTOToEntity(dto, entity);
		RoleEntity roleE = roleRepository.findByCode(dto.getRoleCode()).orElseThrow(()->
		 new BookAPIException(HttpStatus.NOT_FOUND, "Không tìm thấy role "));
		entity.setRole(roleE);
		entity = userRepository.save(entity);
		return userConverter.toInfoDTO(entity);
	}

}
