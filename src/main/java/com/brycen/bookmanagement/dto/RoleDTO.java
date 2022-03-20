package com.brycen.bookmanagement.dto;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleDTO {
	@NotBlank
	private String name;
	
	@NotBlank
	private String code;
}
