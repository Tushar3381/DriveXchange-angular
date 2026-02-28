package com.example.demo.User;

import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userservice;

    @GetMapping("/disp")
    public String get() {
        return "This is User API";
    }
    
//Registration User
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        return userservice.register(request);
    }

    
//Login User
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User u1) {
        return userservice.login(u1.getEmail(), u1.getPassword());
    }
    
// GET USER PROFILE BY ID
    @GetMapping("/profile/{id}")
    public ResponseEntity<User> getProfile(@PathVariable Long id) {
        return userservice.getProfile(id);
    }

// UPDATE USER PROFILE
    @PutMapping("/profile/update")
    public ResponseEntity<User> updateProfile(@RequestBody User user) {
        return userservice.updateProfile(user);
    }

// USER CAN CHANGE PASSWORD
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestParam Long id,
                                            @RequestParam String oldPassword,
                                            @RequestParam String newPassword) {

        return userservice.changePassword(id, oldPassword, newPassword);
    } 
    
   

}
