<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

use App\Models\Setting;
use App\Models\Song;
use App\Models\Album;

Route::get('/', function () {
    $featuredSongId = Setting::get('featured_song_id');
    $featuredSong = $featuredSongId ? Song::find($featuredSongId) : null;
    
    $featuredAlbumId = Setting::get('featured_album_id');
    $featuredAlbum = $featuredAlbumId ? Album::find($featuredAlbumId) : null;

    $songs = Song::with('album')
        ->orderBy('track_number')
        ->orderBy('title')
        ->get(['id', 'title', 'description', 'cover_art', 'release_date', 'track_number', 'album_id', 'presave_link', 'links']);

    $albums = Album::orderBy('release_date', 'desc')
        ->get(['id', 'title', 'presave_link', 'links']);

    return Inertia::render('welcome', [
        'featuredSong'  => $featuredSong,
        'featuredAlbum' => $featuredAlbum,
        'songs'         => $songs,
        'albums'        => $albums,
    ]);
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::post('/theme', function (Request $request) {
    $theme = $request->validate(['theme' => 'required|in:light,dark,system'])['theme'];
    if ($request->user()) {
        $request->user()->update(['theme' => $theme]);
    } else {
        $request->session()->put('theme', $theme);
    }
    return back();
})->name('theme.update');

Route::get('/gallery/{folder}', function (string $folder) {
    $disk = Storage::disk('r2');
    $prefix = "gallery/{$folder}";

    if (!$disk->exists($prefix)) abort(404);

    $files = $disk->files($prefix);

    $urls = collect($files)
        ->filter(fn($f) => in_array(
            strtolower(pathinfo($f, PATHINFO_EXTENSION)),
            ['jpg', 'jpeg', 'png', 'webp']
        ))
        ->map(fn($f) => $disk->url($f))
        ->values();

    return response()->json($urls);
})->middleware('throttle:60,1')->name('gallery.folder');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
