<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
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
}
