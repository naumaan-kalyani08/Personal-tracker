<?php 
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TaskController;
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
    Route::put('/update-profile',[AuthController::class,'updateProfile']);
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::patch('/tasks/{task}', [TaskController::class, 'update']);
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
});