<?php

// for sidebar
ob_start();
require_once import("/assets/components/sidebar.php");
$sidebar = ob_get_clean();

// for content
require_once import("/assets/components/header_with_navbar.php");
?>
<div class="tw-min-h-[calc(100vh-170px)]">
<?= $content; ?>
</div>
<?php require_once import("/assets/components/footer.php");