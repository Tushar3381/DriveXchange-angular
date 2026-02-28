package com.example.demo.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDao implements UserService {

    @Autowired
    private UserRepo ur;
    
    
//Password encoder instance
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    
//USER REGISTER
    @Override
    public ResponseEntity<?> register(RegisterRequest request) {

        // Check if email already exists
        if (ur.findByEmail(request.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        // Check password match
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match");
        }

        // Create User object
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setGender(request.getGender());
        user.setContactnumber(request.getContactnumber());

        // Encode password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        ur.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

 
//USER LOGIN
    @Override
    public ResponseEntity<?> login(String email, String password) {
        User user = ur.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(404).body("❌ User not found");
        }

//Match raw password with encoded password
        if (passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("❌ Invalid password");
        }
    }
    
//GET USER PROFILE
    @Override
    public ResponseEntity<User> getProfile(Long id) {

        User user = ur.findById(id).orElse(null);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user);
    }
//UPDATE USER PROFILE

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

//USER CAN CHANGE PASSWORD 
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

//USER REGISTRATION ALL FILED ARE MANDETORY
    
    
    
    
    
    
    
    
    
    
    
    
}
    
