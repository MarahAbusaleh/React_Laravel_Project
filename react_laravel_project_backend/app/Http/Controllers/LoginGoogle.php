<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use Auth;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class LoginGoogle extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function googleCallback()
    {
        try {
            $user = Socialite::driver('google')->user();
            $current_user = User::where('google_id', $user->id)->first();

            if ($current_user) {
                Auth::login($current_user);
                return response()->json(['message' => 'User logged in successfully', 'user' => $current_user]);
            } else {
                $newUser = User::updateOrCreate(['email' => $user->email], [
                    'name' => $user->name,
                    'google_id' => $user->id,
                    'password' => Hash::make($user->password)
                ]);

                Auth::login($newUser);
                return response()->json(['message' => 'New user registered and logged in', 'user' => $newUser]);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
