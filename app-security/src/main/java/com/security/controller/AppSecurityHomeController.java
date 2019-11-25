package com.security.controller;

import com.security.custom.exception.UserAlreadyExistException;
import com.security.custom.exception.UserServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.security.request.LoginUserDetails;
import com.security.service.UserService;

@RestController
@RequestMapping("/security")
public class AppSecurityHomeController {

    @Autowired
    private UserService userService;

    @PostMapping("/register-new-user")
    public void registerNewUser(@RequestBody LoginUserDetails loginUserDetails) throws UserAlreadyExistException, UserServiceException {
        if (userService.checkUserAlreadyExist(loginUserDetails))
            userService.saveNewLoginUser(loginUserDetails);
    }

}
