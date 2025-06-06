<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Dashboard']);
    }
    public function userList()
    {
        $users = User::all();
        return response()->json([
            'message' => 'User List',
            'data' => $users
        ]);
    }
}
