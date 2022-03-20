package com.brycen.bookmanagement.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CustomConverter {
	private static ModelMapper mapper = new ModelMapper();


	//mapper entity to dto
	public <S,T> T mapToDTO(S source,Class<T> targetClass) {
		return mapper.map(source, targetClass);
	}
	
	//mapper list entity to dto
	public <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
		      return source
		      .stream()
		      .map(element -> mapper.map(element, targetClass))
		      .collect(Collectors.toList());
	}
	  public <S, D> D mapToEntity(final S source, D destination) {
		    mapper.getConfiguration().setSkipNullEnabled(true);
		    mapper.getConfiguration().setAmbiguityIgnored(true);
		    mapper.map(source, destination);
	        return destination;
	    }
}
