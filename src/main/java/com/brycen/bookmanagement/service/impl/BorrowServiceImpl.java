package com.brycen.bookmanagement.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.brycen.bookmanagement.converter.BorrowConverter;
import com.brycen.bookmanagement.converter.CustomConverter;
import com.brycen.bookmanagement.dto.BorrowDTO;
import com.brycen.bookmanagement.dto.request.BorrowCreateRequest;
import com.brycen.bookmanagement.dto.request.BorrowUpdateRequest;
import com.brycen.bookmanagement.dto.response.BorrowOutput;
import com.brycen.bookmanagement.dto.response.UserDTO;
import com.brycen.bookmanagement.entity.BookEntity;
import com.brycen.bookmanagement.entity.BorrowEntity;
import com.brycen.bookmanagement.entity.UserEntity;
import com.brycen.bookmanagement.exception.BookAPIException;
import com.brycen.bookmanagement.exception.ResourceNotFoundException;
import com.brycen.bookmanagement.repository.BookRepository;
import com.brycen.bookmanagement.repository.BorrowRespository;
import com.brycen.bookmanagement.repository.UserRepository;
import com.brycen.bookmanagement.service.BorrowService;
@Service
public class BorrowServiceImpl implements BorrowService  {
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private BorrowRespository borrowRespository;
	
	@Autowired
	private BorrowConverter borrowConverter;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CustomConverter customConverter;
	
	
     @Override
	public  BorrowOutput getListBorrow(String type, String username, Pageable pageable) {
    	 BorrowOutput output = new BorrowOutput();
		Page<BorrowEntity> lists ;
		if(username !=null &&  username.trim() != "") {
			switch (type) {
			case "OUTDATE":
				lists = borrowRespository.getHistoryBorrowUserOutDateForManager(username, pageable);
				break;
			case "PAID":
				lists = borrowRespository.getHistoryBorrowUserPaidOrUnPaidForManager(username, true, pageable);
				break;
			case "UNPAID":
				lists = borrowRespository.getHistoryBorrowUserPaidOrUnPaidForManager(username, false, pageable);
				break;
			default:
				lists = borrowRespository.getBorrowOfUserForManager(username, pageable);
				break;
			}
		}else {
			switch (type) {
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
		output.setListResult(results);
		output.setPage(lists.getNumber() + 1);
		output.setTotalPage(lists.getTotalPages());
		return output;
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
		for (long id : borrowRequest.getIdBooks()) {
			if(!checkInventoryBook(id)) {
				throw new BookAPIException(HttpStatus.BAD_REQUEST, "Hết sách");
			}
		}
		BorrowEntity entity = borrowConverter.mapBorrowCreateRequestToEntity(borrowRequest);
		UserEntity user = userRepository.findById(borrowRequest.getIdUser()).orElseThrow(()->
		new ResourceNotFoundException("Reader", "id", borrowRequest.getIdUser()));
		entity.setUser(user);
		entity = borrowRespository.save(entity);
		for (BookEntity book : entity.getBooks()) {
			bookRepository.minusInventory(book.getId());
		}
		return borrowConverter.mapEntityToBorrowDTO(entity);
	}

	@Override
	public BorrowDTO updateBorrow(BorrowUpdateRequest borrow) {
		BorrowEntity entity = borrowRespository.findById(borrow.getId()).orElseThrow(()->
		 new ResourceNotFoundException("Borrow", "id", borrow.getId()));
		List<BookEntity> listBook = entity.getBooks();
		long[] ids = borrow.getIdBooks();
		List<Long> dsRemove = new ArrayList<Long>();
		List<Long> dsAdd = new ArrayList<Long>();
		entity = borrowConverter.mapBorrowUpateRequestToEntity(borrow, entity);
		entity = borrowRespository.save(entity);
		//kiem tra cac cuon sach da bo khoi danh sach
		for (BookEntity book : listBook) {
			int check = 0;
			for (Long i : ids) {
				if(i==book.getId()) check = 1;
			}
			if(check==0) {
				dsRemove.add(book.getId());
			}
		}
		for (Long long1 : ids) {
			int kt = 0;
			for (BookEntity book : listBook) {
				if(long1==book.getId()) kt = 1;
			}
			if(kt==0) dsAdd.add(long1);
		}
		//tang ton kho cua cac cuon sach bi loai di
		for (Long id : dsRemove) {
			bookRepository.plusInventory(id);
		}
		for (Long id : dsAdd) {
			bookRepository.minusInventory(id);
		}
		return borrowConverter.mapEntityToBorrowDTO(entity);
	}
	 //tìm kiếm user
	@Override
	public List<UserDTO> searchReader(String fullname) {
		List<UserDTO> lists = new ArrayList<UserDTO>();
		if(fullname !=null && fullname.trim() !="") {
			List<UserEntity> entitys = userRepository.findByFullnameLike(fullname);
			lists =  customConverter.mapList(entitys, UserDTO.class);
		}
		return lists;
	}

	@Override
	public  boolean checkInventoryBook(long id) {
		BookEntity book =  bookRepository.checkInventory(id);
		return book !=null ? true : false;
	}
	
}
