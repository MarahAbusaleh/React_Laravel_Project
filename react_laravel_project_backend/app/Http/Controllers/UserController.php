<?php

namespace App\Http\Controllers;

use App\DataTables\UserDataTable;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //This function to return user info as response to API
    public function getUserInfo($user_id)
    {
        //
    }


    //This function to add update user info that come from react page as response to API 
    public function updateUserInfo(Request $request)
    {
        //
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
