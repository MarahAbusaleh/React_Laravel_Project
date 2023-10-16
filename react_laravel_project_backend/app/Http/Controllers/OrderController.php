<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //This function to return all user orders as response to API
    public function getAllUserOrders($user_id)
    {
        //
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
