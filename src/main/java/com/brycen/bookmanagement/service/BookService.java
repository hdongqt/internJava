package com.brycen.bookmanagement.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.brycen.bookmanagement.dto.BookDTO;
import com.brycen.bookmanagement.entity.CategoryEntity;


public interface BookService {
	List<BookDTO> findAll();
	List<BookDTO> findAll(Pageable pageable);
	BookDTO save(BookDTO dto);
	BookDTO getById(long id);
	int totalItem();
	void delete(long id);
	void updateWhenDeleteCategory(CategoryEntity cate);
}
