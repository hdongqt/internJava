package com.brycen.bookmanagement.dto;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDTO extends BaseDTO{
	@Column
	@NotBlank(message = "Tên thể loại không được trống")
	@Size(max = 50,message = "Tên thể loại có độ dài không được quá 50 kí tự")
	private String name;
	
	@NotBlank(message = "Mã thể loại không được trống")
	@Size(min=3,max=50,message = "Thể loại có độ dài từ 3 - 20 kí tự")
	private String code;
	
	@Column
	@Size(max = 50,message = "Mô tả quá 50 kí tự")
	private String description;
}
