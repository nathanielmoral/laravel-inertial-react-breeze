<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::orderBy('created_at', 'desc')
            ->take(5)
            ->get();
            
        return response()->json(['notifications' => $notifications]);
    }

    public function markAsRead(Request $request)
    {
        if ($request->has('id')) {
            Notification::where('id', $request->id)->update(['read' => true]);
        } else {
            Notification::where('read', false)->update(['read' => true]);
        }
        
        return response()->json(['success' => true]);
    }
}