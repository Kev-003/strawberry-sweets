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
        $adminEmails = explode(',', env('ADMIN_EMAILS', ''));
        $password = env('INITIAL_ADMIN_PASSWORD', 'password');

        foreach ($adminEmails as $email) {
            if (empty($email)) continue;

            // Simple mapping for names based on known emails
            $name = match (trim($email)) {
                'kevern920@gmail.com' => 'Kevern',
                'mylsamr@gmail.com' => 'Myles',
                'christianrod099@gmail.com' => 'Rod',
                'strwbrryswtsmusic@gmail.com' => 'Strawberry Sweets',
                default => 'Band Member',
            };

            User::firstOrCreate(
                ['email' => trim($email)],
                [
                    'name' => $name,
                    'password' => Hash::make($password),
                ]
            );
        }
    }
}
