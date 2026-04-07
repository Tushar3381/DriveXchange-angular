package com.example.demo.User;

import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<?> login(String email, String password);

    ResponseEntity<User> getProfile(Long id);

    ResponseEntity<User> updateProfile(User user);

    ResponseEntity<?> changePassword(Long id, String oldPassword, String newPassword);

    ResponseEntity<?> register(RegisterRequest request);

    ResponseEntity<?> forgotPassword(ForgotPasswordRequest request);

    ResponseEntity<?> resetPassword(ResetPasswordRequest request);
}
