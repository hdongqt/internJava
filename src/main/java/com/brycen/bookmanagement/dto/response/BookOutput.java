package com.brycen.bookmanagement.dto.response;

import com.brycen.bookmanagement.dto.BookDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookOutput extends BaseOuput<BookDTO>{
	private int page;
	private int totalPage;
}
