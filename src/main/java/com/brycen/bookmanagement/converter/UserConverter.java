package com.brycen.bookmanagement.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.brycen.bookmanagement.dto.AdminInfoUserDTO;
import com.brycen.bookmanagement.entity.UserEntity;

@Component
public class UserConverter {
	   @Autowired
	   private CustomConverter appConverter;
		public AdminInfoUserDTO toInfoDTO(UserEntity entity) {
			AdminInfoUserDTO am = new AdminInfoUserDTO();
			am = appConverter.mapToDTO(entity, AdminInfoUserDTO.class);
			am.setRoleCode(entity.getRole().getCode());
			return am;
			
		}
}
