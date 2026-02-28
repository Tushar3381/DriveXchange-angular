package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServicee {
    @Autowired
    private  AdminRepo repo;

    @Autowired
    private JwtUtil jwtUtil;

    public String login(String aemail, String apass) {
        Admin admin = repo.findByaemail(aemail)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!admin.getApass().equals(apass)) {
            throw new RuntimeException("Invalid Credentials");
        }

        return jwtUtil.generateToken(admin.getAemail());
    }
}
