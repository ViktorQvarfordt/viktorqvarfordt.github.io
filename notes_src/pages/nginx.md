# Nginx

Small example config for use with multiple node.js apps and static files, `/etc/nginx/nginx.conf`:

    user www-data;
    worker_processes 4;
    pid /var/run/nginx.pid;

    events {
        worker_connections 768;
    }

    http {
        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 65;
        types_hash_max_size 2048;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        # Logging
        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        server {
            location /node_js_app_first {
                proxy_pass http://127.0.0.1:8000/;
            }
            location /node_js_app_second {
                proxy_pass http://127.0.0.1:8001/;
            }
            location /~user {
                autoindex on;
                alias /home/user/public_html/;
            }
        }
    }
