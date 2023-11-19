<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProductoController;
use App\Http\Controllers\API\CategoriaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('x_api_key')->group(function () {
        Route::prefix('producto')->group(function () {
        Route::get('/', [ProductoController::class, 'getAll']);
        Route::post('/', [ProductoController::class, 'create']);
        Route::delete('/{id}', [ProductoController::class, 'delete']);
        Route::get('/{id}', [ProductoController::class, 'get']);
        Route::put('/{id}', [ProductoController::class, 'update']);
    });
        Route::prefix('categoria')->group(function () {
        Route::get('/', [CategoriaController::class, 'getAll']);
        Route::post('/', [CategoriaController::class, 'create']);
        Route::delete('/{id}', [CategoriaController::class, 'delete']);
        Route::get('/{id}', [CategoriaController::class, 'get']);
        Route::put('/{id}', [CategoriaController::class, 'update']);
    });
});
