package com.example.demo.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDao implements UserService {

    @Autowired
    private UserRepo ur;

    @Autowired
    private PasswordResetTokenRepo passwordResetTokenRepo;

    @Autowired
    private PasswordResetMailService passwordResetMailService;

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

    @Override
    public ResponseEntity<?> forgotPassword(ForgotPasswordRequest request) {
        if (!passwordResetMailService.isDeliveryConfigured()
                && !passwordResetMailService.isDebugLinkExposureEnabled()) {
            return ResponseEntity.status(503)
                    .body("Password reset email delivery is not configured yet. Please contact support.");
        }

        User user = ur.findByEmail(request.getEmail());
        PasswordResetMailService.DeliveryResult deliveryResult = null;

        if (user != null) {
            List<PasswordResetToken> activeTokens = passwordResetTokenRepo.findByEmailAndUsedAtIsNull(user.getEmail());
            LocalDateTime now = LocalDateTime.now();

            for (PasswordResetToken token : activeTokens) {
                token.setUsedAt(now);
            }
            passwordResetTokenRepo.saveAll(activeTokens);

            PasswordResetToken resetToken = new PasswordResetToken();
            resetToken.setEmail(user.getEmail());
            resetToken.setToken(UUID.randomUUID().toString());
            resetToken.setExpiresAt(now.plusMinutes(15));

            passwordResetTokenRepo.save(resetToken);
            deliveryResult = passwordResetMailService.sendResetLink(user.getEmail(), resetToken.getToken());
        }

        if (deliveryResult != null && deliveryResult.getDebugResetLink() != null) {
            return ResponseEntity.ok(
                    "Development reset link: " + deliveryResult.getDebugResetLink()
                            + " | Email delivery is not configured, so the link was returned for local testing.");
        }

        if (deliveryResult != null && !deliveryResult.wasDelivered() && !deliveryResult.hasConfigurationIssue()) {
            return ResponseEntity.status(503)
                    .body("We could not send the reset email right now. " + deliveryResult.getFailureReason());
        }

        return ResponseEntity.ok(
                "If an account exists for that email, a reset link has been sent. Please check your inbox.");
    }

    @Override
    public ResponseEntity<?> resetPassword(ResetPasswordRequest request) {
        PasswordResetToken resetToken = passwordResetTokenRepo.findByTokenAndUsedAtIsNull(request.getToken())
                .orElse(null);

        if (resetToken == null) {
            return ResponseEntity.badRequest().body("This reset link is invalid or has already been used.");
        }

        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            resetToken.setUsedAt(LocalDateTime.now());
            passwordResetTokenRepo.save(resetToken);
            return ResponseEntity.badRequest().body("This reset link has expired. Please request a new one.");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match.");
        }

        if (request.getNewPassword().length() < 6) {
            return ResponseEntity.badRequest().body("Password must be at least 6 characters.");
        }

        User user = ur.findByEmail(resetToken.getEmail());
        if (user == null) {
            resetToken.setUsedAt(LocalDateTime.now());
            passwordResetTokenRepo.save(resetToken);
            return ResponseEntity.badRequest().body("This reset request is no longer valid.");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        ur.save(user);

        resetToken.setUsedAt(LocalDateTime.now());
        passwordResetTokenRepo.save(resetToken);

        return ResponseEntity.ok("Password reset successful. Please login with your new password.");
    }
}
