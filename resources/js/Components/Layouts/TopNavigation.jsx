import { Link } from '@inertiajs/react';
import ProfileDropdown from './ProfileDropdown';
import NotificationsDropdown from './NotificationsDropdown';
import ThemeToggle from './ThemeToggle';
import { Menu, Search, Bell } from 'lucide-react';

export default function TopNavigation({ user, sidebarOpen, setSidebarOpen, notifications = [] }) {
  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800  transition-all">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          
          
          
          <div className="flex items-center space-x-4">
            
            <div className="relative">
              <ThemeToggle />
            </div>
            
          
            <div className="relative">
              <NotificationsDropdown notifications={notifications}>
                <button className="p-2 rounded-full bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900"></span>
                  )}
                </button>
              </NotificationsDropdown>
            </div>
            
           
            <div className="hidden md:block h-6 w-px bg-gray-200 dark:bg-slate-700"></div>
            
            
            <div className="relative">
              <ProfileDropdown user={user} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}