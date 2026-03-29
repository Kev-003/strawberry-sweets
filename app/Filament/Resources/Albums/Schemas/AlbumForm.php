<?php

namespace App\Filament\Resources\Albums\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Textarea;
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
                    ->live(onBlur: true),

                Textarea::make('description')
                    ->rows(3)
                    ->nullable()
                    ->columnSpanFull(),

                DatePicker::make('release_date'),

                \Filament\Forms\Components\FileUpload::make('cover_art')
                    ->disk('r2')
                    ->directory(fn ($get) => 'assets/' . str($get('title'))->slug())
                    ->image()
                    ->imageEditor(),

                \Filament\Forms\Components\FileUpload::make('banner_webp')
                    ->label('Banner (WebP)')
                    ->disk('r2')
                    ->directory(fn ($get) => 'assets/' . str($get('title'))->slug())
                    ->image()
                    ->acceptedFileTypes(['image/webp']),

                \Filament\Forms\Components\FileUpload::make('title_webp')
                    ->label('Title (WebP)')
                    ->disk('r2')
                    ->directory(fn ($get) => 'assets/' . str($get('title'))->slug())
                    ->image()
                    ->acceptedFileTypes(['image/webp']),

                \Filament\Forms\Components\FileUpload::make('title_effect_webp')
                    ->label('Title Effect (WebP)')
                    ->disk('r2')
                    ->directory(fn ($get) => 'assets/' . str($get('title'))->slug())
                    ->image()
                    ->acceptedFileTypes(['image/webp']),

                Toggle::make('is_featured')
                    ->required(),

                TextInput::make('spotify_id')
                    ->label('Spotify ID')
                    ->helperText('Optional Spotify ID for future integrations'),

                TextInput::make('presave_link')
                    ->label('Pre-save Link')
                    ->url()
                    ->columnSpanFull(),

                \Filament\Schemas\Components\Section::make('Links')
                    ->schema([
                        TextInput::make('links.spotify')
                            ->label('Spotify')
                            ->url(),
                        TextInput::make('links.youtube')
                            ->label('YouTube')
                            ->url(),
                        TextInput::make('links.apple_music')
                            ->label('Apple Music')
                            ->url(),
                    ])
                    ->columns(3),
            ]);
    }
}
