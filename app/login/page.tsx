'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { User, Lock, Mail, X } from 'lucide-react';
import Navbar from "@/components/Navbar";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(isLogin ? 'Login attempt:' : 'Signup attempt:', formData);
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    // Animation Variants: Minimize/Maximize Window Effect
    const windowVariants: Variants = {
        initial: {
            opacity: 0,
            scale: 0.1,
            y: 400, // Starts from bottom
            borderRadius: "100%" // Starts as a small circle/dot
        },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            borderRadius: "12px", // Expands to normal border radius
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 120
            }
        },
        exit: {
            opacity: 0,
            scale: 0.1,
            y: 400, // Minimize back to bottom
            borderRadius: "100%",
            transition: {
                duration: 0.4,
                ease: "backIn"
            }
        }
    };

    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/logo_transparent.png')] bg-no-repeat bg-center opacity-5 blur-3xl scale-150 animate-pulse pointer-events-none"></div>

            {/* Close Button (Global) */}
            <Link href="/" className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/5 group">
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </Link>

            <AnimatePresence mode="wait">
                {isLogin ? (
                    <motion.div
                        key="login"
                        variants={windowVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="relative w-full max-w-4xl min-h-[500px] flex rounded-xl overflow-hidden shadow-2xl bg-[#0f172a]"
                        style={{
                            boxShadow: '0 0 40px var(--primary)',
                            border: '2px solid var(--primary)'
                        }}
                    >
                        {/* Left - Login Form */}
                        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative z-10 bg-[#0f172a]/95 backdrop-blur-sm">
                            <div className="text-center mb-6">
                                <h1 className="text-4xl font-black text-white tracking-widest uppercase" style={{ fontFamily: 'serif' }}>
                                    Log<span className="text-[var(--primary)]">In</span>
                                </h1>
                                <p className="text-gray-400 text-sm mt-2 font-medium">Please login to continue.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <label className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 block group-focus-within:text-[var(--primary)] transition-colors">Username</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all pl-10 placeholder:text-gray-400"
                                                placeholder="Enter your username"
                                            />
                                            <User className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-[var(--primary)] transition-colors" size={18} />
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <label className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 block group-focus-within:text-[var(--primary)] transition-colors">Password</label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all pl-10 placeholder:text-gray-400"
                                                placeholder="Enter your password"
                                            />
                                            <Lock className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-[var(--primary)] transition-colors" size={18} />
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 rounded-xl font-bold text-white shadow-xl transition-all relative overflow-hidden group"
                                    style={{
                                        background: 'var(--primary)',
                                    }}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">LOGIN</span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </motion.button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-400">
                                Don't have an account?
                                <button
                                    onClick={toggleMode}
                                    className="ml-2 font-bold text-[var(--primary)] hover:text-white transition-colors hover:underline cursor-pointer"
                                    title="Click to switch to Sign Up"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>

                        {/* Right - Welcome Message */}
                        <div
                            className="hidden md:flex w-full md:w-1/2 items-center justify-center p-8 text-center text-white relative overflow-hidden"
                            style={{
                                clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
                            }}
                        >
                            {/* Background Image and Overlays */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/90 to-purple-900/90 mix-blend-multiply"></div>
                            <div className="absolute inset-0 bg-black/30"></div>

                            <div className="relative z-10 transform translate-x-4">
                                <h2 className="text-4xl font-black mb-4 uppercase leading-track tracking-tighter drop-shadow-lg">
                                    Welcome <br /> Back!
                                </h2>
                                <p className="text-white/90 text-base font-medium drop-shadow-md leading-relaxed">
                                    Access your project portfolio <br /> and manage your content.
                                </p>
                            </div>
                            {/* Circles */}
                            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                            <div className="absolute bottom-10 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse delay-700"></div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="signup"
                        variants={windowVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="relative w-full max-w-4xl min-h-[500px] flex rounded-xl overflow-hidden shadow-2xl bg-[#0f172a]"
                        style={{
                            boxShadow: '0 0 40px var(--primary)',
                            border: '2px solid var(--primary)'
                        }}
                    >
                        {/* Left - Welcome Message (Mirrored: Join Us) */}
                        <div
                            className="hidden md:flex w-full md:w-1/2 items-center justify-center p-8 text-center text-white relative overflow-hidden"
                            style={{
                                clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)' // Diagonal reversed
                            }}
                        >
                            {/* Background Image and Overlays */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/90 to-purple-900/90 mix-blend-multiply"></div>
                            <div className="absolute inset-0 bg-black/30"></div>

                            <div className="relative z-10 transform -translate-x-4">
                                <h2 className="text-4xl font-black mb-4 uppercase leading-track tracking-tighter drop-shadow-lg">
                                    Join <br /> Us!
                                </h2>
                                <p className="text-white/90 text-base font-medium drop-shadow-md leading-relaxed">
                                    Create your account <br /> to start building today.
                                </p>
                            </div>
                            {/* Circles */}
                            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                            <div className="absolute bottom-10 right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse delay-700"></div>
                        </div>

                        {/* Right - Signup Form */}
                        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative z-10 bg-[#0f172a]/95 backdrop-blur-sm">
                            <div className="text-center mb-6">
                                <h1 className="text-4xl font-black text-white tracking-widest uppercase" style={{ fontFamily: 'serif' }}>
                                    Sign<span className="text-[var(--primary)]">Up</span>
                                </h1>
                                <p className="text-gray-400 text-sm mt-2 font-medium">Create a new account</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-3">
                                <div className="relative group">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all pl-10 placeholder:text-gray-400 sm:text-sm"
                                            placeholder="Full Name"
                                        />
                                        <User className="absolute left-3 top-3 text-gray-500 group-focus-within:text-[var(--primary)] transition-colors" size={16} />
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all pl-10 placeholder:text-gray-400 sm:text-sm"
                                            placeholder="Email Address"
                                        />
                                        <Mail className="absolute left-3 top-3 text-gray-500 group-focus-within:text-[var(--primary)] transition-colors" size={16} />
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all pl-10 placeholder:text-gray-400 sm:text-sm"
                                            placeholder="Password"
                                        />
                                        <Lock className="absolute left-3 top-3 text-gray-500 group-focus-within:text-[var(--primary)] transition-colors" size={16} />
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all pl-10 placeholder:text-gray-400 sm:text-sm"
                                            placeholder="Confirm Password"
                                        />
                                        <Lock className="absolute left-3 top-3 text-gray-500 group-focus-within:text-[var(--primary)] transition-colors" size={16} />
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full mt-4 py-3 rounded-xl font-bold text-white shadow-xl transition-all relative overflow-hidden group"
                                    style={{
                                        background: 'var(--primary)',
                                    }}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">REGISTER</span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </motion.button>
                            </form>

                            <div className="mt-4 text-center text-sm text-gray-400">
                                Already have an account?
                                <button
                                    onClick={toggleMode}
                                    className="ml-2 font-bold text-[var(--primary)] hover:text-white transition-colors hover:underline cursor-pointer"
                                    title="Click to switch to Login"
                                >
                                    Log In
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
