<?php

if (isAuthenticated())
{
  redirect("/home");
}