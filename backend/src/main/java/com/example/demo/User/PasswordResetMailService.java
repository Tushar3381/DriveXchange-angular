package com.example.demo.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
public class PasswordResetMailService {
    private static final Logger logger = LoggerFactory.getLogger(PasswordResetMailService.class);

    private final ObjectProvider<JavaMailSender> mailSenderProvider;
    private final String frontendBaseUrl;
    private final String fromAddress;
    private final String fromName;
    private final String mailHost;
    private final String mailUsername;
    private final String mailPassword;
    private final boolean exposeLinkInResponse;

    public PasswordResetMailService(
            ObjectProvider<JavaMailSender> mailSenderProvider,
            @Value("${app.frontend.base-url:http://localhost:4200}") String frontendBaseUrl,
            @Value("${spring.mail.username:no-reply@drivexchange.local}") String fromAddress,
            @Value("${app.mail.from-name:DriveXchange Support}") String fromName,
            @Value("${spring.mail.host:}") String mailHost,
            @Value("${spring.mail.username:}") String mailUsername,
            @Value("${spring.mail.password:}") String mailPassword,
            @Value("${app.reset.debug-expose-link:false}") boolean exposeLinkInResponse) {
        this.mailSenderProvider = mailSenderProvider;
        this.frontendBaseUrl = frontendBaseUrl;
        this.fromAddress = fromAddress;
        this.fromName = fromName;
        this.mailHost = mailHost;
        this.mailUsername = mailUsername;
        this.mailPassword = mailPassword;
        this.exposeLinkInResponse = exposeLinkInResponse;
    }

    public boolean isDeliveryConfigured() {
        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
        return mailSender != null
                && mailHost != null
                && !mailHost.isBlank()
                && mailUsername != null
                && !mailUsername.isBlank()
                && mailPassword != null
                && !mailPassword.isBlank();
    }

    public boolean isDebugLinkExposureEnabled() {
        return exposeLinkInResponse;
    }

    public DeliveryResult sendResetLink(String email, String token) {
        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
        String resetLink = String.format("%s/User/forgotpassword?token=%s", frontendBaseUrl.replaceAll("/+$", ""), token);

        if (!isDeliveryConfigured()) {
            logger.warn("Password reset email service is not configured. Reset link for {}: {}", email, resetLink);
            return exposeLinkInResponse
                    ? DeliveryResult.debugLink(resetLink)
                    : DeliveryResult.unavailable();
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

            helper.setTo(email);
            helper.setSubject("DriveXchange Password Reset Request");
            helper.setFrom(new InternetAddress(fromAddress, fromName));
            helper.setText(buildPlainTextEmail(resetLink), buildHtmlEmail(resetLink));

            mailSender.send(message);
            return DeliveryResult.sent();
        } catch (MessagingException ex) {
            logger.warn("Unable to build password reset email for {}: {}", email, resetLink, ex);
            return DeliveryResult.failed(resolveReason(ex));
        } catch (MailException ex) {
            logger.warn("Unable to send password reset email. Reset link for {}: {}", email, resetLink, ex);
            return exposeLinkInResponse
                    ? DeliveryResult.debugLink(resetLink)
                    : DeliveryResult.failed(resolveReason(ex));
        }
    }

    private String buildPlainTextEmail(String resetLink) {
        StringBuilder builder = new StringBuilder();
        builder.append("DriveXchange Password Reset").append("\n\n");
        builder.append("We received a request to reset your DriveXchange password.").append("\n\n");
        builder.append("Reset your password using the secure link below:").append("\n");
        builder.append(resetLink).append("\n\n");
        builder.append("This link expires in 15 minutes and can be used only once.").append("\n");
        if (resetLink.contains("localhost")) {
            builder.append("Because this link uses localhost, open it on the same machine where DriveXchange is running.")
                    .append("\n");
        }
        builder.append("\nIf you did not request this reset, you can safely ignore this email.");
        return builder.toString();
    }

