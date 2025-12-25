'use client';

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function AggressiveFireParticles() {
    const particlesInit = useCallback(async (engine: any) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="fire-particles"
            init={particlesInit}
            className="fixed inset-0 z-0 pointer-events-none"
            options={{
                fullScreen: { enable: false },
                background: {
                    color: { value: "transparent" },
                },
                fpsLimit: 50, // Even lower for maximum lightness
                interactivity: {
                    events: {
                        onHover: {
                            enable: false, // Disabled hover → big performance win
                        },
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        resize: { enable: true },
                    },
                    modes: {
                        push: {
                            quantity: 6, // Still nice burst but light
                            particles: {
                                color: { value: ["#ff1a00", "#ff6a00", "#ffd000", "#ff4500"] },
                                size: { value: { min: 2, max: 7 } },
                                opacity: { value: { min: 0.6, max: 1 } },
                                move: {
                                    speed: { min: 4, max: 9 },
                                    direction: "top",
                                    random: true,
                                },
                            },
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#00ff88", "#ff4444"], // Soft green + soft red (easier on eyes & GPU)
                    },
                    shape: {
                        type: "circle",
                    },
                    opacity: {
                        value: 0.8, // Fixed opacity → no animation = much lighter
                        random: true,
                    },
                    size: {
                        value: { min: 2, max: 4 },
                        random: true,
                    },
                    move: {
                        enable: true,
                        speed: { min: 0.2, max: 0.7 }, // Very slow calm drift
                        direction: "none",
                        random: true,
                        straight: false,
                        outModes: {
                            default: "bounce",
                        },
                    },
                    number: {
                        value: 40, // Only 40 particles → super lightweight
                        density: {
                            enable: true,
                            area: 800,
                        },
                    },
                    links: {
                        enable: true,
                        distance: 150,
                        color: "#00ff88",
                        opacity: 0.25, // Very faint links
                        width: 1,
                    },
                },
                detectRetina: false, // Important for low performance impact
            }}
        />
    );
}