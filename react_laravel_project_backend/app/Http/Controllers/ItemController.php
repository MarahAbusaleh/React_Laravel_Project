<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use App\DataTables\ItemDataTable;
use App\DataTables\CategoryDataTable;
use App\Models\Category;

class ItemController extends Controller
{
    // Return all items as a response to API
    public function getAllItems($id)
    {
        $items = Item::all();
        $category = Category::where("category_id", $id)->first();
        return response()->json($items);
    }

    public function index(ItemDataTable $dataTables)
    {
        return $dataTables->render('AdminDashboard.Pages.item.index');
    }

    public function create()
    {
        $categories = Category::all();
        return view('AdminDashboard.Pages.item.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'image' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'price' => 'required|numeric', // Add validation for the 'price' field
        ]);

        Item::create($request->all());

        return redirect()->route('items.index')
            ->with('success', 'Item created successfully');
    }

    public function show(Item $item)
    {
        //return view('AdminDashboard.Pages.item.show', compact('item'));
    }

    public function edit(Item $item)
    {
        $categories = Category::all();
        return view('AdminDashboard.Pages.item.edit', compact('item', 'categories'));
    }

    public function update(Request $request, Item $item)
    {
        $request->validate([
            'name' => 'required',
            'image' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'price' => 'required|numeric', // Add validation for the 'price' field
        ]);

        $item->update($request->all());

        return redirect()->route('items.index')
            ->with('success', 'Item updated successfully');
    }

    public function destroy(Item $item)
    {
        $item->delete();

        return redirect()->route('items.index')
            ->with('success', 'Item deleted successfully');
    }
}
