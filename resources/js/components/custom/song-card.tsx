interface SongCardProps {
    title: string;
    coverArt: string | null;
    albumTitle?: string;
    releaseDate?: string | null;
    trackNumber?: number | null;
}

export default function SongCard({ title, coverArt, albumTitle, releaseDate, trackNumber }: SongCardProps) {
    return (
        <div className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-150 hover:bg-black/5 dark:hover:bg-white/5">
            {/* Cover Art */}
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md shadow-sm">
                {coverArt ? (
                    <img
                        src={`/storage/${coverArt}`}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="bg-brand/10 text-brand/40 flex h-full w-full items-center justify-center">
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
                <p className="text-foreground truncate text-sm font-medium">{title}</p>
                {albumTitle && <p className="text-muted-foreground truncate text-xs">{albumTitle}</p>}
            </div>

            {/* Track number / date */}
            <div className="flex-shrink-0 text-right">
                {trackNumber != null && <span className="text-muted-foreground text-xs">#{trackNumber}</span>}
                {releaseDate && <p className="text-muted-foreground text-xs">{new Date(releaseDate).getFullYear()}</p>}
            </div>
        </div>
    );
}
