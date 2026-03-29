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
            $table->renameColumn('title_svg', 'title_webp');
            $table->renameColumn('title_effect_svg', 'title_effect_webp');
        });

        Schema::table('songs', function (Blueprint $table) {
            $table->renameColumn('title_svg', 'title_webp');
            $table->renameColumn('title_effect_svg', 'title_effect_webp');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('albums', function (Blueprint $table) {
            $table->renameColumn('title_webp', 'title_svg');
            $table->renameColumn('title_effect_webp', 'title_effect_svg');
        });

        Schema::table('songs', function (Blueprint $table) {
            $table->renameColumn('title_webp', 'title_svg');
            $table->renameColumn('title_effect_webp', 'title_effect_svg');
        });
    }
};
