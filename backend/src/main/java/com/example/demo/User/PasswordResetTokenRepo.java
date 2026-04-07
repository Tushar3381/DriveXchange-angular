package com.example.demo.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetTokenRepo extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByTokenAndUsedAtIsNull(String token);

    List<PasswordResetToken> findByEmailAndUsedAtIsNull(String email);
}
