import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head title="UserFlow - Enterprise User Management Solution" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-black">
                <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 md:h-20 items-center">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 flex items-center">
                                    <svg className="h-9 w-auto text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                                        <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
                                    </svg>
                                    <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">UserFlow</span>
                                </div>
                            </div>
                            

                            <div className="hidden md:flex items-center space-x-8">
                                <a href="#features" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white transition">
                                    Features
                                </a>
                                <a href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white transition">
                                    How It Works
                                </a>
                                <a href="#testimonials" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white transition">
                                    Testimonials
                                </a>
                                <a href="#pricing" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white transition">
                                    Pricing
                                </a>
                                
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="md:hidden flex items-center">
                                <button 
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="p-2 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none"
                                >
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {isMenuOpen ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    

                    {isMenuOpen && (
                        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-t dark:border-gray-800">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white">
                                    Features
                                </a>
                                <a href="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white">
                                    How It Works
                                </a>
                                <a href="#testimonials" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white">
                                    Testimonials
                                </a>
                                <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white">
                                    Pricing
                                </a>
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="block w-full px-4 py-3 rounded-md text-center text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <div className="flex flex-col space-y-3">
                                            <Link
                                                href={route('login')}
                                                className="block w-full px-4 py-2 rounded-md text-center text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="block w-full px-4 py-3 rounded-md text-center text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                                            >
                                                Get Started
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </nav>

           
                <div className="relative pt-24 pb-20 md:pt-32 md:pb-24">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute left-3/4 top-1/4 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-[500px] h-[500px] bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl dark:from-indigo-900/30 dark:to-purple-900/30"></div>
                        </div>
                        <div className="absolute right-1/4 bottom-1/3 transform translate-x-1/2 translate-y-1/2">
                            <div className="w-[400px] h-[400px] bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl dark:from-blue-900/20 dark:to-cyan-900/20"></div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                                <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40">
                                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">New Feature</span>
                                    <span className="ml-2 text-xs font-medium text-gray-600 dark:text-gray-400">OAuth 2.0 Provider Integration</span>
                                </div>
                                <h1>
                                    <span className="block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                                        <span className="block text-gray-900 dark:text-white">Enterprise-Grade</span>
                                        <span className="block mt-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">User Management</span>
                                    </span>
                                </h1>
                                <p className="mt-6 text-base text-gray-500 sm:text-lg md:text-xl lg:text-lg xl:text-xl dark:text-gray-300">
                                    Streamline authentication, control access, and manage user data with our powerful, secure, and scalable user management platform.
                                </p>
                                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                        <Link
                                            href={route('register')}
                                            className="px-8 py-3 text-center rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-base font-medium shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
                                        >
                                            Get Started Free
                                        </Link>
                                        <a
                                            href="#how-it-works"
                                            className="px-8 py-3 text-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition transform hover:-translate-y-0.5"
                                        >
                                            See How It Works
                                        </a>
                                    </div>
                                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                        No credit card required • Free 14-day trial • Cancel anytime
                                    </p>
                                </div>
                            </div>
                            <div className="mt-12 relative lg:mt-0 lg:col-span-6">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform md:rotate-1 transition hover:rotate-0 duration-300">
                                    <div className="p-1 bg-gradient-to-r from-indigo-600 to-purple-600">
                                        <div className="flex space-x-1">
                                            <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                                            <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                                            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                                        </div>
                                    </div>
                                    <img
                                        className="w-full border-t border-gray-100 dark:border-gray-700"
                                        src="https://www.apexure.com/uploads/user-centric-landing-pages.webp"
                                        alt="UserFlow Dashboard"
                                    />
                                </div>
                                <div className="absolute -right-4 -bottom-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl h-36 w-36 flex items-center justify-center transform rotate-6 transition hover:rotate-0 duration-300  md:flex">
                                    <div className="text-white text-center">
                                        <div className="text-3xl font-bold">99.9%</div>
                                        <div className="text-xs">Uptime</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                  
                        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 lg:mt-20">
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">10M+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">5,000+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Companies</div>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">99.9%</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">24/7</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
                            </div>
                        </div>
                    </div>
                </div>

             
                <div className="bg-gray-50 dark:bg-gray-900/50 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Trusted by leading companies worldwide
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-8 md:gap-16">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center">
                                    <svg className="h-8 text-gray-400 dark:text-gray-600" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="100" height="30" rx="8" fill="currentColor" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

        
                <div id="features" className="py-20 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase dark:text-indigo-400">Features</h2>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                                Everything you need in one platform
                            </p>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto dark:text-gray-400">
                                UserFlow combines powerful features with intuitive design to make user management simple and secure.
                            </p>
                        </div>

                        <div className="mt-20 lg:mt-24">
                            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                               
                                {[
                                    {
                                        icon: (
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        ),
                                        title: "Multi-Factor Authentication",
                                        description: "Secure accounts with passwordless, SMS, email, and app-based authentication methods."
                                    },
                                    {
                                        icon: (
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        ),
                                        title: "Advanced Role Management",
                                        description: "Create custom roles with fine-grained permissions that perfectly match your organizational structure."
                                    },
                                    {
                                        icon: (
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        ),
                                        title: "OAuth 2.0 Integration",
                                        description: "Allow users to sign in with Google, Apple, Facebook, GitHub, and other OAuth providers."
                                    },
                                    {
                                        icon: (
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                            </svg>
                                        ),
                                        title: "User Profiles & Preferences",
                                        description: "Customizable profiles with personal details, preferences, and activity tracking."
                                    },
                                    {
                                        icon: (
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        ),
                                        title: "Security Monitoring",
                                        description: "Track login attempts, security events, and user behavior with detailed activity logs."
                                    },
                                    {
                                        icon: (
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                            </svg>
                                        ),
                                        title: "API Integration",
                                        description: "RESTful API and webhooks for seamless integration with your existing systems and workflows."
                                    },
                                ].map((feature, index) => (
                                    <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                            {feature.icon}
                                        </div>
                                        <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                                        <p className="mt-2 text-gray-500 dark:text-gray-400">{feature.description}</p>
                                        <a href="#" className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                                            Learn more
                                            <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase dark:text-indigo-400">How It Works</h2>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                                Simple implementation, powerful results
                            </p>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto dark:text-gray-400">
                                Get up and running in minutes with our developer-friendly implementation process.
                            </p>
                        </div>

                        <div className="mt-16">
                            <div className="relative">
                                <div className="absolute h-full w-1 bg-indigo-200 dark:bg-indigo-900 left-6 md:left-1/2 transform -translate-x-1/2"></div>
                                          
                                {[
                                    {
                                        number: 1,
                                        title: "Easy Integration",
                                        description: "Install our SDK with a single command or use our CDN-hosted script to get started in seconds.",
                                        image: "https://www.apexure.com/uploads/user-centric-landing-pages.webp"
                                    },
                                    {
                                        number: 2,
                                        title: "Configure Your User Flow",
                                        description: "Set up authentication methods, customize the user interface, and define roles and permissions.",
                                        image: "https://www.apexure.com/uploads/user-centric-landing-pages.webp"
                                    },
                                    {
                                        number: 3,
                                        title: "Go Live with Confidence",
                                        description: "Launch your application with enterprise-grade security, monitoring, and scalability built-in.",
                                        image: "https://www.apexure.com/uploads/user-centric-landing-pages.webp"
                                    }
                                ].map((step, index) => (
                                    <div key={index} className={`relative mb-16 last:mb-0 md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                        <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 -translate-y-4 h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold z-10 shadow-lg">
                                            {step.number}
                                        </div>
                                        
                                        <div className="pl-16 md:pl-0 md:w-1/2 md:pr-8 lg:pr-16">
                                        <div className={`p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                                                <p className="mt-2 text-gray-600 dark:text-gray-300">{step.description}</p>
                                                <a href="#" className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                                                    Learn more
                                                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div className="hidden md:block md:w-1/2 mt-8 md:mt-0">
                                            <div className={`rounded-2xl overflow-hidden shadow-lg ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                                                <img src={step.image} alt={step.title} className="w-full h-auto" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div id="testimonials" className="py-20 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase dark:text-indigo-400">Testimonials</h2>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                                Trusted by developers worldwide
                            </p>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto dark:text-gray-400">
                                See what our customers are saying about UserFlow
                            </p>
                        </div>

                        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    quote: "UserFlow made implementing secure authentication a breeze. Our team saved weeks of development time and our users love the seamless experience.",
                                    name: "Sarah Johnson",
                                    title: "CTO, TechStart Inc."
                                },
                                {
                                    quote: "The ability to customize user roles and permissions has been a game-changer for our enterprise clients. UserFlow scales beautifully with our growing business.",
                                    name: "Michael Chen",
                                    title: "Lead Developer, Enterprise Solutions"
                                },
                                {
                                    quote: "With UserFlow, we reduced our auth-related support tickets by 80%. The self-service recovery flows and intuitive interface have made a huge difference.",
                                    name: "Alex Rivera",
                                    title: "Product Manager, SaaS Platform"
                                },
                                {
                                    quote: "The OAuth provider integrations work flawlessly. Our users can sign in with their preferred accounts, and we don't have to worry about password security.",
                                    name: "Emma Wilson",
                                    title: "Security Engineer, FinTech Solutions"
                                },
                                {
                                    quote: "As a solo developer, I needed something powerful but easy to implement. UserFlow's documentation and support have been excellent.",
                                    name: "David Park",
                                    title: "Independent Developer"
                                },
                                {
                                    quote: "We've been able to customize every aspect of our auth flow while maintaining enterprise-grade security. The best of both worlds.",
                                    name: "Olivia Martinez",
                                    title: "VP of Engineering, DataCorp"
                                }
                            ].map((testimonial, index) => (
                                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-md border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40">
                                        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                                        </svg>
                                    </div>
                                    <p className="mt-6 text-gray-600 dark:text-gray-300">{testimonial.quote}</p>
                                    <div className="mt-6 flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                                        <div className="ml-3">
                                            <div className="font-medium text-gray-900 dark:text-white">{testimonial.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase dark:text-indigo-400">Pricing</h2>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                                Simple, transparent pricing
                            </p>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto dark:text-gray-400">
                                Choose the plan that's right for your business
                            </p>
                        </div>

                        <div className="mt-16 grid gap-8 lg:grid-cols-3">
                            {[
                                {
                                    name: "Starter",
                                    price: "$29",
                                    description: "Perfect for small websites and applications",
                                    features: [
                                        "Up to 1,000 monthly active users",
                                        "Email & password authentication",
                                        "Basic role management",
                                        "Standard support",
                                        "Community forum access"
                                    ],
                                    cta: "Start Free Trial",
                                    popular: false
                                },
                                {
                                    name: "Professional",
                                    price: "$89",
                                    description: "For growing businesses and applications",
                                    features: [
                                        "Up to 10,000 monthly active users",
                                        "All Starter features",
                                        "OAuth provider integration",
                                        "Two-factor authentication",
                                        "Advanced role management",
                                        "Priority email support"
                                    ],
                                    cta: "Start Free Trial",
                                    popular: true
                                },
                                {
                                    name: "Enterprise",
                                    price: "Custom",
                                    description: "For large organizations with custom needs",
                                    features: [
                                        "Unlimited monthly active users",
                                        "All Professional features",
                                        "SAML / SSO integration",
                                        "Custom security policies",
                                        "Dedicated account manager",
                                        "SLA guarantees",
                                        "24/7 phone & email support"
                                    ],
                                    cta: "Contact Sales",
                                    popular: false
                                }
                            ].map((plan, index) => (
                                <div key={index} className={`relative rounded-2xl overflow-hidden ${plan.popular ? 'shadow-xl ring-2 ring-indigo-600 dark:ring-indigo-400 scale-105 lg:-mt-4' : 'shadow-lg border border-gray-100 dark:border-gray-700'}`}>
                                    {plan.popular && (
                                        <div className="absolute top-0 right-0 h-24 w-24">
                                            <div className="absolute transform rotate-45 bg-indigo-600 text-white text-xs font-semibold py-1 right-[-40px] top-[32px] w-[170px] text-center">
                                                Most Popular
                                            </div>
                                        </div>
                                    )}
                                    <div className="bg-white dark:bg-gray-800 p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                                        <div className="mt-4 flex items-baseline">
                                            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                                            {plan.price !== "Custom" && <span className="ml-1 text-xl text-gray-500 dark:text-gray-400">/month</span>}
                                        </div>
                                        <p className="mt-2 text-gray-500 dark:text-gray-400">{plan.description}</p>
                                        <ul className="mt-6 space-y-4">
                                            {plan.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-start">
                                                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="ml-2 text-gray-600 dark:text-gray-300">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-8">
                                            <button 
                                                className={`w-full py-3 px-4 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                                    plan.popular 
                                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md' 
                                                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50'
                                                }`}
                                            >
                                                {plan.cta}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="py-20 bg-white dark:bg-gray-900">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase dark:text-indigo-400">FAQ</h2>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
                                Frequently asked questions
                            </p>
                            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                                Find answers to common questions about UserFlow
                            </p>
                        </div>

                        <div className="mt-12 space-y-6">
                            {[
                                {
                                    question: "How long does implementation typically take?",
                                    answer: "For most applications, basic implementation takes less than 30 minutes. More complex configurations with custom roles and integrations can be completed within a day. Our detailed documentation and implementation guides make the process straightforward."
                                },
                                {
                                    question: "Do you support custom authentication flows?",
                                    answer: "Yes, UserFlow is highly customizable. You can create custom authentication flows, add additional verification steps, and design the UI to match your application's look and feel. Our API allows for complete control over the user experience."
                                },
                                {
                                    question: "Is UserFlow compliant with privacy regulations?",
                                    answer: "Yes, UserFlow is designed to help you meet GDPR, CCPA, and other privacy regulations. We provide tools for user data management, consent tracking, and data export/deletion to support your compliance efforts."
                                },
                                {
                                    question: "Can I migrate from my existing authentication system?",
                                    answer: "Absolutely. We provide migration tools and guidance to help you seamlessly transition from your current authentication system to UserFlow. Our team can assist with data migration and ensuring continuity for your users."
                                },
                                {
                                    question: "What kind of support do you offer?",
                                    answer: "All plans include access to our documentation and community forums. Professional and Enterprise plans include email support with guaranteed response times. Enterprise customers receive dedicated account management and 24/7 phone support."
                                }
                            ].map((faq, index) => (
                                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:flex lg:items-center lg:justify-between">
                            <div>
                                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                    Ready to streamline your user management?
                                </h2>
                                <p className="mt-3 max-w-lg text-lg text-indigo-100">
                                    Start your free 14-day trial today. No credit card required.
                                </p>
                            </div>
                            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                                <div className="inline-flex rounded-md shadow">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-indigo-600 bg-white hover:bg-gray-50 dark:text-white dark:bg-indigo-900 dark:hover:bg-indigo-800"
                                    >
                                        Get started free
                                    </Link>
                                </div>
                                <div className="ml-3 inline-flex rounded-md shadow">
                                    <a
                                        href="#features"
                                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-800 bg-opacity-60 hover:bg-opacity-70"
                                    >
                                        Learn more
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <footer className="bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
                            <div className="xl:col-span-1">
                                <div className="flex items-center">
                                    <svg className="h-9 w-auto text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                                        <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
                                    </svg>
                                    <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">UserFlow</span>
                                </div>
                                <p className="mt-4 text-gray-400 text-sm">
                                    Enterprise-grade user management for modern applications.
                                </p>
                                <div className="mt-6 flex space-x-6">
                                    {['twitter', 'facebook', 'instagram', 'github', 'linkedin'].map((social) => (
                                        <a key={social} href="#" className="text-gray-400 hover:text-white">
                                            <span className="sr-only">{social}</span>
                                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                <rect width="24" height="24" rx="12" />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
                                <div className="md:grid md:grid-cols-2 md:gap-8">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                                            Product
                                        </h3>
                                        <ul className="mt-4 space-y-4">
                                            {['Features', 'Pricing', 'Security', 'Roadmap'].map((item) => (
                                                <li key={item}>
                                                    <a href="#" className="text-base text-gray-400 hover:text-white">
                                                        {item}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-12 md:mt-0">
                                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                                            Support
                                        </h3>
                                        <ul className="mt-4 space-y-4">
                                            {['Documentation', 'API Reference', 'Community', 'Contact'].map((item) => (
                                                <li key={item}>
                                                    <a href="#" className="text-base text-gray-400 hover:text-white">
                                                        {item}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="md:grid md:grid-cols-2 md:gap-8">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                                            Company
                                        </h3>
                                        <ul className="mt-4 space-y-4">
                                            {['About', 'Blog', 'Careers', 'Press'].map((item) => (
                                                <li key={item}>
                                                    <a href="#" className="text-base text-gray-400 hover:text-white">
                                                        {item}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-12 md:mt-0">
                                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                                            Legal
                                        </h3>
                                        <ul className="mt-4 space-y-4">
                                            {['Privacy', 'Terms', 'Cookie Policy', 'GDPR'].map((item) => (
                                                <li key={item}>
                                                    <a href="#" className="text-base text-gray-400 hover:text-white">
                                                        {item}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 border-t border-gray-800 pt-8">
                            <p className="text-base text-gray-400 xl:text-center">
                                &copy; {new Date().getFullYear()} UserFlow, Inc. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}