<?php 
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
Route::get('/test', function () {
    return response()->json([
        'status' => true,
        'message' => 'API Working Successfully!'
    ]);
});
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user',[AuthController::class,'userDetails']);
    Route::post('/logout',[AuthController::class,'logout']);
});