# Project Setup and Requirements

## **Software Requirements**

To successfully run this project, ensure the following software is installed:

- **Composer** – A dependency manager for PHP.
- **Node.js** – A JavaScript runtime environment required for managing frontend dependencies.
- **XAMPP** (Apache & MySQL) – A development environment for PHP and MySQL.
- **PHP 8.2.12** – The required version of PHP for compatibility with this project.

---

### **Installation Steps**

#### 1. **Install Project Dependencies**

To install all necessary dependencies for both the backend and frontend, execute the following commands:

```bash
# Install Node.js dependencies
npm install

# Install PHP dependencies via Composer
composer install
```

#### 2. **Configure Database Connection and Email Notifications**

To configure the environmental variables for the database connection and email notification address, copy `.env.example` and rename it to `.env.local`.
Change the environment variables for the database connection email notification address.
For Gmail users, you must set the app password here: [Generate Gmail App Password](https://myaccount.google.com/apppasswords)
Example:

```bash
# Change DB_HOST to the database host connection
DB_HOST=localhost
# Change DB_NAME to the name of the database used. Must be created first via PHPMyAdmin or mysql cli
DB_NAME=gcms
# Change DB_USER to the username of the database. default is root
DB_USER=root
# Change DB_PASS to the password of the user of the database. default is no password
DB_PASS=
# Change URI_PREFIX to the name of the folder from htdocs
URI_PREFIX=/cap

EMAIL_USERNAME=username@gmail.com
# if gmail is used, you must set the app password here: https://myaccount.google.com/apppasswords
EMAIL_PASSWORD="my password"
EMAIL_ADDRESS=username@gmail.com
EMAIL_NAME="MY NAME HERE"
EMAIL_TO_TEST=michinowa_bataluna@gmail.com
```

#### 4. **Build Web Assets**

Before accessing the website or running the web server, you must compile the frontend assets (JavaScript, CSS, etc.):

```bash
# Build assets on source code changes
npm run build
```

#### 4. Watch for Source Code Changes

If any changes are made to the source code, use the following command to continuously monitor and rebuild the necessary assets:

```bash
# Automatically rebuild assets on source code changes
npm run watch:all
```
