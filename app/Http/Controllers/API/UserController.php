<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20|regex:/^\+?[0-9]{10,15}$/',
            'organisation' => 'nullable|string|max:255',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $user = $request->user();
        $user->name = $request->name;
        $user->phone = $request->phone;
        if ($request->has('organisation')) {
            $user->organisation = $request->organisation;
        }
        $user->save();

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user], 200);
    }

    public function changePassword(Request $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => ['required', 'min:6'],
            'new_password_confirmation' => ['required', 'same:new_password'],
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => ['old_password' => ['Old password is incorrect']]
            ], 422);
        }
        $user->password = Hash::make($request->new_password);
        $user->password_changed_at = now();
        $user->save();
        return response()->json(['message' => 'Password changed successfully', 'user' => $user]);
    }

    public function changeStatus($id)
    {
        $user = User::findOrFail($id);
        $user->status = $user->status === '1' ? '0' : '1';
        $user->save();
        return response()->json([
            'message' => 'User status updated successfully.',
            'status' => $user->status,
            'user' => $user
        ]);
    }
}
