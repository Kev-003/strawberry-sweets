import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

interface MarqueeRowProps {
    photos: string[];
    direction: 'left' | 'right';
    speed?: number;
}

function MarqueeRow({ photos, direction, speed = 40 }: MarqueeRowProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);
    const doubled = [...photos, ...photos];

    useGSAP(() => {
        const track = trackRef.current;
        if (!track) return;

        const totalWidth = track.scrollWidth / 2;
        const startX = direction === 'right' ? -totalWidth : 0;

        gsap.set(track, { x: startX });

        const progress = { val: 0 };

        tweenRef.current = gsap.to(progress, {
            val: totalWidth,
            duration: totalWidth / speed,
            ease: 'none',
            repeat: -1,
            onUpdate: () => {
                const x = direction === 'right' ? -totalWidth + (progress.val % totalWidth) : -(progress.val % totalWidth);
                gsap.set(track, { x });
            },
        });
    }, [photos, direction]);

    return (
        <div className="w-full overflow-hidden">
            <div ref={trackRef} className="flex w-max gap-2" style={{ willChange: 'transform' }}>
                {doubled.map((src, i) => (
                    <img key={i} src={src} alt="" className="h-48 w-auto flex-shrink-0 rounded-sm object-cover grayscale-[30%]" draggable={false} />
                ))}
            </div>
        </div>
    );
}

interface GalleryStripProps {
    folders: string[];
}

export default function GalleryStrip({ folders }: GalleryStripProps) {
    const [rows, setRows] = useState<string[][]>([[], [], []]);

    useEffect(() => {
        Promise.all(
            folders.map((folder) =>
                fetch(route('gallery.folder', { folder }))
                    .then((r) => r.json())
                    .catch(() => [] as string[]),
            ),
        ).then((results) => setRows(results));
    }, [folders]);

    const directions: Array<'left' | 'right'> = ['left', 'right', 'left'];

    return (
        <section className="flex w-full flex-col gap-4 overflow-hidden py-8">
            {rows.map((photos, i) =>
                photos.length > 0 ? (
                    <MarqueeRow
                        key={folders[i]}
                        photos={photos}
                        direction={directions[i]}
                        speed={35 + i * 5} // slight speed variation per row
                    />
                ) : null,
            )}
        </section>
    );
}
