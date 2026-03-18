<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\Setting;
use App\Models\Song;
use App\Models\Album;

Route::get('/', function () {
    $featuredSongId = Setting::get('featured_song_id');
    $featuredSong = $featuredSongId ? Song::find($featuredSongId) : null;
    
    $featuredAlbumId = Setting::get('featured_album_id');
    $featuredAlbum = $featuredAlbumId ? Album::find($featuredAlbumId) : null;

    return Inertia::render('welcome', [
        'featuredSong' => $featuredSong,
        'featuredAlbum' => $featuredAlbum,
    ]);
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