    private String buildHtmlEmail(String resetLink) {
        String machineHint = resetLink.contains("localhost")
                ? "<p style=\"margin:0 0 16px;color:#9a6700;font-size:14px;line-height:1.6;\">"
                        + "Testing note: this link uses <strong>localhost</strong>, so open it on the same machine where DriveXchange is running."
                        + "</p>"
                : "";

        return "<div style=\"margin:0;padding:32px 16px;background:#f3f6fb;font-family:Segoe UI,Arial,sans-serif;color:#10233d;\">"
                + "<div style=\"max-width:640px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #dbe5f0;box-shadow:0 18px 48px rgba(16,35,61,0.08);\">"
                + "<div style=\"padding:24px 32px;background:linear-gradient(135deg,#10233d,#27486b);color:#ffffff;\">"
                + "<div style=\"font-size:13px;letter-spacing:2px;text-transform:uppercase;opacity:0.85;\">DriveXchange Support</div>"
                + "<h1 style=\"margin:12px 0 0;font-size:30px;line-height:1.2;\">Reset your password</h1>"
                + "</div>"
                + "<div style=\"padding:32px;\">"
                + "<p style=\"margin:0 0 16px;font-size:16px;line-height:1.7;color:#334b68;\">We received a request to reset your DriveXchange password. Use the secure button below to continue.</p>"
                + "<div style=\"margin:28px 0;\">"
                + "<a href=\"" + resetLink + "\" style=\"display:inline-block;padding:14px 24px;border-radius:12px;background:#1f5eff;color:#ffffff;text-decoration:none;font-size:16px;font-weight:700;\">Reset Password</a>"
                + "</div>"
                + "<p style=\"margin:0 0 16px;font-size:14px;line-height:1.7;color:#556b86;word-break:break-word;\">If the button does not open, copy and paste this link into your browser:<br><a href=\""
                + resetLink
                + "\" style=\"color:#1f5eff;text-decoration:none;\">"
                + resetLink
                + "</a></p>"
                + machineHint
                + "<div style=\"padding:16px 18px;border-radius:14px;background:#f6f9fc;border:1px solid #e2eaf3;\">"
                + "<p style=\"margin:0 0 10px;font-size:14px;line-height:1.6;color:#334b68;\"><strong>Security details</strong></p>"
                + "<p style=\"margin:0;font-size:14px;line-height:1.6;color:#556b86;\">This link expires in 15 minutes and can only be used once. If you did not request a password reset, you can safely ignore this email.</p>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>";
    }

    private String resolveReason(Exception ex) {
        Throwable cause = ex;
        while (cause.getCause() != null) {
            cause = cause.getCause();
        }
        String message = cause.getMessage();
        if (message == null || message.isBlank()) {
            message = ex.getMessage();
        }
        return message == null ? "Unknown email delivery error." : message;
    }

    public static final class DeliveryResult {
        private final boolean delivered;
        private final boolean configurationMissing;
        private final String debugResetLink;
        private final String failureReason;

        private DeliveryResult(boolean delivered, boolean configurationMissing, String debugResetLink, String failureReason) {
            this.delivered = delivered;
            this.configurationMissing = configurationMissing;
            this.debugResetLink = debugResetLink;
            this.failureReason = failureReason;
        }

        public static DeliveryResult sent() {
            return new DeliveryResult(true, false, null, null);
        }

        public static DeliveryResult failed(String failureReason) {
            return new DeliveryResult(false, false, null, failureReason);
        }

        public static DeliveryResult unavailable() {
            return new DeliveryResult(false, true, null, null);
        }

        public static DeliveryResult debugLink(String debugResetLink) {
            return new DeliveryResult(false, true, debugResetLink, null);
        }

        public boolean wasDelivered() {
            return delivered;
        }

        public boolean hasConfigurationIssue() {
            return configurationMissing;
        }

        public String getDebugResetLink() {
            return debugResetLink;
        }

        public String getFailureReason() {
            return failureReason;
        }
    }
}
