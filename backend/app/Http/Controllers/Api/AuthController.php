<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\log;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    
    public function register(request $request){
        $validator =Validator::make($request->all(),[
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'email' =>'required|email|unique:users,email',
        'password'=>'required|string|min:8',
        'number'=>'nullable|string|max:12',
        ]);        
        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'error'=>$validator->errors()
            ],422);
        }
        $user =user::create([
            'first_name'=>$request->first_name,
            'last_name'=>$request->last_name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'number'=>$request->number,
        ]);
        return response()->json([
            'status'=>true,
            'message'=>'User registered successfully',
            'data'=>$user
        ],201);
    }
    public function login(request $request){
     $validator =Validator::make($request->all(),[
        'email'=>'required|email',
        'password'=>'required|string',
     ]);   
     if($validator->fails()){
        return response()->json([
            'status'=>false,
            'error'=>$validator->errors()
        ],422);
     }
     $user =User::where('email',$request->email)->first();
        if(!$user){
            return response()->json([
                'status'=>false,
                'message'=>'User not found'
            ],404);
        }
        if(!Hash::check($request->password,$user->password)){
            return response()->json([
                'status'=>false,
                'message'=>'Invalid password'
            ],401);
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'status'=>true,
            'message'=>'User Logged in successfully',
            'access_token'=>$token,
            'user'=>$user
        ],200); 
    }
    public function userDetails(request $request){
        return response()->json([
            'status'=>true,
            'user'=>$request->user()
        ],200);
    }
    public function logout( request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status'=>true,
            'message'=>'User logged out successfully'
        ],200);
    }
    public function updateProfile(request $request){
        $user = $request->user();
        Log::info(['user 90' => $user]);
        return [
            'status' => true,
            'message' => 'User details retrieved successfully',
            'data' => $user
        ];
        $validator = Validator::make($request->all(), [
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'number' => 'string|max:12',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error' => $validator->errors()
            ], 422);
        }

        $user->update($request->only(['first_name', 'last_name', 'number']));

        return response()->json([
            'status' => true,
            'message' => 'Profile updated successfully',
            'data' => $user
        ], 200);
    }
}
