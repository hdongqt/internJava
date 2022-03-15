package com.brycen.bookmanagement.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.brycen.bookmanagement.converter.BorrowConverter;
import com.brycen.bookmanagement.dto.response.UserHistoryResponse;
import com.brycen.bookmanagement.entity.BorrowEntity;
import com.brycen.bookmanagement.repository.BorrowRespository;
import com.brycen.bookmanagement.service.BorrowService;

@Service
public class BorrowServiceImpl implements BorrowService{
	@Autowired
	private BorrowRespository borrowRespository;
	@Autowired
	private BorrowConverter borrowConverter;


	public List<UserHistoryResponse> getListUserHistory(String username,String filter,Pageable pageable) {
		List<BorrowEntity> lists = new ArrayList<BorrowEntity>();
		switch (filter) {
		case "OUTDATE":
			lists = borrowRespository.getHistoryBorrowUserOutDate(username,pageable);
			break;
		case "PAID":
			lists = borrowRespository.getHistoryBorrowUser(username,true,pageable);
			break;
		case "UNPAID":
			lists = borrowRespository.getHistoryBorrowUser(username,false,pageable);
			break;
		default:
			lists = borrowRespository.getByUsername(username,pageable);
			break;
		}
		List<UserHistoryResponse> results = new  ArrayList<UserHistoryResponse>(); 
		for (BorrowEntity borrowEntity : lists) {
			results.add(borrowConverter.mapEntityToHistoryResponse(borrowEntity));
		}
		return results;
	}



}
