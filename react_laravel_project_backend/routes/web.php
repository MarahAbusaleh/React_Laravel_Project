<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ContactController;
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
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::resource('user', UserController::class);
// Route::resource('category', CategoryController::class);

/*---------------------------------------- Marah Routes ----------------------------------------*/

// Route::get('/', function () {
//     return view('AdminDashboard.Pages.login');
// });

Route::get('/login', [AdminController::class, 'index'])->name('login');

Route::post('/AdminLogin', [AdminController::class, 'AdminLogin'])->name('AdminLogin');

Route::get('/AdminLogout', [AdminController::class, 'logout'])->name('AdminLogout');

Route::group(['middleware' => 'adminMiddleware'], function () {

    Route::get('/AdminDashboard', [AdminController::class, 'home'])->name("AdminDashboard");

    Route::get('/contact', [ContactController::class, 'index'])->name('contact');
});

/*---------------------------------------- Marah Routes ----------------------------------------*/


// Rama & salam dashboard routes
Route::resource('categories', CategoryController::class);
Route::resource('items', ItemController::class);
// Route::resource('reviews',[ ReviewController::class ,'getAllReviews']);
// Route::resource('review/{id}',[ ReviewController::class ,'getSingleReview']);
//Route::resource('reviews', ReviewController::class);
Route::get('reviews', [ReviewController::class, 'indexDash']);
Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__ . '/auth.php';
