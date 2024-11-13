<?php
if ($user->role !== 'student') {
  redirect($user->role === 'superadmin'
    ? "/schoolyear"
    : "/dashboard");
}
?>

<style>
  * {
    font-size: 16px;
  }

  .select-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .select-wrapper select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: none;
    padding-right: 30px;
    width: 100%;
  }

  .select-wrapper::after {
    content: '\25BC';
    position: absolute;
    top: 50%;
    right: 10px;
    pointer-events: none;
    transform: translateY(-50%);
    font-size: 16px;
    color: #555;
  }
</style>

<div id="page-root"></div>