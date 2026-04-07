package com.example.demo.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDao implements UserService {

    @Autowired
    private UserRepo ur;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public ResponseEntity<?> register(RegisterRequest request) {
        if (ur.findByEmail(request.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setGender(request.getGender());
        user.setContactnumber(request.getContactnumber());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        ur.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @Override
    public ResponseEntity<?> login(String email, String password) {
        User user = ur.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(404).body("❌ User not found");
        }

        if (passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.status(401).body("❌ Invalid password");
    }

    @Override
    public ResponseEntity<User> getProfile(Long id) {
        User user = ur.findById(id).orElse(null);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user);
    }

    @Override
    public ResponseEntity<User> updateProfile(User user) {
        User existing = ur.findById(user.getId()).orElse(null);

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        existing.setName(user.getName());
        existing.setContactnumber(user.getContactnumber());
        existing.setProfileImage(user.getProfileImage());

        ur.save(existing);

        return ResponseEntity.ok(existing);
    }

    @Override
    public ResponseEntity<?> changePassword(Long id, String oldPassword, String newPassword) {
        User user = ur.findById(id).orElse(null);

        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return ResponseEntity.status(401).body("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        ur.save(user);

        return ResponseEntity.ok("Password changed successfully");
    }

}
