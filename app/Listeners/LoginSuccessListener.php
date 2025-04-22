<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Session;

class LoginSuccessListener
{
    public function handle(Login $event): void
    {
        Session::flash('toast', 'Login successful!');
    }
}
