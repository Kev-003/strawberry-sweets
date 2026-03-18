<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $fillable = [
        'title',
        'release_date',
        'cover_art',
        'banner_webp',
        'title_svg',
        'title_effect_svg',
        'is_featured',
        'spotify_id',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'release_date' => 'date',
    ];

    public function songs()
    {
        return $this->hasMany(Song::class);
    }
}
