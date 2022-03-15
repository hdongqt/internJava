package com.brycen.bookmanagement.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.brycen.bookmanagement.converter.BookConverter;
import com.brycen.bookmanagement.converter.CustomConverter;
import com.brycen.bookmanagement.dto.BookDTO;
import com.brycen.bookmanagement.entity.BookEntity;
import com.brycen.bookmanagement.entity.CategoryEntity;
import com.brycen.bookmanagement.repository.BookRepository;
import com.brycen.bookmanagement.repository.CategoryRepository;
import com.brycen.bookmanagement.service.BookService;

@Service
public class BookServiceImpl implements BookService{
	@Autowired
	private BookRepository bookRepository;
	
	@Autowired
	private CustomConverter customConverter;
	
	@Autowired
	private BookConverter bookConverter;
	
	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public List<BookDTO> findAll(Pageable pageable) {
		List<BookEntity> listAllBook  = bookRepository.findAll(pageable).getContent();
		List<BookDTO> results = customConverter.mapList(listAllBook, BookDTO.class);
		return results;
	}
	@Override
	public BookDTO getById(long id) {
		BookEntity bookEntity = bookRepository.getById(id);
		return bookConverter.toDTO(bookEntity);
	}
	@Override
	public int totalItem() {
		return (int) bookRepository.count();
	}

	@Override
	public BookDTO save(BookDTO bookDTO) {
		BookEntity bookEntity  = new BookEntity();
		if(bookDTO.getId() !=null) { //kiem tra update
			BookEntity oldBookEntity = bookRepository.getById(bookDTO.getId());
			bookEntity = bookConverter.toEntity(bookDTO, oldBookEntity);
			bookEntity.setUpdateDate(new Date());
		}else { //them moi
			bookEntity = bookConverter.toEntity(bookDTO);
			bookEntity.setCreateDate(new Date());
		}
		CategoryEntity categoryEntity  = categoryRepository.findOneByCode(bookDTO.getCategoryCode()); //laytheloai
		bookEntity.setCategory(categoryEntity);
		bookEntity = bookRepository.save(bookEntity);
		return bookConverter.toDTO(bookEntity);
	}
	@Override
	public void delete(long id) {
		
		bookRepository.deleteById(id);	
	}
	@Override
	public void updateWhenDeleteCategory(CategoryEntity cateOld) {
		CategoryEntity cateOther = categoryRepository.findOneByCode("other");
		 bookRepository.updateCategoryOfBook(cateOld, cateOther);
	}
	@Override
	public List<BookDTO> findAll() {
		List<BookEntity> listAllBook  = bookRepository.findAll();
		List<BookDTO> results = customConverter.mapList(listAllBook, BookDTO.class);
		return results;
	}
}
