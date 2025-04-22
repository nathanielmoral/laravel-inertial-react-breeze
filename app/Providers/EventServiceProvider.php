<?php

namespace App\Providers;

use Illuminate\Auth\Events\Login;
use App\Listeners\LoginSuccessListener;
use App\Listeners\UpdateLastLoginAt;
use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        Login::class => [
            LoginSuccessListener::class,
            UpdateLastLoginAt::class,
        ],
    ];

    public function boot()
    {
        parent::boot();
    }
}
