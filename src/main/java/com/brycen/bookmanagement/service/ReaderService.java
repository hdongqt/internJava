package com.brycen.bookmanagement.service;

import org.springframework.data.domain.Pageable;

import com.brycen.bookmanagement.dto.request.ChangePasswordRequest;
import com.brycen.bookmanagement.dto.response.UserDTO;
import com.brycen.bookmanagement.dto.response.UserHistoryOutput;

public interface ReaderService {
	UserDTO getInfo();
	UserDTO save(UserDTO dto);
	void deleteHistory(long[] ids);
    int changePassword(ChangePasswordRequest password);
	UserHistoryOutput getListUserHistory(String username,String type,Pageable pageable);
	void delete(long[] ids);
}
