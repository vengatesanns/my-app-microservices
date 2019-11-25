package com.security.custom.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistException(UserAlreadyExistException ex, WebRequest webReq) {
        return new ResponseEntity<ErrorResponse>(ErrorResponse.builder().timeStamp(LocalDateTime.now())
                .errorMessage(ex.getMessage())
                .owner("HackPro").build(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserServiceException.class)
    public ResponseEntity<ErrorResponse> handleAllException(UserServiceException ex, WebRequest webReq) {
        return new ResponseEntity<ErrorResponse>(ErrorResponse.builder()
                .errorMessage("Internal Server Error")
                .owner("HackPro")
                .timeStamp(LocalDateTime.now()).build(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
