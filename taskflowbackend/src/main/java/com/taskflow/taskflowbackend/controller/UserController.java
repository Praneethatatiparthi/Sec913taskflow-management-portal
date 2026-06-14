package com.taskflow.taskflowbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import com.taskflow.taskflowbackend.dto.LoginRequest;

import com.taskflow.taskflowbackend.entity.User;

import com.taskflow.taskflowbackend.security.LoginResponse;

import com.taskflow.taskflowbackend.service.UserService;

@RestController

@RequestMapping("/api/users")

@CrossOrigin("*")

public class UserController {

    @Autowired

    private UserService userService;

    // CREATE USER

    @PostMapping

    public User createUser(@RequestBody User user) {

        return userService.createUser(user);

    }

    // GET ALL USERS

    @GetMapping

    public List<User> getAllUsers() {

        return userService.getAllUsers();

    }

    // LOGIN USER WITH JWT

    @PostMapping("/login")

    public LoginResponse loginUser(
            @RequestBody LoginRequest loginRequest
    ) {

        return userService.loginUser(

                loginRequest.getEmail(),

                loginRequest.getPassword()
        );
    }

    // DELETE USER

    @DeleteMapping("/{id}")

    public String deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return "User deleted successfully";
    }

}