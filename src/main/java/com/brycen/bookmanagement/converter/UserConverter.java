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
			AdminInfoUserDTO am =  appConverter.mapToDTO(entity, AdminInfoUserDTO.class);
			am.setRoleCode(entity.getRole().getCode());
			return am;
			
		}
		public UserEntity mapInfoDTOToEntity(AdminInfoUserDTO info,UserEntity entity) {
			entity.setAddress(info.getAddress());
			entity.setBirth(info.getBirth());
			entity.setCMND(info.getCmnd());
			entity.setEmail(info.getEmail());
			entity.setFullname(info.getFullname());
			entity.setSex(info.isSex());
			entity.setPhone(info.getPhone());
			entity.setDelete(info.isDelete());
//			entity = appConverter.mapToEntity(info, entity);
			return entity;
		}
}
