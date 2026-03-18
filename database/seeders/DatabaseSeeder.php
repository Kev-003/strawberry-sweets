<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $bandMembers = [
            ['name' => 'Kevern', 'email' => 'kevern920@gmail.com'],
            ['name' => 'Myles', 'email' => 'mylsamr@gmail.com'],
            ['name' => 'Rod', 'email' => 'christianrod099@gmail.com'],
            ['name' => 'Strawberry Sweets', 'email' => 'strwbrryswtsmusic@gmail.com'],
        ];
        foreach ($bandMembers as $member) {
            User::firstOrCreate(
                ['email' => $member['email']],
                [
                    'name' => $member['name'],
                    'password' => Hash::make('sTr@wb3r1_435465g#FNA*%sdg#@!'), 
                ]
            );
        }
    }
}
