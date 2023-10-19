<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\UserController;
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
