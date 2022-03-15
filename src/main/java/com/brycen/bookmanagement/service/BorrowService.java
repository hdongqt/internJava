package com.brycen.bookmanagement.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.brycen.bookmanagement.dto.response.UserHistoryResponse;

public interface BorrowService {
	List<UserHistoryResponse> getListUserHistory(String username,String filter,Pageable pageable);
}
