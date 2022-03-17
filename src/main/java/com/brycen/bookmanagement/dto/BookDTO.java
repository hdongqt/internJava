package com.brycen.bookmanagement.dto;

import java.util.Date;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookDTO extends BaseDTO{
	@NotBlank
	private String bookname;
	@NotBlank
	@Size(min=3,max=100,message = "Tên tác giả không hợp lệ")
	private String author;
	@NotBlank
	private String categoryCode;
	private String image;
	@Min(1)
	private Long price;
	@Min(1)
	private int total;
	@Min(1)
	private int inventory;
	private Date createDate;
	private Date updateDate;
	private MultipartFile file;
}
