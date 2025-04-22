<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\ActivityLog;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_admin', // ← important kung gagamitin natin sa mass assignment
        'last_login_at',
    ];

    /**
     * The attributes that should be hidden for arrays.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean', // ← para automatically casted as true/false
        'last_login_at' => 'datetime',
    ];

    /**
     * Check if user is admin (optional helper)
     */
    public function isAdmin()
    {
        return $this->is_admin;
    }

    public function activities()
    {
        return $this->hasMany(ActivityLog::class);
    }
}
