<?php
if ($user->role !== 'admin') {
  redirect($user->role === 'superadmin'
    ? "/schoolyear"
    : "/home");
}
?>
<div id="page-root"></div>