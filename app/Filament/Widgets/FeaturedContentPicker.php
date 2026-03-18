<?php

namespace App\Filament\Widgets;

use App\Models\Album;
use App\Models\Song;
use App\Models\Setting;
use Filament\Forms\Components\Select;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Schemas\Schema;
use Filament\Notifications\Notification;
use Filament\Widgets\Widget;

class FeaturedContentPicker extends Widget implements HasForms
{
    use InteractsWithForms;

    protected string $view = 'filament.widgets.featured-content-picker';

    protected int|string|array $columnSpan = 'full';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'featured_song_id' => Setting::where('key', 'featured_song_id')->value('value'),
            'featured_album_id' => Setting::where('key', 'featured_album_id')->value('value'),
        ]);
    }

    public function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Select::make('featured_song_id')
                    ->label('Featured/Upcoming Song')
                    ->options(Song::all()->pluck('title', 'id'))
                    ->searchable()
                    ->placeholder('Select a song to feature'),

                Select::make('featured_album_id')
                    ->label('Featured/Upcoming Album')
                    ->options(Album::all()->pluck('title', 'id'))
                    ->searchable()
                    ->placeholder('Select an album to feature'),
            ])
            ->statePath('data');
    }

    public function update(): void
    {
        $state = $this->form->getState();

        Setting::updateOrCreate(['key' => 'featured_song_id'], ['value' => $state['featured_song_id']]);
        Setting::updateOrCreate(['key' => 'featured_album_id'], ['value' => $state['featured_album_id']]);

        Notification::make()
            ->title('Updated featured content!')
            ->success()
            ->send();
    }
}
