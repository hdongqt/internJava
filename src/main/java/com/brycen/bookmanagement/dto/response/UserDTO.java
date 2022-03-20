package com.brycen.bookmanagement.dto.response;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
	private Long id;
	private String address;
	private Date birth;
	private String email;
	private String fullname;
	private String cmnd;
	private boolean sex;
	private String username;
	private String phone;
}
