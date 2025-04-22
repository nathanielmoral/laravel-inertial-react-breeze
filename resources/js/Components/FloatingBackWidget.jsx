import { Link } from '@inertiajs/react';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function FloatingBackWidget() {
    return (
        <div className="fixed top-4 left-4 z-50 md:top-6 md:left-6">
            <Link
                href="/"
                className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-md transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 md:px-4 md:py-2.5 md:text-base"
                aria-label="Return to home page"
            >
                <HomeIcon className="h-4 w-4 text-indigo-600 md:h-5 md:w-5" />
                <span className="hidden sm:inline">Home</span>
            </Link>
        </div>
    );
}