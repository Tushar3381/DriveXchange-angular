package com.example.demo;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@Validated
public class AdminController {
    private final AdminService adminService;
    private final AdminServicee authService;

    public AdminController(AdminService adminService, AdminServicee authService) {
        this.adminService = adminService;
        this.authService = authService;
    }

    @PostMapping("/saveAdminInfo")
    public ResponseEntity<?> register(@Valid @RequestBody AdminRegistrationRequest request) {
        return adminService.register(request);
    }

    @GetMapping("/fetchAdmin")
    public List<Admin> getAdmins() {
        return adminService.getallAdmins();
    }

    @DeleteMapping("/del/{aname}")
    public String deleteAdmin(@PathVariable String aname) {
        return adminService.deldata(aname);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AdminLoginRequest request) {
        String token = authService.login(request.getAemail(), request.getApass());
        return ResponseEntity.ok(Map.of("token", token));
    }
}
