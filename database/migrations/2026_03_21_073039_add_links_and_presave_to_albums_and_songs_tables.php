<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('albums', function (Blueprint $table) {
            $table->string('presave_link')->nullable();
            $table->json('links')->nullable(); // Stores spotify, youtube, apple music links
        });

        Schema::table('songs', function (Blueprint $table) {
            $table->string('presave_link')->nullable();
            $table->json('links')->nullable(); // Stores spotify, youtube, apple music links
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('albums', function (Blueprint $table) {
            $table->dropColumn(['presave_link', 'links']);
        });

        Schema::table('songs', function (Blueprint $table) {
            $table->dropColumn(['presave_link', 'links']);
        });
    }
};
