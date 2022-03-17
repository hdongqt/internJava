package com.brycen.bookmanagement.service;

import com.brycen.bookmanagement.dto.request.ChangePasswordRequest;
import com.brycen.bookmanagement.dto.response.UserDTO;

public interface ReaderService {
	UserDTO getInfo();
	UserDTO save(UserDTO dto);
	void deleteHistory(long[] ids);
    int changePassword(ChangePasswordRequest password);
}
