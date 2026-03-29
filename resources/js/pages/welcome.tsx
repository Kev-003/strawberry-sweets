import AppLogo from '@/components/app-logo';
import AboutPhrase from '@/components/custom/about-phrase';
import BandPhoto from '@/components/custom/band-photo';
import StreamingButton from '@/components/custom/button';
import Footer from '@/components/custom/footer';
import GalleryStrip from '@/components/custom/marquee-row';
import SongList, { type AlbumFilter, type SongItem } from '@/components/custom/song-list';
import ThemeToggle from '@/components/custom/theme-toggle';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface FeaturedItem {
    title: string;
    description: string | null;
    cover_art: string | null;
    banner_webp: string | null;
    title_webp: string | null;
    title_effect_webp: string | null;
    release_date: string | null;
    presave_link: string | null;
    links: {
        spotify?: string;
        youtube?: string;
        apple_music?: string;
    } | null;
    [key: string]: any;
}

interface WelcomeProps {
    featuredSong?: FeaturedItem;
    featuredAlbum?: FeaturedItem;
    songs: SongItem[];
    albums: AlbumFilter[];
}

export default function Welcome({ featuredSong, featuredAlbum, songs, albums }: WelcomeProps) {
    const { auth, storageUrl } = usePage<SharedData>().props;

    // Selected song from the list (null = show featured)
    const [selectedSong, setSelectedSong] = useState<SongItem | null>(null);

    // Dismiss loading screen on mount after preloading media
    useEffect(() => {
        const featured = featuredSong || featuredAlbum;
        const bannerImage = featured?.banner_webp || featured?.cover_art;
        const titleSvg = featured?.title_webp;
        const titleEffectSvg = featured?.title_effect_webp;

        const mediaToPreload = [
            bannerImage ? `${storageUrl}/${bannerImage}` : null,
            titleSvg ? `${storageUrl}/${titleSvg}` : null,
            titleEffectSvg ? `${storageUrl}/${titleEffectSvg}` : null,
        ].filter(Boolean) as string[];

        const preloadImage = (src: string) =>
            new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve; // Continue on error
                img.src = src;
            });

        const minimumDelay = new Promise((resolve) => setTimeout(resolve, 500));

        Promise.all([...mediaToPreload.map(preloadImage), minimumDelay]).then(() => {
            document.getElementById('loading-screen')?.classList.add('hidden');
        });
    }, [featuredSong, featuredAlbum, songs, storageUrl]);

    const featured = featuredSong || featuredAlbum;
    const bannerImage = featured?.banner_webp || featured?.cover_art;
    const titleSvg = featured?.title_webp;
    const titleEffectSvg = featured?.title_effect_webp;
    const releaseDate = featured?.release_date;
    const isComingSoon = releaseDate ? new Date(releaseDate) > new Date() : false;
    const hasReleaseDate = !!releaseDate;

    // Info panel — selected song takes priority over the featured item
    const infoTitle = selectedSong ? selectedSong.title : featured?.title;
    const infoCover = selectedSong ? selectedSong.cover_art : featured?.cover_art || featured?.banner_webp;
    const infoDescription = selectedSong ? selectedSong.description : featured?.description;
    const infoReleaseDate = selectedSong ? selectedSong.release_date : releaseDate;
    const infoAlbum = selectedSong?.album?.title ?? null;
    const infoIsComingSoon = infoReleaseDate ? new Date(infoReleaseDate) > new Date() : false;



    return (
        <>
            <Head>
                <title>Strawberry Sweets</title>
                <meta
                    name="description"
                    content="Strawberry Sweets is an indie band from Balanga, Bataan. Making songs that capture fleeting feelings and dreamlike moments."
                />
                <meta name="keywords" content="Strawberry Sweets, indie band, Balanga, Bataan, Filipino indie, OPM" />

                {/* Open Graph — for link previews on Facebook, Discord, etc. */}
                <meta property="og:title" content="Strawberry Sweets" />
                <meta property="og:description" content="Making songs that capture fleeting feelings and dreamlike moments." />
                <meta property="og:image" content={`${storageUrl}/band.webp`} />
                <meta property="og:type" content="music.band" />
                <meta property="og:url" content="https://strawberry-sweets-music.cc" />

                {/* Twitter/X card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Strawberry Sweets" />
                <meta name="twitter:description" content="Making songs that capture fleeting feelings and dreamlike moments." />
                <meta name="twitter:image" content={`${storageUrl}/band.webp`} />
            </Head>
            <div className="bg-background text-foreground dark:bg-background flex min-h-screen flex-col items-center">
                {/* ── Header ── */}
                <div className="bg-background sticky top-0 z-50 w-full max-w-full px-4 py-6 lg:px-8">
                    <header className="flex w-full items-center justify-between text-sm not-has-[nav]:hidden">
                        <AppLogo />
                        <nav className="flex items-center justify-end gap-4">
                            {auth.user && (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            )}
                            <ThemeToggle />
                        </nav>
                    </header>
                </div>

                {/* ── Featured Banner ── */}
                <div className="relative w-full opacity-100 transition-opacity duration-750 starting:opacity-0">
                    {bannerImage ? (
                        <div className="relative h-[33.33vh] w-full overflow-visible">
                            <img
                                src={`${storageUrl}/${bannerImage}`}
                                alt={featured?.title || 'Featured Release'}
                                className="h-full w-full object-cover"
                            />

                            {(titleSvg || titleEffectSvg) && (
                                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="relative flex flex-col items-center">
                                        <div className="relative flex items-center justify-center">
                                            {titleEffectSvg && (
                                                <img
                                                    src={`${storageUrl}/${titleEffectSvg}`}
                                                    alt="Title Effect"
                                                    className="title-effect-anim absolute inset-0 h-full w-full scale-100 opacity-80"
                                                />
                                            )}
                                            <div className="relative flex flex-col items-center">
                                                {titleSvg && (
                                                    <img
                                                        src={`${storageUrl}/${titleSvg}`}
                                                        alt={`${featured?.title} Text Logo`}
                                                        className="relative z-10 h-auto w-64 lg:w-130"
                                                    />
                                                )}
                                                {!titleSvg && titleEffectSvg && (
                                                    <img
                                                        src={`${storageUrl}/${titleEffectSvg}`}
                                                        alt="Title Effect Placeholder"
                                                        className="invisible h-auto w-64 lg:w-120"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {hasReleaseDate && (
                                <StreamingButton
                                    label={isComingSoon ? 'Coming Soon' : 'Out Now'}
                                    className="absolute top-1/2 left-1/2 z-20 mt-6 -translate-x-1/2 translate-y-1/2 rounded-full border border-white/20 bg-black/30 px-4 py-1 text-[10px] font-bold tracking-[0.4em] whitespace-nowrap text-white uppercase shadow-2xl backdrop-blur-md"
                                    onClick={() => {
                                        const link = isComingSoon
                                            ? featured?.presave_link
                                            : featured?.links?.spotify || featured?.links?.youtube || featured?.links?.apple_music;
                                        if (link) window.open(link, '_blank');
                                    }}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="flex h-[33.33vh] w-full items-center justify-center border-b border-dashed border-[#dcdcdb] bg-white/5 p-12 text-center text-gray-500 dark:border-[#3E3E3A]">
                            No featured banner set. Head to the Band Panel to upload one!
                        </div>
                    )}
                </div>

                {/* ── Discography ── */}
                <div className="w-full max-w-full px-4 py-10 lg:px-8">
                    <main>
                        {/* 3-column grid section */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                            {/* Col 1 — Song List */}
                            <section className="flex flex-col gap-4">
                                <h2 className="font-display text-foreground text-lg font-semibold tracking-tight">Songs</h2>
                                <SongList
                                    songs={songs}
                                    albums={albums}
                                    selectedId={selectedSong?.id ?? null}
                                    onSelect={(song) => setSelectedSong((prev) => (prev?.id === song.id ? null : song))}
                                    storageUrl={storageUrl}
                                />
                            </section>

                            {/* Col 2 — Featured Cover */}
                            <section className="hidden items-start justify-center md:flex">
                                {infoCover ? (
                                    <div className="w-full max-w-xs overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10 dark:ring-white/10">
                                        <img
                                            key={infoCover}
                                            src={`${storageUrl}/${infoCover}`}
                                            alt={infoTitle}
                                            className="w-full object-cover transition-opacity duration-300"
                                        />
                                    </div>
                                ) : (
                                    <div className="border-border text-muted-foreground flex h-64 w-full max-w-xs items-center justify-center rounded-2xl border border-dashed text-sm">
                                        No cover art
                                    </div>
                                )}
                            </section>

                            {/* Col 3 — Title & Description */}
                            <section className="col-span-2 hidden flex-col gap-4 md:flex">
                                {infoTitle ? (
                                    <>
                                        <h2 className="font-display text-foreground text-5xl leading-tight font-bold transition-all duration-300">
                                            {infoTitle}
                                        </h2>
                                        {infoAlbum && <p className="text-muted-foreground text-sm font-medium">{infoAlbum}</p>}
                                        {infoReleaseDate && (
                                            <p className="text-brand text-xs font-medium tracking-widest uppercase">
                                                {infoIsComingSoon ? '🗓 Coming Soon' : '🎵 Out Now'} &middot;{' '}
                                                {new Date(infoReleaseDate).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        )}
                                        {infoDescription ? (
                                            <p className="text-muted-foreground text-lg leading-relaxed">{infoDescription}</p>
                                        ) : (
                                            <p className="text-muted-foreground/50 text-lg italic">No description yet.</p>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-muted-foreground text-sm">Set a featured song or album in the Band Panel.</p>
                                )}
                            </section>
                        </div>
                    </main>
                </div>
                {/* ── About ── */}
                <div className="relative flex w-full max-w-full items-center justify-center px-4 py-4 md:py-10 lg:px-8">
                    <AboutPhrase />
                    <p className="text-foreground text-md relative bottom-5 z-10 mx-2 leading-relaxed md:absolute md:mx-70 md:translate-y-1/2 md:text-3xl">
                        Strawberry Sweets is an indie band from Balanga, Bataan, that started from a school event where a one-time performance turned
                        into real chemistry. What began as a simple collab soon grew into a shared love for making songs that capture fleeting
                        feelings and dreamlike moments.
                    </p>
                </div>
                <div className="relative mt-3 flex w-full max-w-full items-center justify-center px-4 py-4 md:mt-30 md:py-10 lg:px-8">
                    <GalleryStrip folders={['dhvsu', 'prod', 'candid']} />
                </div>
                {/* ── Band Photo ── */}
                <div className="relative flex w-full max-w-full items-center justify-center px-4 py-4 md:py-10 lg:px-8">
                    <BandPhoto photo="band.webp" storageUrl={storageUrl} />
                </div>

                {/* ── Footer ── */}
                <div className="relative flex w-full max-w-full items-center justify-center px-4 py-4 md:py-10 lg:px-8">
                    <Footer />
                </div>
            </div>
        </>
    );
}
