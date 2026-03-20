import { useGSAP } from '@gsap/react';
import { router, usePage } from '@inertiajs/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
    const { theme: serverTheme } = usePage<{ theme: Theme }>().props;

    // Resolve the initial effective mode from server theme.
    const getInitialDark = (t: Theme) => {
        if (t === 'dark') return true;
        if (t === 'light') return false;
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    const containerRef = useRef<HTMLButtonElement>(null);
    const knobRef = useRef<HTMLDivElement>(null);
    const sunRaysRef = useRef<(HTMLSpanElement | null)[]>([]);
    const moonRef = useRef<HTMLDivElement>(null);
    const [dark, setDark] = useState(() => getInitialDark(serverTheme ?? 'light'));

    // Keep in sync if the server theme changes (e.g. navigating to a new page).
    useEffect(() => {
        setDark(getInitialDark(serverTheme ?? 'light'));
    }, [serverTheme]);

    // Apply the class to <html> whenever dark changes.
    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
    }, [dark]);

    useGSAP(
        () => {
            gsap.killTweensOf([knobRef.current, moonRef.current, ...sunRaysRef.current]);

            if (dark) {
                gsap.to(knobRef.current, { x: 24, backgroundColor: '#1a0a0d', duration: 0.4, ease: 'power3.out' });
                gsap.to(sunRaysRef.current, { scale: 0, opacity: 0, duration: 0.2, stagger: { each: 0.02, from: 'random' }, ease: 'power2.in' });
                gsap.to(moonRef.current, { opacity: 1, scale: 1, rotation: 0, duration: 0.35, delay: 0.15, ease: 'power2.out' });
            } else {
                gsap.to(knobRef.current, { x: 0, backgroundColor: '#fff8f0', duration: 0.4, ease: 'power3.out' });

                // Rays burst out then retract — a starburst flash
                const tl = gsap.timeline({ delay: 0.1 });
                tl.fromTo(
                    sunRaysRef.current,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1.5,
                        opacity: 1,
                        duration: 0.2,
                        stagger: { each: 0.015, from: 'center' },
                        ease: 'power2.out',
                    },
                ).to(sunRaysRef.current, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.25,
                    stagger: { each: 0.015, from: 'edges' },
                    ease: 'power2.in',
                });

                gsap.to(moonRef.current, { opacity: 0, scale: 0.6, rotation: -30, duration: 0.2, ease: 'power2.in' });
            }
        },
        { scope: containerRef, dependencies: [dark] },
    );

    const toggle = () => {
        const newDark = !dark;
        setDark(newDark);
        const newTheme: Theme = newDark ? 'dark' : 'light';

        // Persist to server (authenticated = saved to user, guest = saved to session).
        router.post(route('theme.update'), { theme: newTheme }, { preserveScroll: true, preserveState: true });
    };

    const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

    return (
        <button
            ref={containerRef}
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="relative flex h-8 w-14 cursor-pointer items-center rounded-full border border-black/10 bg-black/10 px-1 backdrop-blur-sm transition-colors dark:border-white/10 dark:bg-black/20"
        >
            {/* Track tint */}
            <div
                className="pointer-events-none absolute inset-0 rounded-full transition-colors duration-500"
                style={{ background: dark ? 'hsla(240,20%,10%,0.4)' : 'hsla(35,80%,85%,0.25)' }}
            />

            {/* Knob */}
            <div
                ref={knobRef}
                className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-md"
                style={{ backgroundColor: '#fff8f0', willChange: 'transform' }}
            >
                {/* Sun core */}
                <div className="absolute h-2.5 w-2.5 rounded-full bg-amber-400" />

                {/* Sun rays */}
                {RAY_ANGLES.map((angle, i) => (
                    <span
                        key={angle}
                        ref={(el) => {
                            sunRaysRef.current[i] = el;
                        }}
                        className="absolute h-1 w-0.5 rounded-full bg-amber-400"
                        style={{
                            transformOrigin: 'center 14px',
                            transform: `rotate(${angle}deg) translateY(-6px)`,
                            top: '50%',
                            left: '50%',
                            marginLeft: '-1px',
                            marginTop: '-14px',
                        }}
                    />
                ))}

                {/* Moon */}
                <div
                    ref={moonRef}
                    className="absolute h-3.5 w-3.5 rounded-full"
                    style={{
                        opacity: 0,
                        scale: '0.6',
                        background: 'hsl(240, 30%, 85%)',
                        boxShadow: 'inset -2px -1px 0 2px hsl(240,20%,60%)',
                    }}
                />
            </div>
        </button>
    );
}
