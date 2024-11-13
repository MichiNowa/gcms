<?php

if (!isAuthenticated())
{
  redirect("/login");
}