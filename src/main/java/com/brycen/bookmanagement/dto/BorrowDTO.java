package com.brycen.bookmanagement.dto;

import java.util.Date;
import java.util.List;

import com.brycen.bookmanagement.dto.response.UserDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BorrowDTO {
	private Long id;
	private Date borrowDate;
	private Date appointmentDate;
	private Date returnDate;
	private Long fine;
	private String note;
	private Date createDate;
	private Date updateDate;
	private String createBy;
	private String updateBy;
	private int status;
	private int is_delete;
	private List<BookDTO> listbooks;
	private UserDTO user;
}
