<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = Notification::orderBy('created_at', 'desc')
            ->take(5)
            ->get();
    
        return response()->json(['notifications' => $notifications]);
    }

    public function markAsRead(Request $request)
    {
        if ($request->has('id')) {
            $notification = Notification::find($request->id);
    
            if ($notification && $notification->user_id === auth()->id()) {
                $notification->update(['read' => true]);
            }
        } else {
            // Mark all notifications for current user
            Notification::where('user_id', auth()->id())
                ->where('read', false)
                ->update(['read' => true]);
        }
    
        return response()->json(['success' => true]);
    }
    
}