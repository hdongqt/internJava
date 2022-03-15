package com.brycen.bookmanagement.service;

import java.util.List;

import com.brycen.bookmanagement.dto.CategoryDTO;

public interface CategoryService {
	List<CategoryDTO> findAll();
	CategoryDTO save(CategoryDTO categoryDTO);
	CategoryDTO findById(long id);
	void delete(long id);
	CategoryDTO findOneByCode(String code);
}