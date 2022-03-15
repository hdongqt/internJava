package com.brycen.bookmanagement.dto;

import java.util.Date;
import java.util.List;

import lombok.Value;
@Value
public class TestDTO {
	private Long id;
//	private UserDTO user;
//	private String fullname;
//	private boolean sex;
	private Date borrowDate;
	private Date returnDate;
	private Long fine;
	private String note;
	private List<BookDTO> books;
}
