<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //This function to return the last user order as response to API
    public function getTheLastUserOrder($user_id)
    {
        $userOrder = Order::where('user_id', $user_id)
            ->latest('date')
            ->first();

        return response()->json($userOrder);
    }


    //This function to add user order that come from react page as response to API 
    public function addNewUserOrder(Request $request)
    {
        //
    }


    public function index()
    {
        //
    }


    public function show(Order $order)
    {
        //
    }


    public function destroy(Order $order)
    {
        //
    }
}
