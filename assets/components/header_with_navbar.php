<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta author="MichiNowa, ArvinJay, LhilKim">
    <!-- Logo Icon -->
    <link rel="icon" href="<?= pathname('images/logo.jpg') ?>">
    <!-- Tailwind CSS (Prefix: tw-) -->
    <link rel="stylesheet" href="<?= pathname('css/tailwind.css') ?>">
    <!-- Bootstrap CSS -->
    <link href="<?= pathname('vendor/bootstrap/css/bootstrap.min.css') ?>" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="<?= pathname('vendor/bootstrap/icons/bootstrap-icons.css') ?>" rel="stylesheet">
    <!-- Sweetalert2 CSS -->
    <link href="<?= pathname('vendor/sweetalert2/sweetalert2.min.css') ?>" rel="stylesheet">

    <!--========== CDN ==========-->
    <link rel="stylesheet" href="<?= pathname('vendor/boxicons/boxicons.min.css') ?>">

    <!--========== NAVBAR CSS ==========-->
    <link rel="stylesheet" href="<?= pathname('css/nav.css') ?>">
    <link rel="stylesheet" href="<?= pathname('css/nav.scss') ?>">

    <!-- Custom CSS -->
    <link href="<?= pathname('css/custom.css') ?>" rel="stylesheet">

    <!-- Page Title -->
    <title><?= $page_title ?></title>

    <style>
        .nav__link {
            cursor: pointer;
        }
    </style>
    <script type="importmap">
        {
            "imports": {
                "react": "https://esm.sh/react@18.3.1",
                "react-qr-scanner": "https://esm.sh/@yudiel/react-qr-scanner@2.0.8",
                "clsx": "https://esm.sh/clsx@2.1.1",
                "react-dom": "https://esm.sh/react-dom@18.3.1/client",
                "react-dom/server": "https://esm.sh/react-dom@18.3.1/server",
                "sweetalert2": "https://esm.sh/sweetalert2@11.12.4",
                "react-pdf": "https://esm.sh/react-pdf@9.1.0"
            }
        }
    </script>
    <!-- Sweetalert2 JS -->
    <script src="<?= pathname('vendor/sweetalert2/sweetalert2.min.js') ?>"></script>

</head>

<body>
    <?php
    if (!isset($_SESSION['backed'])) {
        ?>
        <div id="loading-spinner">
            <img src="<?= pathname("images/guidance-logo-loader.png"); ?>" alt="logo"
                class="tw-w-[150px] tw-h-[150px] tw-object-contain tw-animate-pulse tw-bg-transparent tw-p-4" />
        </div>
        <div id="content-body">
        <?php } ?>

        <!--========== HEADER ==========-->
        <header class="header">
            <div class="header__container">
                <?php if ($user) { ?>
                    <img src="<?= pathname(!$user->profile_pic ? "images/default-user.png" : $user->profile_pic) ?>" alt=""
                        class="header__img">
                <?php } else { ?>
                    <a href="<?= pathname('login') ?>" class="header__link">Login</a>
                <?php } ?>
                <span href="#" class="header__logo">SMCC Guidance Center</span>

                <!-- <div class="header__search">
            <input type="search" placeholder="Search" class="header__input">
            <i class='bx bx-search header__icon'></i>
        </div> -->

                <div class="header__toggle">
                    <i class='bx bx-menu' id="header-toggle"></i>
                </div>
            </div>
        </header>

        <?= $sidebar ?>