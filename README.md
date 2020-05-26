[![Build Status](https://travis-ci.com/alexmoras/glacier.svg?branch=staging)](https://travis-ci.com/alexmoras/glacier) [![GitHub Issues](https://img.shields.io/github/issues/alexmoras/glacier)](https://github.com/alexmoras/glacier/issues) [![Licence](https://img.shields.io/github/license/alexmoras/glacier)](https://github.com/alexmoras/glacier/blob/master/LICENSE) 

# Glacier
Glacier is an open source "in case of emergency" contact details sharing solution. Designed as a web application, Glacier allows the emergency services, by default Police and Ambulance services, to access these details when an emergency occurs.

## Project design:
The software is split in to two main components. The API is written in Node.js/Express.js and is stored in the `backend` folder. The user interface is written in Vue.js and stored in the `frontend` folder. Frontend makes HTTP requests to the backend and authenticates users with JSON Web Tokens. These requests are proxied.
  
## Starting the development environment:  
Both frontend and backend need to contain a `.env` file containing the configuration values, the end of this file explains how to create the file.

Starting the development environment requires two terminals open to watch both the frontend and backend processes. The backend should be started first with the following commands:  
```
cd backend
npm install
npm start
```

Start the frontend with:
```
cd frontend
npm install
npm run serve
```

## Starting the production environment:
The production environment uses NGINX to serve as an intermediary between the client and the frontend application. This allows for SSL Certificates to be installed but most importantly, proxies all `/api` requests to the backend server. This file will not show you how to setup NGINX, any default install with proxied requests will work.

PM2 is used as a process manager for monitoring the backend, spawning new instances of the application and load balancing them.

Once NGINX is setup to proxy `/api` requests to the backend, run the following:
```
cd backend
npm install
pm2 start bin/www --name Glacier
```

Next, we need to ensure NGINX points to the `frontend/dist` folder which serves the frontend and run:
```
cd frontend
npm install
npm run build
```
Using the `npm run build` command is different to the development server. The `build` command builds the Vue.js application in to the `dist` folder to be served by a web server, in our case NGINX.

## Configuration files:
The backend config values must be stored in `backend/.env`:
```
API_PORT=3000  # Port that all API requests are made to, each instance must be different

# Email config - required for sending login token to users
MAIL_USER=""  
MAIL_PASS=""  
MAIL_HOST=""  
MAIL_PORT=25  

# Database config - required, uses MongoDB
DB_USER=""  
DB_URL=""  
DB_PASS=""  

SENTRY=""  # Sentry.io DST link, logs all errors and provides analysis
JWT_PRIVATE=""  # Must be a unique value used to sign JSON Web Tokens
RECAPTCHA_SECRET=""  # Google reCaptcha secret
```

The frontend config values must be stored in `frontend/.env`:
```
VUE_APP_URL=""  # URL that is sent in the login token email
VUE_APP_API_URL=""  # Where the APU requests will be sent
VUE_APP_SENTRY=""  # Sentry.io DST link, logs all errors and provides analysis
VUE_APP_RECAPTCHA=""  # Google reCaptcha app key
```
