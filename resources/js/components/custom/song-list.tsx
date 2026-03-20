import { useState } from 'react';
import SongCard from './song-card';

export interface SongItem {
    id: number;
    title: string;
    description: string | null;
    cover_art: string | null;
    release_date: string | null;
    track_number: number | null;
    album?: {
        id: number;
        title: string;
    } | null;
}

export interface AlbumFilter {
    id: number;
    title: string;
}

interface SongListProps {
    songs: SongItem[];
    albums: AlbumFilter[];
    selectedId: number | null;
    onSelect: (song: SongItem) => void;
}

export default function SongList({ songs, albums, selectedId, onSelect }: SongListProps) {
    const [activeAlbumId, setActiveAlbumId] = useState<number | null>(null);

    const filtered = activeAlbumId == null
        ? songs
        : songs.filter((s) => s.album?.id === activeAlbumId);

    return (
        <div className="flex flex-col gap-3">
            {/* Album filter pills */}
            {albums.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-1">
                    <button
                        onClick={() => setActiveAlbumId(null)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150 ${
                            activeAlbumId === null
                                ? 'bg-brand text-brand-foreground shadow-sm'
                                : 'bg-black/5 text-muted-foreground hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'
                        }`}
                    >
                        All
                    </button>
                    {albums.map((album) => (
                        <button
                            key={album.id}
                            onClick={() => setActiveAlbumId(album.id === activeAlbumId ? null : album.id)}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150 ${
                                activeAlbumId === album.id
                                    ? 'bg-brand text-brand-foreground shadow-sm'
                                    : 'bg-black/5 text-muted-foreground hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'
                            }`}
                        >
                            {album.title}
                        </button>
                    ))}
                </div>
            )}

            {/* Song rows */}
            <div className="flex flex-col">
                {filtered.length === 0 ? (
                    <p className="px-3 py-6 text-center text-sm text-muted-foreground">No songs found.</p>
                ) : (
                    filtered.map((song) => (
                        <button
                            key={song.id}
                            onClick={() => onSelect(song)}
                            aria-label={`Select ${song.title}`}
                            className={`w-full text-left rounded-lg transition-colors duration-100 ${
                                selectedId === song.id
                                    ? 'bg-brand/10 ring-1 ring-brand/30'
                                    : ''
                            }`}
                        >
                            <SongCard
                                title={song.title}
                                coverArt={song.cover_art}
                                albumTitle={song.album?.title}
                                releaseDate={song.release_date}
                                trackNumber={song.track_number}
                            />
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}
