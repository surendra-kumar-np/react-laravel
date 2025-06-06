<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);

        return response()->json(['message' => 'Registered']);
    }

    // public function login(Request $request)
    // {
    //     $request->validate([
    //         'email' => 'required|string|email',
    //         'password' => 'required|string',
    //         'captcha' => 'required|captcha'
    //     ]);

    //     if (!Auth::attempt($request->only('email', 'password'))) {
    //         return response()->json(['message' => 'Invalid credentials'], 401);
    //     }

    //     return response()->json(['message' => 'Logged in']);
    // }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'captcha' => 'required|captcha'
        ]);

        if (!Auth::guard('web')->attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $request->session()->token(); // 🔴 This is the critical step

        return response()->json(['message' => 'Logged in']);
    }
    public function user(Request $request)
    {
        return $request->user();
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();       // Invalidate the session
        $request->session()->regenerateToken();  // Regenerate CSRF token

        return response()->json(['message' => 'Logged out']);
    }
    // public function userList()
    // {
    //     $users = User::all();
    //     return response()->json([
    //         'message' => 'User List',
    //         'data' => $users
    //     ]);
    // }
}
