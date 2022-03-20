package com.brycen.bookmanagement.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.brycen.bookmanagement.dto.AdminInfoUserDTO;

public interface AdminService {
 void delete(long[] ids);
List<AdminInfoUserDTO> showUser(String roleCode, String fullname, Pageable pageable);
int totalItem();
AdminInfoUserDTO getUserDetail(long id);
}
