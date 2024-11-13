<?php
session_start();

define('APP_TITLE', $_ENV['APP_TITLE'] ?? "SMCC");

define('URI_PREFIX', $_ENV['URI_PREFIX'] ?? "/" . basename(dirname(dirname(__DIR__))));
define('PAGE_URI', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
define('CLEARED_PAGE_URI', str_replace(URI_PREFIX, "", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)));

if ($_SERVER['REQUEST_METHOD'] == "GET" && !str_starts_with(CLEARED_PAGE_URI, "/api")) {
  // check if uri is does not have file extension
  $uri = explode('/', PAGE_URI);
  $uri = array_pop($uri);
  // check if $uri string does not contain a file extension
  $ext = pathinfo($uri, PATHINFO_EXTENSION);
  if (empty($ext)) {
    $_SESSION['prev_url'] = $_SERVER['REQUEST_URI'];
  }
}

// connect to dataabse
define('DB_NAME', $_ENV['DB_NAME'] ?? 'gcms');
define('DB_HOST', $_ENV['DB_HOST'] ?? 'localhost');
define('DB_USER', $_ENV['DB_USER'] ?? 'root');
define('DB_PASS', $_ENV['DB_PASS'] ?? '');

define('EMAIL_USERNAME', $_ENV['EMAIL_USERNAME'] ?? '');
define('EMAIL_PASSWORD', $_ENV['EMAIL_PASSWORD'] ?? '');
define('EMAIL_ADDRESS', $_ENV['EMAIL_ADDRESS'] ?? '');
define('EMAIL_NAME', $_ENV['EMAIL_NAME'] ?? '');

define('EMAIL_TO_TEST', $_ENV['EMAIL_TO_TEST'] ?? '');