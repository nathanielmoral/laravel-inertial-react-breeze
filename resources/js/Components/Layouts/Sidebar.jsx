import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

     
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700 transition-colors">
          <Link href="/">
            <ApplicationLogo className="h-9 w-auto fill-current text-gray-800 dark:text-gray-200 transition-colors" />
          </Link>
        </div>
        
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            <NavLink href={route('admin.dashboard')} icon={HomeIcon}>
              Overview
            </NavLink>
            
            <NavLink href={route('admin.users')} icon={UsersIcon}>
              Users
            </NavLink>  
          </div>
        </nav>
      </div>
    </>
  );
}

function NavLink({ href, icon: Icon, children }) {
  const isActive = route().current(href.split('.').pop());
  
  return (
    <Link
      href={href}
      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
        isActive 
          ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      <Icon className={`mr-3 h-6 w-6 ${isActive ? 'text-gray-500 dark:text-gray-300' : 'text-gray-400 dark:text-gray-400'} transition-colors`} />
      {children}
    </Link>
  );
}

function HomeIcon(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      {...props}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
      />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      {...props}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
      />
    </svg>
  );
}