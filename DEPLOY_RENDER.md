# Deploy DriveXchange On Render

## Services

- `drivexchange-web`: Angular static site
- `drivexchange-api`: Spring Boot web service
- `drivexchange-db`: Render PostgreSQL

## Before You Deploy

Set these values in Render:

- `API_BASE_URL`
  - Example: `https://drivexchange-api.onrender.com`
- `APP_FRONTEND_BASE_URL`
  - Example: `https://drivexchange-web.onrender.com`
- `APP_CORS_ALLOWED_ORIGINS`
  - Example: `https://drivexchange-web.onrender.com`
- `APP_ADMIN_SETUP_KEY`
- `SPRING_MAIL_USERNAME`
- `SPRING_MAIL_PASSWORD`

## Deploy Steps

1. Push this repository to GitHub.
2. In Render, choose `New +` -> `Blueprint`.
3. Select this repository.
4. Render reads [render.yaml](d:/Projects/DriveXchange-angular/render.yaml) and creates the database, backend, and frontend.
5. After the first deploy, open the static site URL and backend URL in Render.
6. Update:
   - `API_BASE_URL` on the static site
   - `APP_FRONTEND_BASE_URL` on the backend
   - `APP_CORS_ALLOWED_ORIGINS` on the backend
7. Redeploy both services once after setting the final URLs.

## Important Notes

- Angular routes need SPA fallback. This is already configured in [render.yaml](d:/Projects/DriveXchange-angular/render.yaml).
- Reset password emails use `APP_FRONTEND_BASE_URL`. If this still points to `localhost`, email links will only work locally.
- Uploaded files are configured to use:
  - `/var/data/uploads`
  - `/var/data/car-uploads`
  These paths depend on the persistent disk attached to the Render backend service.
