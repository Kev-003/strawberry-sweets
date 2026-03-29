<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $fillable = [
        'album_id',
        'title',
        'description',
        'audio_file',
        'cover_art',
        'banner_webp',
        'title_webp',
        'title_effect_webp',
        'is_featured',
        'track_number',
        'spotify_id',
        'release_date',
        'presave_link',
        'links',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'track_number' => 'integer',
        'release_date' => 'date',
        'links' => 'array',
    ];

    public function album()
    {
        return $this->belongsTo(Album::class);
    }
}
