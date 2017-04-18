package com.virohtus.keeperteacher.drills.base;

import com.virohtus.keeperteacher.drills.drill.DrillValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // todo error model
    private final DrillValidator drillValidator;

    @Autowired
    public GlobalExceptionHandler(DrillValidator drillValidator) {
        this.drillValidator = drillValidator;
    }

    @InitBinder
    public void dataBinding(WebDataBinder webDataBinder) {
        webDataBinder.addValidators(drillValidator);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Exception handleException(Exception e) {
        return e;
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResourceNotFoundException handleResourceNotFound(ResourceNotFoundException e) {
        return e;
    }
}
