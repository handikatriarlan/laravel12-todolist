<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TodoController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');

    Route::get('to-do', [TodoController::class, 'index'])->name('to-do');
    Route::post('to-do', [TodoController::class, 'store'])->name('to-do.store');
    Route::put('to-do/{todo}', [TodoController::class, 'update'])->name('to-do.update');
    Route::delete('to-do/{todo}', [TodoController::class, 'destroy'])->name('to-do.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
