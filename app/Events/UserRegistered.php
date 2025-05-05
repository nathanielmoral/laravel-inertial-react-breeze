<?php

namespace App\Events;

use App\Models\User;
use App\Models\Notification;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserRegistered implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $notification;

    public function __construct(User $user, Notification $notification)
    {
        $this->user = $user;
        $this->notification = $notification;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('admin-notifications'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'user-registered';
    }

    public function broadcastWith(): array
    {
        return [
            'notification' => [
                'id' => $this->notification->id,
                'text' => $this->notification->text,
                'read' => $this->notification->read,
                'type' => $this->notification->type,
                'user_id' => $this->notification->user_id,
                'created_at' => $this->notification->created_at->toDateTimeString(),
            ],
        ];
    }
}
