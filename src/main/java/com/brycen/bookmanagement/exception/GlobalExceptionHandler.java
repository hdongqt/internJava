package com.brycen.bookmanagement.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.brycen.bookmanagement.dto.response.MessageResponse;


@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    // handle specific exceptions
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<MessageResponse> handleResourceNotFoundException(ResourceNotFoundException exception,
                                                                        WebRequest webRequest){
        MessageResponse errorDetails = new MessageResponse(exception.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BookAPIException.class)
    public ResponseEntity<MessageResponse> handleBlogAPIException(BookAPIException exception,
                                                                        WebRequest webRequest){
        MessageResponse errorDetails = new MessageResponse(exception.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
    // global exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<MessageResponse> handleGlobalException(Exception exception,
                                                               WebRequest webRequest){
        MessageResponse errorDetails = new MessageResponse(exception.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }

   
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, 
    		HttpHeaders headers, HttpStatus status, WebRequest request) {
    	 Map<String, String> errors = new HashMap<>();
       ex.getBindingResult().getAllErrors().forEach((error) ->{
//           String fieldName = ((FieldError)error).getField();
           String message = error.getDefaultMessage();
           errors.put("message", message);
       });

        return new ResponseEntity<>(errors,HttpStatus.BAD_REQUEST);
    }


}
