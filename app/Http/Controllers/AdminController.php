<?php
namespace App\Http\Controllers;
use App\Models\User;
use App\Models\ActivityLog;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
class AdminController extends Controller
{
    public function dashboard()
    {
        $users = User::select('id', 'name', 'email', 'last_login_at', 'created_at')->get();
        $stats = $this->getSystemStats();
        $recentUsers = $this->getRecentUsers();
        $activityLog = $this->getActivityLog();
    
        return Inertia::render('Admin/Dashboard', [
            'auth' => auth()->user(),
            'users' => $users,
            'stats' => $stats,
            'recentUsers' => $recentUsers,
            'activityLog' => $activityLog
        ]);
    }
    
    public function users()
    {
        $users = User::select([
            'id', 
            'name', 
            'email', 
            'last_login_at', 
            'role', 
            'created_at', 
            'updated_at',
        ])
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function($user) {

            $user->status = $user->updated_at >= Carbon::now()->subDays(7) ? 'Active' : 'Inactive';
            return $user;
        });
        
        return Inertia::render('Admin/Users', ['users' => $users]);
    }
    
    public function analytics()
    {
        $users = User::select('id', 'name', 'email', 'last_login_at', 'created_at')->get();
    
        return Inertia::render('Analytics', [
            'users' => $users
        ]);
    }
    
    public function toggleAdminRole(User $user)
    {
        $user->is_admin = !$user->is_admin;
        $user->save();

        return redirect()->back()->with('success', 'User role updated successfully.');
    }
    
    private function getSystemStats()
    {
        $totalUsers = User::count();
        $activeUsers = User::whereNotNull('last_login_at')
            ->where('last_login_at', '>=', Carbon::now()->subDays(7))
            ->count();
            
        $lastMonthUsers = User::where('created_at', '>=', Carbon::now()->subDays(30))
            ->where('created_at', '<', Carbon::now())
            ->count();
            
        $prevMonthUsers = User::where('created_at', '>=', Carbon::now()->subDays(60))
            ->where('created_at', '<', Carbon::now()->subDays(30))
            ->count();
        
        return [
            'totalUsers' => $totalUsers,
            'activeUsers' => $activeUsers,
            'lastMonthUsers' => $lastMonthUsers,
            'prevMonthUsers' => $prevMonthUsers,
            'growthRate' => $prevMonthUsers > 0 ? round(($lastMonthUsers - $prevMonthUsers) / $prevMonthUsers * 100, 1) : 0
        ];
    }
    
    private function getActivityLog() 
    {
        return ActivityLog::with('user') 
            ->orderBy('created_at', 'desc') 
            ->limit(4) 
            ->get(); 
    }
    
    private function getRecentUsers() 
    {
        return User::select('id', 'name', 'email', 'last_login_at', 'created_at')
            ->whereNotNull('last_login_at') 
            ->orderBy('last_login_at', 'desc') 
            ->limit(4) 
            ->get();
    }
    
}