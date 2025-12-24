'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';

const education = [
    {
        degree: 'Matriculation-Army Public Jutial Gilgit',
        institution: 'Complete Matriculation From Army Public School And College Jutial Gilgit Allhumdullah With 77% Marks In ICS Field By the God Of Grace.',
        date: '2017 - 2019',
        current: false
    },
    {
        degree: 'Intermediate -Army Public Jutial Gilgit',
        institution: 'Completed FSC From Army Public School And College Jutial Gilgit Allhumdullah I Get 82% Marks In FSC In ICS Field By The God Of Grace.',
        date: '2019 - 2021',
        current: false
    },
    {
        degree: 'ADCS (Associate Degree in Computer Science)',
        institution: 'By The God Of Grace I Completed Bs In Computer Science From Nust Under The Period Of 2019-2023 With Good GPA.',
        date: '2023 - 2025',
        current: true
    }
];

export default function Education() {
    return (
        <section id="education" className="w-full">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-8"
            >
                <h2 className="text-3xl font-bold text-white mb-8">
                    Education
                </h2>
            </motion.div>

            <div className="relative border-l-2 border-[var(--primary)] ml-3 md:ml-6 space-y-8 pl-8 pb-4">
                {education.map((edu, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Dot on the timeline */}
                        <div className="absolute top-0 -left-[41px] md:-left-[43px] w-6 h-6 bg-[var(--primary)] rounded-full border-4 border-black z-10" />

                        <div className="p-6 border border-[var(--primary)] rounded-lg bg-black/50 hover:bg-white/5 transition-colors duration-300">
                            <div className="flex items-center text-[var(--primary)] text-sm font-semibold mb-2">
                                <Calendar className="w-4 h-4 mr-2" />
                                {edu.date}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">
                                {edu.degree}
                            </h3>

                            <p className="text-gray-400 text-sm leading-relaxed">
                                {edu.institution}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
