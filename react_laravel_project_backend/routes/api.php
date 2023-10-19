<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

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

/*---------------------------------------- Marah Routes ----------------------------------------*/
Route::get('getUserInfo/{id}', [UserController::class, 'getUserInfo']);
Route::put('updateUserPass/{id}', [UserController::class, 'updateUserPass']);


Route::post('/order', [OrderController::class, 'store']);
Route::get('/order', [OrderController::class, 'store']);