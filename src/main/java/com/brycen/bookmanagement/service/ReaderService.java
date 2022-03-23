package com.brycen.bookmanagement.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.brycen.bookmanagement.dto.request.ChangePasswordRequest;
import com.brycen.bookmanagement.dto.response.UserDTO;
import com.brycen.bookmanagement.dto.response.UserHistoryResponse;

public interface ReaderService {
	UserDTO getInfo();
	UserDTO save(UserDTO dto);
	void deleteHistory(long[] ids);
    int changePassword(ChangePasswordRequest password);
	List<UserHistoryResponse> getListUserHistory(String username,String type,Pageable pageable);
	int totalItem();
	void delete(long[] ids);
}
