package com.brycen.bookmanagement.dto.request;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BorrowCreateRequest {
	@NotNull(message = "Chưa chọn reader")
	private Long idUser;
	private Date appointmentDate;
	private Date borrowDate;
	@NotEmpty(message = "Chưa chọn sách")
	private long[] idBooks;
	
	
}
