import { useState } from 'react';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    
    const [focused, setFocused] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onSuccess: () => {
                toast.success('Login Successful');
            },
            onError: () => {
                toast.error('Login failed. Please check your credentials.');
            },
            onFinish: () => reset('password'),
        });
    };

    const handleFocus = (field) => setFocused(field);
    const handleBlur = () => setFocused(null);
    const togglePassword = () => setShowPassword(!showPassword);

    return (
        <GuestLayout>
            <Head title="Log in" />
            
            <div className="mx-auto max-w-md">
                <div className="mb-8 flex justify-center">
                    <div className="rounded-full bg-indigo-100 px-4 py-1 text-sm text-indigo-600">
                        Welcome Back
                    </div>
                </div>
                
                <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">Sign In to UserFlow</h1>
                
                <p className="mb-8 text-center text-gray-600">
                    Access your account to manage users and control authentications
                </p>
                
                {status && (
                    <div className="mb-6 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    <div className="relative">
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className={`peer w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-gray-800 outline-none transition-all placeholder:opacity-0 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${focused === 'email' || data.email ? 'pt-6 pb-2' : ''}`}
                            placeholder="Email"
                            onChange={(e) => setData('email', e.target.value)}
                            onFocus={() => handleFocus('email')}
                            onBlur={handleBlur}
                            required
                        />
                        <label 
                            htmlFor="email" 
                            className={`absolute left-4 text-gray-500 transition-all ${
                                focused === 'email' || data.email
                                    ? 'top-1 text-xs font-medium text-indigo-500' 
                                    : 'top-3 text-sm'
                            }`}
                        >
                            Email
                        </label>
                        {errors.email && <InputError message={errors.email} className="mt-1" />}
                    </div>

                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={data.password}
                            className={`peer w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-gray-800 outline-none transition-all placeholder:opacity-0 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${focused === 'password' || data.password ? 'pt-6 pb-2' : ''}`}
                            placeholder="Password"
                            onChange={(e) => setData('password', e.target.value)}
                            onFocus={() => handleFocus('password')}
                            onBlur={handleBlur}
                            required
                        />
                        <label 
                            htmlFor="password" 
                            className={`absolute left-4 text-gray-500 transition-all ${
                                focused === 'password' || data.password
                                    ? 'top-1 text-xs font-medium text-indigo-500' 
                                    : 'top-3 text-sm'
                            }`}
                        >
                            Password
                        </label>
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="absolute right-3 top-4 text-gray-500 hover:text-indigo-600 focus:outline-none"
                            tabIndex="-1"
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                        {errors.password && <InputError message={errors.password} className="mt-1" />}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    <div className="flex flex-col space-y-5 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
                        >
                            {processing ? 'Signing in...' : 'Sign In'}
                        </button>
                        
                        <div className="relative flex items-center justify-center">
                            <hr className="w-full border-gray-300" />
                            <span className="absolute bg-white px-4 text-sm text-gray-500">or</span>
                        </div>
                        
                        <Link
                            href={route('register')}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-center font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Create New Account
                        </Link>
                        
                        <div className="pt-2 text-center text-xs text-gray-500">
                            By signing in, you agree to our 
                            <a href="#" className="text-indigo-600 hover:text-indigo-500"> Terms of Service</a> and 
                            <a href="#" className="text-indigo-600 hover:text-indigo-500"> Privacy Policy</a>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={5000} />
        </GuestLayout>
    );
}