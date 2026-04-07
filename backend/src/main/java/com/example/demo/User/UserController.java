package com.example.demo.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userservice;

    @GetMapping("/disp")
    public String get() {
        return "This is User API";
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        return userservice.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User u1) {
        return userservice.login(u1.getEmail(), u1.getPassword());
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<User> getProfile(@PathVariable Long id) {
        return userservice.getProfile(id);
    }

    @PutMapping("/profile/update")
    public ResponseEntity<User> updateProfile(@RequestBody User user) {
        return userservice.updateProfile(user);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestParam Long id,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {

        return userservice.changePassword(id, oldPassword, newPassword);
    }

}
