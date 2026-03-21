#!/bin/sh

# Cache config for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Ensure SQLite database exists
touch /var/www/database/database.sqlite

# Run migrations
php artisan migrate --force

# Generate sitemap
php artisan sitemap:generate

# Create storage symlink
php artisan storage:link

# Start PHP-FPM in background
php-fpm -D

# Start Nginx in foreground
nginx -g "daemon off;"
```

---

**4. Create `.dockerignore` in project root:**
```
node_modules
.git
.env
storage/logs/*
storage/framework/cache/*
storage/framework/sessions/*
storage/framework/views/*
```

---

**5. On Render:**

- Choose **Web Service**
- Connect your GitHub repo
- Set **Environment** to `Docker`
- Set **Environment Variables** — add all your production `.env` values here via Render's dashboard (never commit `.env`)

Key ones to add in Render's env panel:
```
APP_NAME=${APP_NAME}
APP_ENV=${APP_ENV}
APP_KEY=${APP_KEY}
APP_DEBUG=${APP_DEBUG}
APP_URL=${APP_URL}
APP_TIMEZONE=${APP_TIMEZONE}
DB_CONNECTION=${DB_CONNECTION}
SESSION_DRIVER=${SESSION_DRIVER}
SESSION_ENCRYPT=${SESSION_ENCRYPT}
FILESYSTEM_DISK=${FILESYSTEM_DISK}