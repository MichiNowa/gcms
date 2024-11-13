<?php
if ($user->role !== 'student') {
  redirect($user->role === 'superadmin'
    ? "/schoolyear"
    : "/dashboard");
}
?>
<div id="page-root"></div>