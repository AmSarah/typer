<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\RoundController;

Route::get('/', [GameController::class ,'index'])->name('game.index');
// Protected routes requiring authentication
Route::middleware('auth')->group(function () {
    Route::get('/profile', [RoundController::class ,'index'])->name('rounds.index');
    Route::post('/rounds', [RoundController::class, 'store'])->name('rounds.store');
});


Auth::routes();

