package com.brycen.bookmanagement.dto.response;

import java.util.Date;
import java.util.List;

import com.brycen.bookmanagement.dto.BookDTO;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class UserHistoryResponse {
	private Long id;
//	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date borrowDate;
	private Date appointmentDate;
	private List<BookDTO> listbooks;
	private Date returnDate;
	private Long fine;
	private String note;
	private Date createDate;
	private Date updateDate;
	
	private String createBy;
	private String updateBy;
	
	private String status;
}
