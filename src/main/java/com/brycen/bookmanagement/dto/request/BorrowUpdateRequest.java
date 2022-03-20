package com.brycen.bookmanagement.dto.request;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class BorrowUpdateRequest {
	private Long id;
	private Date borrowDate;
	private Date appointmentDate;
	private Date returnDate;
	private Long fine;
	private String note;
	private long[] idBooks;
}
