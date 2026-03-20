<?php

namespace App\Filament\Resources\Songs\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class SongForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\Select::make('album_id')
                    ->relationship('album', 'title')
                    ->searchable()
                    ->preload()
                    ->nullable(),

                TextInput::make('title')
                    ->required()
                    ->live(onBlur: true),

                Textarea::make('description')
                    ->rows(3)
                    ->nullable()
                    ->columnSpanFull(),

                \Filament\Forms\Components\DatePicker::make('release_date'),

                \Filament\Forms\Components\FileUpload::make('audio_file')
                    ->disk('public')
                    ->directory(fn ($get) => 'assets/' . str($get('title'))->slug())
                    ->acceptedFileTypes(['audio/mpeg', 'audio/wav', 'audio/ogg'])
                    ->maxSize(51200) // 50 MB
                    ->nullable(),

                \Filament\Forms\Components\FileUpload::make('cover_art')
                    ->disk('public')
                    ->directory(fn ($get) => 'assets/' . str($get('title'))->slug())
                    ->image()
                    ->imageEditor(),

                \Filament\Forms\Components\FileUpload::make('banner_webp')
                    ->label('Banner (WebP)')
                    ->disk('public')
                    ->directory(fn ($get) => 'assets/' . str($get('title'))->slug())
                    ->image()
                    ->acceptedFileTypes(['image/webp']),

                \Filament\Forms\Components\FileUpload::make('title_svg')
                    ->label('Title (SVG)')
                    ->disk('public')
                    ->directory(fn ($get) => 'assets/' . str($get('title'))->slug()),

                \Filament\Forms\Components\FileUpload::make('title_effect_svg')
                    ->label('Title Effect (SVG)')
                    ->disk('public')
                    ->directory(fn ($get) => 'assets/' . str($get('title'))->slug()),

                Toggle::make('is_featured')
                    ->required(),

                TextInput::make('track_number')
                    ->numeric(),

                TextInput::make('spotify_id')
                    ->label('Spotify ID')
                    ->helperText('Optional Spotify ID for future integrations'),
            ]);
    }
}
