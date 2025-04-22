import { useState } from 'react';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });
    
    const [focused, setFocused] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    const handleFocus = (field) => setFocused(field);
    const handleBlur = () => setFocused(null);

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            
            <div className="mx-auto max-w-md">
                <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Reset Password</h1>
                
                <div className="mb-6 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                    Forgot your password? No problem. Enter your email address and we'll send you a password reset link.
                </div>
                
                {status && (
                    <div className="mb-6 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div className="relative">
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className={`peer w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-gray-800 outline-none transition-all placeholder:opacity-0 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${focused === 'email' || data.email ? 'pt-6 pb-2' : ''}`}
                            placeholder="Email"
                            autoComplete="username"
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

                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
                        >
                            {processing ? 'Sending link...' : 'Send Reset Link'}
                        </button>
                        
                        <div className="text-center text-sm">
                            <Link
                                href={route('login')}
                                className="font-medium text-indigo-600 transition-colors hover:text-indigo-500"
                            >
                                Back to login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}