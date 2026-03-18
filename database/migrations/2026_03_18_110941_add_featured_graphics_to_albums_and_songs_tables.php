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
            $table->string('title_effect_svg')->nullable();
        });

        Schema::table('songs', function (Blueprint $table) {
            $table->string('banner_webp')->nullable();
            $table->string('title_svg')->nullable();
            $table->string('title_effect_svg')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('albums', function (Blueprint $table) {
            $table->dropColumn('title_effect_svg');
        });

        Schema::table('songs', function (Blueprint $table) {
            $table->dropColumn(['banner_webp', 'title_svg', 'title_effect_svg']);
        });
    }
};
