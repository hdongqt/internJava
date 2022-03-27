package com.brycen.bookmanagement.service;

import org.springframework.data.domain.Pageable;

import com.brycen.bookmanagement.dto.AdminInfoUserDTO;
import com.brycen.bookmanagement.dto.response.AdminInfoUserOutput;

public interface ManagerUserService {
 void delete(long[] ids);
 AdminInfoUserOutput showUser(String roleCode, String fullname, Pageable pageable);
AdminInfoUserDTO getUserDetail(long id);
AdminInfoUserDTO updateUser(AdminInfoUserDTO dto);
}
