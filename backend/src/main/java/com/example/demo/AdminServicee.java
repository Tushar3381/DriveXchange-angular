package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AdminServicee {
    private final AdminRepo repo;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AdminServicee(AdminRepo repo, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public String login(String aemail, String apass) {
        if (aemail == null || apass == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        Admin admin = repo.findByAemail(aemail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        String storedPassword = admin.getApass();
        boolean passwordMatches = passwordEncoder.matches(apass, storedPassword);

        // Support legacy plain-text admin passwords once, then upgrade them to bcrypt.
        if (!passwordMatches && apass.equals(storedPassword)) {
            admin.setApass(passwordEncoder.encode(apass));
            repo.save(admin);
            passwordMatches = true;
        }

        if (!passwordMatches) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        return jwtUtil.generateToken(admin.getAemail());
    }
}
