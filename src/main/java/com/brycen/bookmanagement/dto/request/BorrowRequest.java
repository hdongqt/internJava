package com.brycen.bookmanagement.dto.request;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

import com.brycen.bookmanagement.dto.BookDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BorrowRequest {
	@NotBlank
	private Long idUser;
	@Column
	private Date appointmentDate;
	@Column
	private Date borrowDate;
	private List<BookDTO> listBorrow;
	
	
}
