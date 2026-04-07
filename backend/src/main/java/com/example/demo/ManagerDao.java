package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ManagerDao implements AdminService {
    private final AdminRepo adminRepo;
    private final PasswordEncoder passwordEncoder;
    private final String adminSetupKey;

    public ManagerDao(
            AdminRepo adminRepo,
            PasswordEncoder passwordEncoder,
            @Value("${app.admin.setup-key:}") String adminSetupKey) {
        this.adminRepo = adminRepo;
        this.passwordEncoder = passwordEncoder;
        this.adminSetupKey = adminSetupKey;
    }

    @Override
    public ResponseEntity<?> register(AdminRegistrationRequest request) {
        if (adminRepo.count() > 0) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Admin self-registration is disabled after initial setup.");
        }

        if (adminSetupKey == null || adminSetupKey.isBlank()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Admin setup key is not configured.");
        }

        if (!adminSetupKey.equals(request.getSetupKey())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Invalid admin setup key.");
        }

        if (adminRepo.findByAemail(request.getAemail()).isPresent()) {
            return ResponseEntity.badRequest().body("Admin email is already registered.");
        }

        Admin admin = new Admin();
        admin.setAname(request.getAname());
        admin.setAemail(request.getAemail());
        admin.setApass(passwordEncoder.encode(request.getApass()));

        adminRepo.save(admin);
        return ResponseEntity.ok("Admin registered successfully.");
    }

    @Override
    public List<Admin> getallAdmins() {
        return adminRepo.findAll();
    }

    @Override
    public String deldata(String aname) {
        if (!adminRepo.existsById(aname)) {
            return "Admin record not found";
        }

        adminRepo.deleteById(aname);
        return "Record deleted";
    }
}
