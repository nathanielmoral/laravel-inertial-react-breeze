import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from '@/Components/Layouts/Sidebar';
import TopNavigation from '@/Components/Layouts/TopNavigation';
import { ThemeProvider } from '@/Components/ThemeContext';

export default function AdminAuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth;
    const { flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (flash && flash.toast) {
            toast.success(flash.toast);
        }
    }, [flash]);


    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex transition-colors">
                {/* Sidebar Component */}
                <Sidebar 
                    isOpen={sidebarOpen} 
                    setIsOpen={setSidebarOpen} 
                />

                {/* Main Content */}
                <div className="flex-1 flex flex-col md:pl-64">
                    {/* Top Navigation Component */}
                    <TopNavigation 
                        user={user}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    {/* Page Header */}
                    {header && (
                        <header className="bg-white dark:bg-gray-800 shadow transition-colors">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                <div className="text-gray-900 dark:text-white transition-colors">
                                    {header}
                                </div>
                            </div>
                        </header>
                    )}

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                            <div className="text-gray-900 dark:text-gray-100 transition-colors">
                                {children}
                            </div>
                        </div>
                    </main>
                    <ToastContainer 
                        position="top-right" 
                        autoClose={3000}
                        theme="colored"
                    />
                </div>
            </div>
        </ThemeProvider>
    );
}