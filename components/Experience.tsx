'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const experiences = [
    {
        company: 'WAPDA',
        role: 'Microsoft-Excel',
        date: '2017',
        description: 'I have three months experience in microsoft-excel and I also work at least one month 15 days as a data operator with "WAPDA".'
    },
    {
        company: 'Gilgit Marketers "GB Marketers"',
        role: 'SEO - Search-Engine-Optimization',
        date: '2022',
        description: 'I complete the three month course of SEO Search Engine Optimization in technical college chilmis with Gilgit Marketers "GB Marketers".'
    },
    {
        company: 'North Aims Technology',
        role: 'Frontend-Web-Development',
        date: '2023-Continue',
        description: 'I work seven months with NAT "North Aims Techology" as a junier web developer and I also complete three month interenship with "IT" department Gilgit.'
    }
];

export default function Experience() {
    return (
        <section id="experience" className="w-full mt-12 md:mt-0">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-8"
            >
                <h2 className="text-3xl font-bold text-white mb-8">
                    Experience
                </h2>
            </motion.div>

            <div className="relative border-l-2 border-[var(--primary)] ml-3 md:ml-6 space-y-8 pl-8 pb-4">
                {experiences.map((exp, index) => (
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
                                {exp.date}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">
                                {exp.role}
                            </h3>

                            <p className="text-gray-400 text-sm leading-relaxed">
                                {exp.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
