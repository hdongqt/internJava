package com.brycen.bookmanagement.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.brycen.bookmanagement.dto.BookDTO;
import com.brycen.bookmanagement.dto.response.BookOutput;
import com.brycen.bookmanagement.entity.CategoryEntity;


public interface BookService {
//	List<BookDTO> findAll(Pageable pageable);
	BookDTO save(BookDTO dto);
	BookDTO getById(long id);
	void delete(long[] ids);
	void updateWhenDeleteCategory(CategoryEntity cate);
	BookOutput findBook(String key,String type,Pageable pageable);
	List<BookDTO> searchBook(String name);
}
