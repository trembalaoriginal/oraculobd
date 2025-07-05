# Use uma imagem PHP-FPM oficial como base
# Escolha a versão do PHP que você precisa (ex: 8.2, 8.3)
FROM php:8.3-fpm-alpine

# Instale dependências do sistema necessárias, como git, unzip (para composer) e nginx
RUN apk add --no-cache \
    nginx \
    git \
    unzip \
    fcgi

# Copie sua aplicação para o diretório de trabalho do Nginx
WORKDIR /var/www/html

# Copie os arquivos da sua aplicação (exceto os ignorados pelo .dockerignore)
COPY . .

# Copie a configuração do Nginx (você precisará criar este arquivo)
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf

# Copie a configuração do PHP-FPM (você precisará criar este arquivo)
COPY docker/php-fpm/www.conf /etc/php8/php-fpm.d/www.conf

# Instale o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Execute composer install (apenas dependências de produção)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Defina as permissões corretas para o diretório de cache/logs do PHP (se houver)
# Altere 'storage' e 'bootstrap/cache' se seu projeto tiver outras pastas de escrita
RUN chown -R www-data:www-data /var/www/html/public /var/www/html/src /var/www/html/vendor /var/www/html/logs && \
    chmod -R 775 /var/www/html/logs && \
    chmod -R 775 /var/www/html/bootstrap/cache # Ajuste conforme seu projeto

# Exponha a porta Nginx (padrão HTTP)
EXPOSE 80

# Comando para iniciar o Nginx e o PHP-FPM
CMD ["sh", "-c", "nginx -g 'daemon off;' & php-fpm -F"]
