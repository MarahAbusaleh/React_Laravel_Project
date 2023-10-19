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
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required',
            'item_id' => 'required',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'location' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'totalPrice' => 'required|numeric|min:0',
            'editing' => 'boolean',
        ]);

        $order = Order::create($validatedData);

        return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);
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
