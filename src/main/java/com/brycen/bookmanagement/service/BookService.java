package com.brycen.bookmanagement.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.brycen.bookmanagement.dto.BookDTO;
import com.brycen.bookmanagement.entity.CategoryEntity;


public interface BookService {
//	List<BookDTO> findAll(Pageable pageable);
	BookDTO save(BookDTO dto);
	BookDTO getById(long id);
	int totalItem();
	void delete(long[] ids);
	void updateWhenDeleteCategory(CategoryEntity cate);
	List<BookDTO> findBook(String key,String type,Pageable pageable);
}
