<?php

namespace App\Filament\Resources\Albums\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class AlbumForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->live(onBlur: true), // Live update so dynamic directories can use the title

                DatePicker::make('release_date'),

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

                TextInput::make('spotify_id')
                    ->label('Spotify ID')
                    ->helperText('Optional Spotify ID for future integrations'),
            ]);
    }
}
