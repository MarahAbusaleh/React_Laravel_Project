<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Additional route for getting all categories in API format
Route::get('/categories',[ CategoryController :: class ,'getAllCategories']);
// Route::resource('reviews',[ ReviewController::class ,'getAllReviews']);
// Route::resource('review/{id}',[ ReviewController::class ,'getSingleReview']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Additional route for getting all categories in API format
Route::get('/categories',[ CategoryController :: class ,'getAllCategories']);
Route::get('/items',[ ItemController :: class ,'getAllItems']);
Route::get('/item/{id}',[ ItemController :: class ,'getSingleItem']);
// Route::resource('reviews',[ ReviewController::class ,'getAllReviews']);
// Route::resource('review/{id}',[ ReviewController::class ,'getSingleReview']);
Route::resource('reviews', ReviewController::class);