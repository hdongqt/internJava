package com.brycen.bookmanagement.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.brycen.bookmanagement.dto.request.ChangePasswordRequest;
import com.brycen.bookmanagement.dto.response.UserDTO;

public interface ReaderService {
	UserDTO getInfo();
	UserDTO save(UserDTO dto);
	void deleteHistory(long[] ids);
    int changePassword(ChangePasswordRequest password);
	List<UserDTO> searchReader(String fullname); 
}
