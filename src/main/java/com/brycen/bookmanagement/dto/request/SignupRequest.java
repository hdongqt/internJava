package com.brycen.bookmanagement.dto.request;

import java.util.Date;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
  @NotBlank(message ="Username có độ dài từ 3 đến 20 kí tự" )
  @Size(min = 3, max = 20 ,message = "Username có độ dài từ 3 đến 20 kí tự")
  private String username;
  
  @NotBlank(message = "Tên có độ dài từ 3 đến 50 kí tự")
  @Size(min = 3, max = 50 ,message = "Tên có độ dài từ 3 đến 50 kí tự")
  private String fullname;
  
  @Size(max = 50,message = "Email không hợp lệ")
  @Email(message = "Email không hợp lệ")
  private String email;
  
  @Size(max=150,message = "Địa chỉ quá 150 kí tự")
  private String address;
  
  @NotNull(message = "Vui lòng nhập ngày sinh")
  private Date birth;

  @NotNull(message = "Giới tính không hợp lệ")
  private boolean sex;

  @NotBlank(message ="CMND không hợp lệ")
  @Size(min = 9, max = 15 ,message ="CMND không hợp lệ" )
  private String cmnd;
  
  @NotBlank(message = "Mật khẩu từ 6- 20 kí tự")
  @Size(min = 6, max = 20,message = "Mật khẩu từ 6- 20 kí tự")
  private String password;
  
  @NotBlank(message = "Số điện thoại không hợp lệ")
  @Size(min = 10, max = 11,message = "Số điện thoại không hợp lệ")
  private String phone;
}
