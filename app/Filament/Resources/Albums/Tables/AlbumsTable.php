<?php

namespace App\Filament\Resources\Albums\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class AlbumsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('release_date')
                    ->date()
                    ->sortable(),
                \Filament\Tables\Columns\ImageColumn::make('cover_art')
                    ->square(),
                \Filament\Tables\Columns\ImageColumn::make('banner_webp')
                    ->label('Banner'),
                \Filament\Tables\Columns\ImageColumn::make('title_svg')
                    ->label('Title SVG'),
                \Filament\Tables\Columns\ImageColumn::make('title_effect_svg')
                    ->label('Title Effect SVG'),
                IconColumn::make('is_featured')
                    ->boolean(),
                TextColumn::make('spotify_id')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
