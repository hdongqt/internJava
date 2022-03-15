package com.brycen.bookmanagement.converter;

import org.springframework.stereotype.Component;

import com.brycen.bookmanagement.dto.BookDTO;
import com.brycen.bookmanagement.entity.BookEntity;

@Component
public class BookConverter {
	public BookDTO toDTO(BookEntity bookEntity) {
		BookDTO bookDTO = new BookDTO();
		if(bookEntity.getId() !=null ) {
			bookDTO.setId(bookEntity.getId());
		}
		bookDTO.setAuthor(bookEntity.getAuthor());
		bookDTO.setBookname(bookEntity.getBookname());
		bookDTO.setCreateDate(bookEntity.getCreateDate());
		bookDTO.setUpdateDate(bookEntity.getUpdateDate());
		bookDTO.setImage(bookEntity.getImage());
		bookDTO.setInventory(bookEntity.getInventory());
		bookDTO.setTotal(bookEntity.getTotal());
		bookDTO.setPrice(bookEntity.getPrice());
		bookDTO.setCategoryCode(bookEntity.getCategory().getCode());
		return bookDTO;
	}
	public BookEntity toEntity(BookDTO dto) {
		BookEntity bookEntity = new BookEntity();
		bookEntity.setAuthor(dto.getAuthor());
		bookEntity.setBookname(dto.getBookname());
		bookEntity.setCreateDate(dto.getCreateDate());
		bookEntity.setImage(dto.getImage());
		bookEntity.setInventory(dto.getInventory());
		bookEntity.setPrice(dto.getPrice());
		bookEntity.setTotal(dto.getTotal());
		bookEntity.setUpdateDate(dto.getUpdateDate());
		return bookEntity;
	}
	public BookEntity toEntity(BookDTO dto,BookEntity bookEntity) {
		bookEntity.setAuthor(dto.getAuthor());
		bookEntity.setBookname(dto.getBookname());
		bookEntity.setImage(dto.getImage());
		bookEntity.setInventory(dto.getInventory());
		bookEntity.setPrice(dto.getPrice());
		bookEntity.setTotal(dto.getTotal());
		bookEntity.setUpdateDate(dto.getUpdateDate());
		return bookEntity;
	}
}
