'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer id="contact" className="border-t border-gray-200 dark:border-white/10 py-12 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                            Muhammad Essa
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Crafting digital experiences with code and creativity.
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <a
                            href="https://github.com/muhammadessa-514"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-[var(--primary)] transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://linkedin.com/in/muhammadessa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-[var(--primary)] transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-[var(--primary)] transition-colors"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5 text-center text-sm text-gray-500 dark:text-gray-500">
                    &copy; {new Date().getFullYear()} Muhammad Essa. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
