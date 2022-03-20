package com.brycen.bookmanagement.dto.request;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BorrowCreateRequest {
	private Long idUser;
	private Date appointmentDate;
	private Date borrowDate;
	private long[] idBooks;
	
	
}
