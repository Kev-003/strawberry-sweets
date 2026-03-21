<?php

use Illuminate\Http\Request;
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
    $path = storage_path("app/public/gallery/{$folder}");
    if (!File::isDirectory($path)) abort(404);
    
    $files = File::files($path);
    $urls = collect($files)
        ->filter(fn($f) => in_array(strtolower($f->getExtension()), ['jpg', 'jpeg', 'png', 'webp']))
        ->map(fn($f) => asset("storage/gallery/{$folder}/" . $f->getFilename()))
        ->values();
    
    return response()->json($urls);
})->name('gallery.folder');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
