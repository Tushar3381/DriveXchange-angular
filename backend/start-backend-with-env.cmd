@echo off
setlocal

for /f "tokens=2,*" %%a in ('reg query HKCU\Environment /v APP_FRONTEND_BASE_URL ^| find "REG_SZ"') do set "APP_FRONTEND_BASE_URL=%%b"
for /f "tokens=2,*" %%a in ('reg query HKCU\Environment /v SPRING_MAIL_HOST ^| find "REG_SZ"') do set "SPRING_MAIL_HOST=%%b"
for /f "tokens=2,*" %%a in ('reg query HKCU\Environment /v SPRING_MAIL_PORT ^| find "REG_SZ"') do set "SPRING_MAIL_PORT=%%b"
for /f "tokens=2,*" %%a in ('reg query HKCU\Environment /v SPRING_MAIL_USERNAME ^| find "REG_SZ"') do set "SPRING_MAIL_USERNAME=%%b"
for /f "tokens=2,*" %%a in ('reg query HKCU\Environment /v SPRING_MAIL_PASSWORD ^| find "REG_SZ"') do set "SPRING_MAIL_PASSWORD=%%b"
for /f "tokens=2,*" %%a in ('reg query HKCU\Environment /v SPRING_MAIL_SMTP_AUTH ^| find "REG_SZ"') do set "SPRING_MAIL_SMTP_AUTH=%%b"
for /f "tokens=2,*" %%a in ('reg query HKCU\Environment /v SPRING_MAIL_SMTP_STARTTLS ^| find "REG_SZ"') do set "SPRING_MAIL_SMTP_STARTTLS=%%b"
for /f "tokens=2,*" %%a in ('reg query HKCU\Environment /v APP_RESET_DEBUG_EXPOSE_LINK ^| find "REG_SZ"') do set "APP_RESET_DEBUG_EXPOSE_LINK=%%b"

set "SPRING_MAIL_PASSWORD=%SPRING_MAIL_PASSWORD: =%"

apache-maven-3.9.10\bin\mvn.cmd spring-boot:run ^
  -Dspring-boot.run.jvmArguments="-Dapp.frontend.base-url=%APP_FRONTEND_BASE_URL% -Dspring.mail.host=%SPRING_MAIL_HOST% -Dspring.mail.port=%SPRING_MAIL_PORT% -Dspring.mail.username=%SPRING_MAIL_USERNAME% -Dspring.mail.password=%SPRING_MAIL_PASSWORD% -Dspring.mail.properties.mail.smtp.auth=%SPRING_MAIL_SMTP_AUTH% -Dspring.mail.properties.mail.smtp.starttls.enable=%SPRING_MAIL_SMTP_STARTTLS% -Dapp.reset.debug-expose-link=%APP_RESET_DEBUG_EXPOSE_LINK%"
