package com.taskflow.taskflowbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.taskflow.taskflowbackend.entity.User;

import com.taskflow.taskflowbackend.repository.UserRepository;

import com.taskflow.taskflowbackend.security.JwtUtil;

import com.taskflow.taskflowbackend.security.LoginResponse;

@Service

public class UserService {

    @Autowired

    private UserRepository userRepository;

    // CREATE USER

    public User createUser(User user) {

        return userRepository.save(user);

    }

    // GET ALL USERS

    public List<User> getAllUsers() {

        return userRepository.findAll();

    }

    // LOGIN USER WITH JWT

    public LoginResponse loginUser(
            String email,
            String password
    ) {

        User user =
                userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                );

        if(!user.getPassword().equals(password)){

            throw new RuntimeException("Invalid password");
        }

        // GENERATE JWT TOKEN

        String token =
                JwtUtil.generateToken(user.getEmail());

        return new LoginResponse(

                token,

                user.getEmail(),

                user.getRole()
        );
    }

    // DELETE USER

    public void deleteUser(Long id) {

        userRepository.deleteById(id);

    }

}