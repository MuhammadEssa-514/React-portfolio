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
    const [cursorStyle, setCursorStyle] = useState('web');
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

        // Cursor Logic
        const savedCursor = localStorage.getItem('cursorStyle') || 'web';
        setCursorStyle(savedCursor);
        if (savedCursor === 'none') {
            document.documentElement.classList.add('show-native-cursor');
        } else {
            document.documentElement.classList.remove('show-native-cursor');
        }

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
        window.dispatchEvent(new Event('theme-change')); // Trigger cursor sync
    };

    // Change Font
    const changeFont = (font: typeof FONTS[0]) => {
        setCurrentFont(font.value);
        document.documentElement.style.setProperty('--font-current', font.value);
        localStorage.setItem('fontStyle', font.value);
        window.dispatchEvent(new Event('theme-change'));
    };

    // Reset to defaults
    const resetDefaults = () => {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';

        const defColor = COLORS[0];
        setPrimaryColor(defColor.primary);
        document.documentElement.style.setProperty('--primary', defColor.primary);
        document.documentElement.style.setProperty('--accent', defColor.accent);
        localStorage.setItem('primaryColor', defColor.primary);
        localStorage.setItem('accentColor', defColor.accent);

        setCurrentFont(FONTS[0].value);
        document.documentElement.style.setProperty('--font-current', FONTS[0].value);
        localStorage.setItem('fontStyle', FONTS[0].value);

        setCursorStyle('web');
        localStorage.setItem('cursorStyle', 'web');
        document.documentElement.classList.remove('show-native-cursor');

        window.dispatchEvent(new Event('theme-change'));
    };

    // Change Cursor Style
    const changeCursor = (style: string) => {
        setCursorStyle(style);
        localStorage.setItem('cursorStyle', style);

        if (style === 'none') {
            document.documentElement.classList.add('show-native-cursor');
        } else {
            document.documentElement.classList.remove('show-native-cursor');
        }

        window.dispatchEvent(new Event('theme-change'));
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
                        initial={{ opacity: 0, y: 15, scale: 0.9, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 15, scale: 0.9, filter: 'blur(10px)' }}
                        className="absolute right-0 mt-3 w-80 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">Studio Settings</h3>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">Personalize your experience</p>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all border border-gray-200 dark:border-white/10"
                            >
                                {isDark ? <Sun className="w-4 h-4 text-orange-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                            </button>
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
                        <div className="space-y-3 mb-6">
                            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                <Type className="w-3 h-3" /> Typography
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {FONTS.map((font) => (
                                    <button
                                        key={font.name}
                                        onClick={() => changeFont(font)}
                                        className={`px-2 py-2 rounded-lg border text-[10px] font-medium transition-all ${currentFont === font.value
                                            ? 'border-primary bg-primary/10 text-primary'
                                            : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-primary/50'
                                            }`}
                                        style={{ fontFamily: font.value }}
                                    >
                                        {font.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Spider Cursor Style */}
                        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                    Interactive Cursor
                                </h4>
                                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[8px] font-black uppercase">Alpha</span>
                            </div>
                            <div className="grid grid-cols-3 gap-1.5">
                                {['Web', 'Simple', 'Crosshair', 'Arrow', 'Target', 'None'].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => changeCursor(s.toLowerCase())}
                                        className={`py-2 rounded-xl border text-[9px] font-bold tracking-tight transition-all active:scale-95 ${cursorStyle === s.toLowerCase()
                                            ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(249,115,22,0.1)]'
                                            : 'border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="mt-6 flex gap-2">
                            <button
                                onClick={resetDefaults}
                                className="flex-1 py-2 rounded-xl text-[10px] font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            >
                                Reset Defaults
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-6 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black text-[10px] font-bold hover:opacity-90 transition-opacity"
                            >
                                Done
                            </button>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
