package com.brycen.bookmanagement.dto.response;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public abstract class BaseOuput<T> {
	private int page;
	private int totalPage;
	private List<T> listResult = new ArrayList<>();
}
