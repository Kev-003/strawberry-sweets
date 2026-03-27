#!/bin/sh

# Fix permissions first — before anything else
touch /var/www/database/database.sqlite
chown -R www-data:www-data /var/www/database
chmod 664 /var/www/database/database.sqlite
chown -R www-data:www-data /var/www/storage
chmod -R 775 /var/www/storage
chown -R www-data:www-data /var/www/bootstrap/cache
chmod -R 775 /var/www/bootstrap/cache


# Cache config for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
#php artisan migrate --force

# Seed admin users
#php artisan db:seed --force

# Generate sitemap
php artisan sitemap:generate

# Only create symlink if it doesn't exist
if [ ! -L /var/www/public/storage ]; then
    php artisan storage:link
fi

# Publish Livewire and Filament assets
php artisan livewire:publish --assets
php artisan filament:assets

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