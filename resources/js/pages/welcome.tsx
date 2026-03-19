import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface WelcomeProps {
    featuredSong?: {
        title: string;
        cover_art: string | null;
        banner_webp: string | null;
        title_svg: string | null;
        title_effect_svg: string | null;
        release_date: string | null;
        [key: string]: any;
    };
    featuredAlbum?: {
        title: string;
        cover_art: string | null;
        banner_webp: string | null;
        title_svg: string | null;
        title_effect_svg: string | null;
        release_date: string | null;
        [key: string]: any;
    };
}

export default function Welcome({ featuredSong, featuredAlbum }: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;

    // Choose either the featured song or album based on what's set; Song takes priority here.
    const featured = featuredSong || featuredAlbum;

    // Grab the best available image (for an album, try banner_webp first, else cover_art)
    const bannerImage = featured?.banner_webp || featured?.cover_art;
    const titleSvg = featured?.title_svg;
    const titleEffectSvg = featured?.title_effect_svg;
    const releaseDate = featured?.release_date;

    // Check if the release date is in the future.
    // Efficiently compare dates by checking if releaseDate string exists and is alphabetically greater than today's ISO string.
    const isComingSoon = releaseDate ? releaseDate > new Date().toISOString().split('T')[0] : false;
    const hasReleaseDate = !!releaseDate;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="bg-background text-foreground dark:bg-background flex min-h-screen flex-col items-center">
                <div className="w-full max-w-4xl p-6">
                    <header className="w-full text-sm not-has-[nav]:hidden">
                        <nav className="flex items-center justify-end gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('band')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Band Panel
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>
                </div>
                {/* Featured Section - 1/3 of Viewport Height */}
                <div className="relative w-full opacity-100 transition-opacity duration-750 starting:opacity-0">
                    {bannerImage ? (
                        <div className="relative h-[33.33vh] w-full overflow-visible">
                            <img src={`/storage/${bannerImage}`} alt={featured?.title || 'Featured Release'} className="h-full w-full object-cover" />

                            {/* Title graphics overlay */}
                            {(titleSvg || titleEffectSvg) && (
                                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="relative flex flex-col items-center">
                                        <div className="relative flex items-center justify-center">
                                            {titleEffectSvg && (
                                                <img
                                                    src={`/storage/${titleEffectSvg}`}
                                                    alt="Title Effect"
                                                    className="title-effect-anim absolute inset-0 h-full w-full scale-100 opacity-80"
                                                />
                                            )}
                                            <div className="relative flex flex-col items-center">
                                                {titleSvg && (
                                                    <img
                                                        src={`/storage/${titleSvg}`}
                                                        alt={`${featured?.title} Text Logo`}
                                                        className="relative z-10 h-auto w-64 lg:w-130"
                                                    />
                                                )}
                                                {!titleSvg && titleEffectSvg && (
                                                    <img
                                                        src={`/storage/${titleEffectSvg}`}
                                                        alt="Title Effect Placeholder"
                                                        className="invisible h-auto w-64 lg:w-120"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Release badge — anchored to bottom-center of banner */}
                            {hasReleaseDate && (
                                <div className="absolute top-1/2 left-1/2 z-20 mt-6 -translate-x-1/2 translate-y-1/2 rounded-full border border-white/20 bg-black/30 px-4 py-1 text-[10px] font-bold tracking-[0.4em] whitespace-nowrap text-white uppercase shadow-2xl backdrop-blur-md">
                                    {isComingSoon ? 'Coming Soon' : 'Out Now'}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex h-[33.33vh] w-full items-center justify-center border-b border-dashed border-[#dcdcdb] bg-white/5 p-12 text-center text-gray-500 dark:border-[#3E3E3A]">
                            No featured banner set. Head to the Band Panel to upload one!
                        </div>
                    )}
                </div>

                <div className="w-full max-w-4xl p-6 lg:p-8">
                    <main className="flex w-full flex-col items-center">{/* Any additional content goes here */}</main>
                </div>
            </div>
        </>
    );
}
