package com.brycen.bookmanagement.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.brycen.bookmanagement.converter.BookConverter;
import com.brycen.bookmanagement.converter.CustomConverter;
import com.brycen.bookmanagement.converter.UploadFileIMG;
import com.brycen.bookmanagement.dto.BookDTO;
import com.brycen.bookmanagement.dto.response.BookOutput;
import com.brycen.bookmanagement.entity.BookEntity;
import com.brycen.bookmanagement.entity.CategoryEntity;
import com.brycen.bookmanagement.exception.ResourceNotFoundException;
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
	
	@Autowired
	private UploadFileIMG uploadIMG;

//	@Override
//	public List<BookDTO> findAll(Pageable pageable) {
//		List<BookEntity> listAllBook  = bookRepository.findAll(pageable).getContent();
//		List<BookDTO> results = customConverter.mapList(listAllBook, BookDTO.class);
//		return results;
//	}
	@Override
	public BookDTO getById(long id) {
		BookEntity bookEntity = bookRepository.findById(id).orElseThrow(() 
				-> new ResourceNotFoundException("Book", "id", id));
		return customConverter.mapToDTO(bookEntity, BookDTO.class);
	}

	@Override
	public BookDTO save(BookDTO bookDTO) {
		BookEntity bookEntity  = new BookEntity();
		if(bookDTO.getId() !=null) { //kiem tra update
			BookEntity oldBookEntity = bookRepository.getById(bookDTO.getId());
			bookEntity = customConverter.mapToEntity(bookDTO, oldBookEntity);
			if(bookDTO.getFile() !=null) {
				bookEntity.setImage(uploadIMG.upload(bookDTO.getFile())); 
			}
			bookEntity.setUpdateDate(new Date());
		}else { //them moi
 			bookEntity = bookConverter.toEntity(bookDTO);
			if(bookDTO.getFile() !=null) {
				bookEntity.setImage(uploadIMG.upload(bookDTO.getFile() )); 
			}
			bookEntity.setCreateDate(new Date());
		}
		CategoryEntity categoryEntity  = categoryRepository.findOneByCode(bookDTO.getCategoryCode()); //laytheloai
		bookEntity.setCategory(categoryEntity);
		bookEntity = bookRepository.save(bookEntity);
		return bookConverter.toDTO(bookEntity);
	}
	@Override
	public void delete(long[] ids) {
		for (long id : ids) {
			bookRepository.deleteById(id);	
		}
	}
	@Override
	public void updateWhenDeleteCategory(CategoryEntity cateOld) {
		CategoryEntity cateOther = categoryRepository.findOneByCode("other");
		 bookRepository.updateCategoryOfBook(cateOld, cateOther);
	}
    //show all book , search 
	@Override
	public BookOutput findBook(String key,String type,Pageable pageable) {
		BookOutput output = new BookOutput();
		Page<BookEntity> listAllBook;
		if(key!=null && type!=null) {
			if(type.equals("bookname")) {
				listAllBook =  bookRepository.findByBooknameLike("%"+key+"%",pageable);
			}else {
				listAllBook =  bookRepository.findByCategoryNameLike(key,pageable);
			}
		}else {
			listAllBook =  bookRepository.findAll(pageable);
		}
		List<BookDTO> results = customConverter.mapList(listAllBook.toList(), BookDTO.class);
		output.setListResult(results);
		output.setPage(listAllBook.getNumber() + 1);
		output.setTotalPage(listAllBook.getTotalPages());
		return output;
	}
	
}
