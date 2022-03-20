package com.brycen.bookmanagement.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.brycen.bookmanagement.converter.BorrowConverter;
import com.brycen.bookmanagement.dto.BorrowDTO;
import com.brycen.bookmanagement.dto.request.BorrowCreateRequest;
import com.brycen.bookmanagement.dto.request.BorrowUpdateRequest;
import com.brycen.bookmanagement.dto.response.UserHistoryResponse;
import com.brycen.bookmanagement.entity.BorrowEntity;
import com.brycen.bookmanagement.entity.UserEntity;
import com.brycen.bookmanagement.exception.ResourceNotFoundException;
import com.brycen.bookmanagement.repository.BorrowRespository;
import com.brycen.bookmanagement.repository.UserRepository;
import com.brycen.bookmanagement.service.BorrowService;

@Service
public class BorrowServiceImpl implements BorrowService{
	@Autowired
	private BorrowRespository borrowRespository;
	@Autowired
	private BorrowConverter borrowConverter;
	@Autowired
	private UserRepository userRepository;

	public List<UserHistoryResponse> getListUserHistory(String username,String filter,Pageable pageable) {
		List<BorrowEntity> lists = new ArrayList<BorrowEntity>();
		switch (filter) {
		case "OUTDATE":
			lists = borrowRespository.getHistoryBorrowUserOutDate(username,pageable);
			break;
		case "PAID":
			lists = borrowRespository.getHistoryBorrowUserPaidOrUnPaid(username,true,pageable);
			break;
		case "UNPAID":
			lists = borrowRespository.getHistoryBorrowUserPaidOrUnPaid(username,false,pageable);
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

  //librarian 
	@Override
	public List<BorrowDTO> getListBorrow(String filter, String username, Pageable pageable) {
		List<BorrowEntity> lists = new ArrayList<BorrowEntity>();
		if(username !=null &&  username.trim() != "") {
			switch (filter) {
			case "OUTDATE":
				lists = borrowRespository.getHistoryBorrowUserOutDate(username, pageable);
				break;
			case "PAID":
				lists = borrowRespository.getHistoryBorrowUserPaidOrUnPaid(username, true, pageable);
				break;
			case "UNPAID":
				lists = borrowRespository.getHistoryBorrowUserPaidOrUnPaid(username, false, pageable);
				break;
			default:
				lists = borrowRespository.getByUsername(username, pageable);
				break;
			}
		}else {
			switch (filter) {
			case "OUTDATE":
				lists = borrowRespository.getListBorrowOutDate(pageable);
				break;
			case "PAID":
				lists = borrowRespository.getListBorrowPaidOrUnPaid(true, pageable);
				break;
			case "UNPAID":
				lists = borrowRespository.getListBorrowPaidOrUnPaid(false, pageable);
				break;
			default:
				lists = borrowRespository.getAllListBorrow(pageable);
				break;
			}
		}
		List<BorrowDTO> results = new  ArrayList<BorrowDTO>(); 
		for (BorrowEntity borrowEntity : lists) {
			results.add(borrowConverter.mapEntityToBorrowDTO(borrowEntity));
		}
		return results;
	}

	@Override
	public int totalItem() {
		return (int) borrowRespository.count();
	}

	@Override
	public BorrowDTO getOneBorrow(Long id) {
		return borrowConverter.mapEntityToBorrowDTO(borrowRespository.getById(id));
	}

	@Override
	public void delete(long[] ids) {
		for (long id : ids) {
			borrowRespository.deleteById(id);
		}
	}

	@Override
	public BorrowDTO createBorrow(BorrowCreateRequest borrowRequest) {
		BorrowEntity entity = borrowConverter.mapBorrowCreateRequestToEntity(borrowRequest);
		UserEntity user = userRepository.findById(borrowRequest.getIdUser()).orElseThrow(()->
		new ResourceNotFoundException("Reader", "id", borrowRequest.getIdUser()));
		entity.setUser(user);
		entity = borrowRespository.save(entity);
		return borrowConverter.mapEntityToBorrowDTO(entity);
	}

	@Override
	public BorrowDTO updateBorrow(BorrowUpdateRequest borrow) {
		BorrowEntity entity = borrowRespository.findById(borrow.getId()).orElseThrow(()->
		 new ResourceNotFoundException("Borrow", "id", borrow.getId()));
		entity = borrowConverter.mapBorrowUpateRequestToEntity(borrow, entity);
		entity = borrowRespository.save(entity);
		return borrowConverter.mapEntityToBorrowDTO(entity);
	}
		
}
