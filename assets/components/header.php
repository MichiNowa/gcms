<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta author="MichiNowa, ArvinJay, LhilKim">
    <!-- Logo Icon -->
    <link rel="icon" href="<?= pathname('images/logo.jpg') ?>">
    <!-- fonts -->
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <!-- Tailwind CSS (Prefix: tw-) -->
    <link rel="stylesheet" href="<?= pathname('css/tailwind.css') ?>">
    <!-- Bootstrap CSS -->
    <link href="<?= pathname('vendor/bootstrap/css/bootstrap.min.css') ?>" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="<?= pathname('vendor/bootstrap/icons/bootstrap-icons.css') ?>" rel="stylesheet">
    <!-- Sweetalert2 CSS -->
    <link href="<?= pathname('vendor/sweetalert2/sweetalert2.min.css')?>" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="<?= pathname('css/custom.css') ?>" rel="stylesheet">

    <!-- Page Title -->
    <title><?= $page_title ?></title>
    <!-- Sweetalert2 JS -->
    <script src="<?= pathname('vendor/sweetalert2/sweetalert2.min.js') ?>"></script>
</head>

<body>
<?php
if (!isset($_SESSION['backed'])) {
?>
<div id="loading-spinner">
    <img src="<?= pathname("images/guidance-logo-loader.png"); ?>" alt="logo" class="tw-w-[150px] tw-h-[150px] tw-object-contain tw-animate-pulse tw-bg-transparent tw-p-4" />
</div>
<div id="content-body">
<?php } ?>
