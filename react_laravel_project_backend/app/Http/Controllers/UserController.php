<?php

namespace App\Http\Controllers;

use App\DataTables\UserDataTable;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //This function to return user info as response to API
    public function getUserInfo($user_id)
    {
        $userInfo = User::findOrFail($user_id);
        return response()->json($userInfo);
    }


    //This function to add update user info that come from react page as response to API 
    public function updateUserInfo(Request $request)
    {
        //
    }


    //This function to add update password info that come from react page as response to API 
    public function updateUserPass(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'password' => [
                    'required',
                    'min:8',
                    'regex:/^(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/',
                ],
            ]
        );

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        User::where('id', $id)->update([
            'password' => $request->newPass,
        ]);

        return response()->json(['message' => 'Password Updated Successfully'], 201);
    }


    public function index(UserDataTable $dataTables)
    {
        return $dataTables->render('AdminDashboard.Pages.user.index');
    }

    public function edit()
    {
    }

    public function destroy()
    {
    }
}
