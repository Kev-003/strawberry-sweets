import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface WelcomeProps {
    featuredSong?: {
        title: string;
        cover_art: string | null;
        banner_webp: string | null;
        title_svg: string | null;
        title_effect_svg: string | null;
        [key: string]: any;
    };
    featuredAlbum?: {
        title: string;
        cover_art: string | null;
        banner_webp: string | null;
        title_svg: string | null;
        title_effect_svg: string | null;
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

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
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
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="absolute flex w-full items-center justify-start">
                            {bannerImage ? (
                                <>
                                    <img 
                                        src={`/storage/${bannerImage}`} 
                                        alt={featured?.title || "Featured Release"} 
                                        className="w-full h-auto overflow-hidden rounded-md shadow-lg" 
                                    />
                                    
                                    {/* Overlay the title graphics safely anchored to the center of the banner */}
                                    {(titleSvg || titleEffectSvg) && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            {titleEffectSvg && (
                                                <img 
                                                    src={`/storage/${titleEffectSvg}`} 
                                                    alt="Title Effect"
                                                    className="absolute w-3/4 max-w-sm lg:max-w-md title-effect-anim opacity-80" 
                                                />
                                            )}
                                            {titleSvg && (
                                                <img 
                                                    src={`/storage/${titleSvg}`} 
                                                    alt={`${featured?.title} Text Logo`}
                                                    className="absolute w-3/4 max-w-sm lg:max-w-md z-10" 
                                                />
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="p-8 text-center text-gray-500 border border-dashed border-[#dcdcdb] dark:border-[#3E3E3A] rounded-md w-full">
                                    No featured banner set. Head to the Band Panel to upload one!
                                </div>
                            )}
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
