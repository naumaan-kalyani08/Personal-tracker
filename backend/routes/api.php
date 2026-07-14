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