'use client';

import { motion } from 'framer-motion';

export default function About() {
    return (
        <section id="about" className="py-20 relative z-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                        About <span className="text-[var(--primary)]">Me</span>
                    </h2>
                    <div className="h-1 w-24 bg-[var(--primary)] mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400 transition-colors duration-300"
                    >
                        <p>
                            I am a dedicated <span className="text-gray-900 dark:text-white font-semibold transition-colors duration-300">Frontend Web Developer</span> with <span className="text-gray-900 dark:text-white font-semibold transition-colors duration-300">3+ years</span> of hands-on experience in designing and developing responsive, scalable, and visually engaging web applications.
                        </p>
                        <p>
                            I focus on clean UI, smooth animations, and performance-driven development. My passion lies in creating web experiences that not only look great but also perform flawlessly across all devices.
                        </p>
                        <p>
                            With a strong foundation in modern web technologies, I continuously strive to learn and implement the latest trends in frontend development to deliver high-quality digital solutions.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {[
                            { number: "3+", label: "Years Experience" },
                            { number: "90%", label: "Professional Growth" },
                            { number: "20+", label: "Projects Completed" },
                            { number: "24/7", label: "Support" }
                        ].map((stat, index) => (
                            <div key={index} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-6 rounded-2xl text-center shadow-md dark:shadow-none hover:shadow-lg dark:hover:bg-white/10 transition-all duration-300 group">
                                <h3 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-2 group-hover:scale-110 transition-transform duration-300">{stat.number}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium transition-colors duration-300">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
