# DriveXchange

DriveXchange is a full-stack project with:
- Angular frontend (this repository root)
- Spring Boot backend (`backend/`)

## Project Structure

- `src/` - Angular application source code
- `backend/` - Spring Boot application source code

## Prerequisites

- Node.js (LTS) + npm
- Angular CLI (`npm install -g @angular/cli`)
- Java 17
- Maven (or use `mvnw` inside `backend/`)
- PostgreSQL

## Backend Setup (Spring Boot)

1. Go to backend folder:

```bash
cd backend
```

2. Configure database in `backend/src/main/resources/application.properties`.

3. Run backend:

```bash
./mvnw spring-boot:run
```

Windows PowerShell:

```powershell
.\mvnw.cmd spring-boot:run
```

Backend default URL: `http://localhost:8080`

## Frontend Setup (Angular)

1. From repository root, install dependencies:

```bash
npm install
```

2. Start Angular app:

```bash
ng serve
```

Frontend URL: `http://localhost:4200`

## Run Full Stack Locally

1. Start PostgreSQL
2. Start backend (`backend/`)
3. Start frontend (repo root)
4. Open `http://localhost:4200`

## Build

Frontend build:

```bash
ng build
```

Backend build:

```bash
cd backend
./mvnw clean package
```

Windows PowerShell:

```powershell
.\mvnw.cmd clean package
```

## Notes

- Do not commit real DB passwords or secrets. Use environment variables or local-only config.
- If CORS issues occur, verify backend CORS configuration and frontend API base URL.
