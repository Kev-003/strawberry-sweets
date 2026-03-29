<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $fillable = [
        'title',
        'description',
        'release_date',
        'cover_art',
        'banner_webp',
        'title_webp',
        'title_effect_webp',
        'is_featured',
        'spotify_id',
        'presave_link',
        'links',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'release_date' => 'date',
        'links' => 'array',
    ];

    public function songs()
    {
        return $this->hasMany(Song::class);
    }
}
