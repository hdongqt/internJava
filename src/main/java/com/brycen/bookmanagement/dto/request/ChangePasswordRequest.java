package com.brycen.bookmanagement.dto.request;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class ChangePasswordRequest {
	@NotBlank
	private String oldPassword;

	@NotBlank
	private String newPassword;

}
