package com.brycen.bookmanagement.converter;

import org.springframework.stereotype.Component;

import com.brycen.bookmanagement.dto.CategoryDTO;
import com.brycen.bookmanagement.entity.CategoryEntity;
@Component
public class CategoryConverter {
	public CategoryDTO toDTO(CategoryEntity categoryEntity) {
		CategoryDTO categoryDTO = new CategoryDTO();
		if(categoryEntity.getId() !=null ) {
			categoryDTO.setId(categoryEntity.getId());
		}
		categoryDTO.setName(categoryEntity.getName());
		categoryDTO.setCode(categoryEntity.getCode());
		categoryDTO.setDescription(categoryEntity.getDescription());
		return categoryDTO;
	}
	public CategoryEntity toEntity(CategoryDTO dto) {
		CategoryEntity categoryEntity = new CategoryEntity();
		categoryEntity.setName(dto.getName());
		categoryEntity.setCode(dto.getCode());
		categoryEntity.setDescription(dto.getDescription());
		return categoryEntity;
	}
	public CategoryEntity toEntity(CategoryDTO dto,CategoryEntity cateentiry) {
		cateentiry.setName(dto.getName());
		cateentiry.setCode(dto.getCode());
		cateentiry.setDescription(dto.getDescription());
		return cateentiry;
	}
}
