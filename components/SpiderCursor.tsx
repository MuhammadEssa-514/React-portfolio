'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
}

interface Ripple {
    x: number;
    y: number;
    r: number;
    maxR: number;
    life: number;
}

const MAX_PARTICLES = 100;
const CONNECTION_DISTANCE = 180;
const PARTICLE_LIFETIME = 70;

function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '249, 115, 22';
}

export default function SpiderCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -9999, y: -9999, vx: 0, vy: 0, lastX: 0, lastY: 0, angle: 0 });
    const particlesRef = useRef<Particle[]>([]);
    const ripplesRef = useRef<Ripple[]>([]);
    const rafRef = useRef<number>(0);
    const activeRef = useRef(false);
    const colorsRef = useRef({ line: '249, 115, 22', dot: '251, 146, 60', cursor: '249, 115, 22' });
    const cursorStyleRef = useRef('web'); // 'web', 'simple', 'crosshair', 'arrow', 'sword', 'none'

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const spawnParticle = (x: number, y: number, forceX = 0, forceY = 0) => {
            if (particlesRef.current.length >= MAX_PARTICLES) return;
            particlesRef.current.push({
                x: x + (Math.random() - 0.5) * 6,
                y: y + (Math.random() - 0.5) * 6,
                vx: forceX + (Math.random() - 0.5) * 0.8,
                vy: forceY + (Math.random() - 0.5) * 0.8,
                life: PARTICLE_LIFETIME,
                maxLife: PARTICLE_LIFETIME,
                size: Math.random() * 1.8 + 1,
            });
        };

        const updateCursor = (x: number, y: number) => {
            activeRef.current = true;
            const dx = x - mouseRef.current.lastX;
            const dy = y - mouseRef.current.lastY;
            const angle = Math.atan2(dy, dx);
            mouseRef.current = { x, y, vx: dx, vy: dy, lastX: x, lastY: y, angle: dx || dy ? angle : mouseRef.current.angle };
            spawnParticle(x, y, dx * 0.1, dy * 0.1);
        };

        const onClick = (e: MouseEvent) => {
            if (cursorStyleRef.current === 'none') return;
            ripplesRef.current.push({ x: e.clientX, y: e.clientY, r: 0, maxR: 120, life: 1.0 });
            for (let i = 0; i < 8; i++) spawnParticle(e.clientX, e.clientY, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onClick);
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('touchstart', onTouchStart, { passive: true });

        function onMouseMove(e: MouseEvent) { updateCursor(e.clientX, e.clientY); }
        function onTouchMove(e: TouchEvent) { if (e.touches[0]) updateCursor(e.touches[0].clientX, e.touches[0].clientY); }
        function onTouchStart(e: TouchEvent) { if (e.touches[0]) updateCursor(e.touches[0].clientX, e.touches[0].clientY); }

        const syncSettings = () => {
            const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
            const rgb = hexToRgb(primary);
            colorsRef.current = { line: rgb, dot: rgb, cursor: rgb };
            cursorStyleRef.current = localStorage.getItem('cursorStyle') || 'web';
            if (cursorStyleRef.current === 'none') document.documentElement.classList.add('show-native-cursor');
            else document.documentElement.classList.remove('show-native-cursor');
        };

        syncSettings();
        window.addEventListener('theme-change', syncSettings);

        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (!activeRef.current) { rafRef.current = requestAnimationFrame(loop); return; }

            const style = cursorStyleRef.current;
            if (style === 'none') { rafRef.current = requestAnimationFrame(loop); return; }

            // Process Ripples
            ripplesRef.current = ripplesRef.current.map(r => ({ ...r, r: r.r + 4, life: r.life - 0.02 })).filter(r => r.life > 0);
            ripplesRef.current.forEach(r => {
                ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${colorsRef.current.cursor}, ${r.life * 0.4})`;
                ctx.lineWidth = 2; ctx.stroke();
            });

            // Trail particles logic
            const spawnChance = style === 'web' || style === 'simple' ? 1 : 0.4;
            if (Math.random() < spawnChance) spawnParticle(mouseRef.current.x, mouseRef.current.y, mouseRef.current.vx * 0.05, mouseRef.current.vy * 0.05);

            particlesRef.current = particlesRef.current.map(p => {
                let nx = p.x + p.vx;
                let ny = p.y + p.vy;
                ripplesRef.current.forEach(r => {
                    const dx = nx - r.x; const dy = ny - r.y; const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < r.r + 20 && d > r.r - 20) { nx += (dx / d) * 2; ny += (dy / d) * 2; }
                });
                return { ...p, x: nx, y: ny, life: p.life - 1, vx: p.vx * 0.98, vy: p.vy * 0.98 };
            }).filter(p => p.life > 0);

            const { line, dot, cursor } = colorsRef.current;
            const pts = particlesRef.current;
            const speed = Math.sqrt(mouseRef.current.vx ** 2 + mouseRef.current.vy ** 2);

            // ── Draw Particles/Web ──────────────────────────────────────────
            pts.forEach((p, i) => {
                const ai = p.life / p.maxLife;
                if (style === 'web') {
                    const dcdist = Math.sqrt((mouseRef.current.x - p.x) ** 2 + (mouseRef.current.y - p.y) ** 2);
                    if (dcdist < CONNECTION_DISTANCE) {
                        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                        ctx.strokeStyle = `rgba(${line},${ai * (1 - dcdist / CONNECTION_DISTANCE) * 0.6})`;
                        ctx.lineWidth = 0.8; ctx.stroke();
                    }
                }
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size * ai, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${dot},${ai * 0.8})`; ctx.fill();
            });

            // ── Draw Main Cursor UI ──────────────────────────────────────────
            const cx = mouseRef.current.x; const cy = mouseRef.current.y;
            ctx.save();
            ctx.translate(cx, cy);

            if (style === 'crosshair') {
                const size = 15 + Math.sin(Date.now() * 0.01) * 2;
                ctx.strokeStyle = `rgba(${cursor}, 0.9)`; ctx.lineWidth = 2;
                // Bars
                ctx.beginPath(); ctx.moveTo(-size, 0); ctx.lineTo(-5, 0); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(5, 0); ctx.lineTo(size, 0); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0, -size); ctx.lineTo(0, -5); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0, 5); ctx.lineTo(0, size); ctx.stroke();
                // Circle
                ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.setLineDash([2, 2]); ctx.stroke();
            } else if (style === 'arrow') {
                ctx.rotate(mouseRef.current.angle);
                const aSize = 12 + speed * 0.2;
                ctx.fillStyle = `rgba(${cursor}, 0.95)`;
                ctx.beginPath(); ctx.moveTo(aSize, 0); ctx.lineTo(-aSize, -aSize * 0.6); ctx.lineTo(-aSize * 0.6, 0); ctx.lineTo(-aSize, aSize * 0.6); ctx.closePath();
                ctx.fill();
                // Trail glow
                ctx.shadowBlur = 10; ctx.shadowColor = `rgba(${cursor}, 0.5)`;
                ctx.strokeStyle = `rgba(${cursor}, 1)`; ctx.lineWidth = 2; ctx.stroke();
            } else if (style === 'target') {
                const rot = Date.now() * 0.002;
                ctx.rotate(rot);
                ctx.strokeStyle = `rgba(${cursor}, 0.8)`; ctx.lineWidth = 2;
                for (let i = 0; i < 4; i++) {
                    ctx.rotate(Math.PI / 2);
                    ctx.beginPath(); ctx.arc(0, 0, 15, -0.4, 0.4); ctx.stroke();
                }
                ctx.beginPath(); ctx.arc(0, 0, 2, 0, Math.PI * 2); ctx.fillStyle = `rgba(${cursor},1)`; ctx.fill();
            } else {
                // Default / Simple / Web Glow
                const pulse = 1 + Math.sin(Date.now() * 0.01) * 0.1;
                const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, 22 * pulse);
                grd.addColorStop(0, `rgba(${cursor},0.3)`); grd.addColorStop(1, `rgba(${cursor},0)`);
                ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(0, 0, 9 + speed * 0.1, 0, Math.PI * 2); ctx.strokeStyle = `rgba(${cursor}, 0.8)`; ctx.lineWidth = 1.5; ctx.stroke();
                ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fillStyle = `rgba(${dot}, 0.95)`; ctx.fill();
            }

            ctx.restore();
            rafRef.current = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('click', onClick);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('theme-change', syncSettings);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true" />;
}
