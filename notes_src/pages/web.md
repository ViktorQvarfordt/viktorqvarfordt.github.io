# Web

## Apache proxy node app

1. Aktivera modulerna `mod_proxy`, `mod_proxy_http`.
2. Kör nodeservern på port `3000`.
2. Definiera `VirtualHost`:
```
<VirtualHost <serverns ip>:80>
  ServerName sub.domain.com

  ProxyRequests off
 
  <Proxy *>
    Order deny,allow
    Allow from all
  </Proxy>
 
  <Location />
    ProxyPass http://localhost:3000/
    ProxyPassReverse http://localhost:3000/
  </Location>
</VirtualHost>
```

