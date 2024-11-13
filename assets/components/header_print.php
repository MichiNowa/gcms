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
    <!--========== CDN ==========-->
    <link rel="stylesheet" href="<?= pathname('vendor/boxicons/boxicons.min.css') ?>">
    <!-- Custom CSS -->
    <link href="<?= pathname('css/custom.css') ?>" rel="stylesheet">

    <!-- Page Title -->
    <title><?= $page_title ?></title>
    <?php if (AUTHUSER?->getRole() === 'student'): ?>
        <style>
            @media print {
                body * {
                    display: none;
                }
                .no-print {
                    display: block;
                }
            }
        </style>
    <?php endif ?>
</head>

<body class="tw-bg-gray-300 print:tw-bg-transparent">
<?php if (AUTHUSER?->getRole() !== 'student'): ?>
    <div class="tw-fixed print:tw-hidden tw-w-fit tw-h-fit tw-right-4 lg:tw-right-8 xl:tw-right-32 tw-top-4">
        <button type="button" id="print-btn" class="tw-px-4 tw-py-2 tw-rounded tw-bg-sky-400 tw-shadow-lg tw-text-black"><i class="bx bx-printer"></i>Print</button>
    </div>
<?php else: ?>
    <div class="no-print tw-text-center">
        <h1>Print is disabled</h1>
    </div>
<?php endif ?>

