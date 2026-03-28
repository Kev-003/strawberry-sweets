FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    nodejs \
    npm \
    sqlite \
    sqlite-dev \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    icu-dev \
    libzip-dev

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_sqlite \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    intl \
    zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy project files
COPY . .

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev

# Install Node dependencies and build assets
RUN npm ci && npm run build

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Move config files into place (already copied via COPY . .)
RUN cp /var/www/docker/nginx.conf /etc/nginx/nginx.conf
RUN cp /var/www/docker/start.sh /start.sh
RUN chmod +x /start.sh

# Copy SSL certificates
RUN mkdir -p /etc/nginx/certs
RUN cp /var/www/docker/certs/origin.crt /etc/nginx/certs/origin.crt
RUN cp /var/www/docker/certs/origin.key /etc/nginx/certs/origin.key
RUN chmod 600 /etc/nginx/certs/origin.key

EXPOSE 80 443

CMD ["/start.sh"]