<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();

        // 🔑 Generate token
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Logged in',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function user(Request $request)
    {
        return $request->user();
    }

    // public function logout(Request $request)
    // {
    //     // This deletes token matching the token string in the Authorization header
    //     $tokenString = $request->user()->currentAccessToken()?->token;

    //     if ($tokenString) {
    //         $request->user()->tokens()->where('token', $tokenString)->delete();
    //     }

    //     return response()->json(['message' => 'Logged out successfully']);
    // }

    public function logout(Request $request)
{
    $user = $request->user();
    if (!$user) {
        return response()->json(['message' => 'Unauthenticated'], 401);
    }

    $tokensCountBefore = $user->tokens()->count();

    $user->tokens()->delete();

    $tokensCountAfter = $user->tokens()->count();

    \Log::info("User {$user->id} logout: tokens before={$tokensCountBefore}, tokens after={$tokensCountAfter}");

    return response()->json(['message' => 'Logged out successfully']);
}
}
