<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::resource('user', UserController::class);
// Route::resource('category', CategoryController::class);


// Rama & salam dashboard routes
Route::resource('categories', CategoryController::class);
Route::resource('items', ItemController::class);
// Route::resource('reviews',[ ReviewController::class ,'getAllReviews']);
// Route::resource('review/{id}',[ ReviewController::class ,'getSingleReview']);
//Route::resource('reviews', ReviewController::class);
Route::get('reviews',[ ReviewController::class ,'indexDash']);
Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
