package com.brycen.bookmanagement.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.brycen.bookmanagement.dto.CategoryDTO;

public interface CategoryService {
	CategoryDTO save(CategoryDTO categoryDTO);
	CategoryDTO findById(long id);
	void delete(long id);
	CategoryDTO findOneByCode(String code);
	int totalItem();
	List<CategoryDTO> findAllPagination(Pageable pageable);
	List<CategoryDTO> findAll();
}