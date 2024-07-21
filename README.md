# TurboTeX

TurboTeX is a fast collaborative LaTeX editor in the browser. 

## Current state of the project

On the `main` branch is a simple demo that uses [SwiftLaTeX](https://www.swiftlatex.com/), a WebAssembly LaTeX engine, to compile LaTeX in the browser. 
This differs from services like Overleaf that do all the compilation on the server-side, by avoiding a round trip to the server. 

Thanks to in-browser compilation, subsequent compilations are significantly (probably 2-3x) faster than Overleaf. 
However, the first compilation is slower because the website has to download the swiftlatex package beforehand. This shouldn't be too hard to fix.  

On another branch (`anthony/collab`) is a simple patch to make the editor collaborative using `yjs` (a library for shared data types) and websockets. However, this requires a running instance of a `yjs` websocket server. 

I have currently stopped working on the project, because I no longer write many LaTeX documents. 
I would recommend [Typst](https://typst.app/) for anyone who wants to produce typset mathematics and doesn't have a specific need for LaTeX. 
That said, I am happy to share what I've learned with anyone who is working on a related project. 

## Notes on setting up the `yjs` websocket server

First, start up an EC2 instance (or some other server) that allows traffic on HTTP and HTTPS. Feel free to ignore these instructions if you already know how to set up a websocket server for `yjs`. 

1. Install pm2 as in [this guide](https://betterprogramming.pub/deploying-a-basic-express-api-on-amazon-ec2-eea0b54a825), and run `index.js` 
    1. Install nodejs in the updated way (not as the article says) using a package manager. 
    2. Ignore the weird `iptables` thing they do — we’re using `nginx` instead. 
2. Install nginx: http://nginx.org/en/linux_packages.html

Then make nginx conf as follows (assuming you use the `y-websocket` example server):

```jsx
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    server {
	listen 80;
    	    server_name your_domain.com;

    location / {
            proxy_pass http://localhost:1234;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
     }
    }
}
```
