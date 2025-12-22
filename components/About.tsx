'use client';

import { motion } from 'framer-motion';

export default function About() {
    return (
        <section id="about" className="py-20 bg-white dark:bg-black relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent inline-block">
                        About Me
                    </h2>
                    <div className="h-1 w-20 bg-[var(--primary)] mx-auto mt-2 rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-gray-700 dark:text-gray-300"
                    >
                        <p>
                            I am a dedicated <span className="text-[var(--primary)] font-semibold">Frontend Web Developer</span> with <span className="font-semibold">3+ years</span> of hands-on experience in designing and developing responsive, scalable, and visually engaging web applications.
                        </p>
                        <p className="mt-4">
                            I focus on clean UI, smooth animations, and performance-driven development. My passion lies in creating web experiences that not only look great but also perform flawlessly across all devices.
                        </p>
                        <p className="mt-4">
                            With a strong foundation in modern web technologies, I continuously strive to learn and implement the latest trends in frontend development to deliver high-quality digital solutions.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl"
                    >
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center p-4">
                                <h3 className="text-4xl font-bold text-[var(--primary)] mb-2">3+</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">Years Experience</p>
                            </div>
                            <div className="text-center p-4">
                                <h3 className="text-4xl font-bold text-[var(--primary)] mb-2">90%</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">Professional Growth</p>
                            </div>
                            <div className="text-center p-4">
                                <h3 className="text-4xl font-bold text-[var(--primary)] mb-2">20+</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">Projects Completed</p>
                            </div>
                            <div className="text-center p-4">
                                <h3 className="text-4xl font-bold text-[var(--primary)] mb-2">24/7</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">Support</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
