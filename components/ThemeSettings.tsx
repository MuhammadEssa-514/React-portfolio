'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Moon, Sun, Check, Palette, Type, X } from 'lucide-react';

const COLORS = [
    { name: 'Orange', primary: '#f97316', accent: '#ea580c' },
    { name: 'Blue', primary: '#3b82f6', accent: '#2563eb' },
    { name: 'Green', primary: '#22c55e', accent: '#16a34a' },
    { name: 'Purple', primary: '#a855f7', accent: '#9333ea' },
    { name: 'Red', primary: '#ef4444', accent: '#dc2626' },
];

const FONTS = [
    { name: 'Sans', label: 'Modern', value: 'var(--font-geist-sans)' },
    { name: 'Serif', label: 'Elegant', value: 'var(--font-playfair)' },
    { name: 'Mono', label: 'Tech', value: 'var(--font-fira)' },
    { name: 'Rounded', label: 'Friendly', value: 'var(--font-nunito)' },
    { name: 'Slab', label: 'Bold', value: 'var(--font-roboto-slab)' },
];

export default function ThemeSettings() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [primaryColor, setPrimaryColor] = useState('#f97316');
    const [currentFont, setCurrentFont] = useState('var(--font-geist-sans)');
    const menuRef = useRef<HTMLDivElement>(null);

    // Initialize Theme & Color & Font
    useEffect(() => {
        // Theme Logic
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }

        // Color Logic
        const savedPrimary = localStorage.getItem('primaryColor') || '#f97316';
        const savedAccent = localStorage.getItem('accentColor') || '#ea580c';
        setPrimaryColor(savedPrimary);
        document.documentElement.style.setProperty('--primary', savedPrimary);
        document.documentElement.style.setProperty('--accent', savedAccent);

        // Font Logic
        const savedFont = localStorage.getItem('fontStyle') || 'var(--font-geist-sans)';
        setCurrentFont(savedFont);
        document.documentElement.style.setProperty('--font-current', savedFont);

        // Click Outside Logic
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Toggle Dark Mode
    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    // Change Primary Color
    const changeColor = (color: typeof COLORS[0]) => {
        setPrimaryColor(color.primary);
        document.documentElement.style.setProperty('--primary', color.primary);
        document.documentElement.style.setProperty('--accent', color.accent);
        localStorage.setItem('primaryColor', color.primary);
        localStorage.setItem('accentColor', color.accent);
    };

    // Change Font
    const changeFont = (font: typeof FONTS[0]) => {
        setCurrentFont(font.value);
        document.documentElement.style.setProperty('--font-current', font.value);
        localStorage.setItem('fontStyle', font.value);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-300"
                aria-label="Theme Settings"
            >
                <Settings className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-72 bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl p-4 z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-white/5">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Appearance</h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleTheme}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                                >
                                    {isDark ? <Moon className="w-3 h-3 text-[var(--primary)]" /> : <Sun className="w-3 h-3 text-yellow-500" />}
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{isDark ? 'Dark' : 'Light'}</span>
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    aria-label="Close"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="space-y-3 mb-6">
                            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                <Palette className="w-3 h-3" /> Theme Color
                            </h4>
                            <div className="grid grid-cols-5 gap-2">
                                {COLORS.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => changeColor(color)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 relative"
                                        style={{ backgroundColor: color.primary }}
                                        title={color.name}
                                    >
                                        {primaryColor === color.primary && (
                                            <Check className="w-4 h-4 text-white drop-shadow-md" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Typography */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                <Type className="w-3 h-3" /> Typography
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {FONTS.map((font) => (
                                    <button
                                        key={font.name}
                                        onClick={() => changeFont(font)}
                                        className={`px-2 py-2 rounded-lg border text-[10px] font-medium transition-all ${currentFont === font.value
                                            ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                                            : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-[var(--primary)]/50'
                                            }`}
                                        style={{ fontFamily: font.value }}
                                    >
                                        {font.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
