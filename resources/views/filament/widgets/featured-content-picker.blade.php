<x-filament-widgets::widget>
    <x-filament::section>
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold">Manage Featured Content</h2>
            <p class="text-sm text-gray-500 italic">This will update the top section of welcome.tsx</p>
        </div>

        <form wire:submit="update">
            {{ $this->form }}

            <div class="mt-6">
                <x-filament::button type="submit" size="sm">
                    💾 Save Featured Content
                </x-filament::button>
            </div>
        </form>
    </x-filament::section>
</x-filament-widgets::widget>
