<?php

namespace App\Http\Controllers;

use App\DataTables\CategoryDataTable;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    public function getAllCategories()
    {
        $categories = Category::all();

        return response()->json(['categories' => $categories]);
    }

    public function index(CategoryDataTable $dataTables)
    {
        return $dataTables->render('AdminDashboard.Pages.category.index');
    }

    public function create()
    {
        return view('AdminDashboard.Pages.category.create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->route('categories.create')
                ->withErrors($validator)
                ->withInput();
        }

        // Handle image upload and save to storage
        $imagePath = $request->file('image')->store('category_images');

        // Create a new category
        Category::create([
            'name' => $request->input('name'),
            'image' => $imagePath,
            'description' => $request->input('description'),
        ]);

        return redirect()->route('categories.index')
            ->with('success', 'Category created successfully');
    }

    public function show(Category $category)
    {
        return view('AdminDashboard.Pages.category.index', ['category' => $category]);
    }

    public function edit(Category $category)
    {
        return view('AdminDashboard.Pages.category.edit', ['category' => $category]);
    }

    public function update(Request $request, Category $category)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'image|mimes:jpeg,png,jpg,gif',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->route('categories.edit', ['category' => $category])
                ->withErrors($validator)
                ->withInput();
        }

        // Update category fields
        $category->name = $request->input('name');
        $category->description = $request->input('description');

        // Handle image update if a new image is provided
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if (Storage::exists($category->image)) {
                Storage::delete($category->image);
            }

            // Store the new image
            $imagePath = $request->file('image')->store('category_images');
            $category->image = $imagePath;
        }

        $category->save();

        return redirect()->route('categories.index')
            ->with('success', 'Category updated successfully');
    }

    public function destroy(Category $category)
    {
        // Delete the category image
        if (Storage::exists($category->image)) {
            Storage::delete($category->image);
        }

        // Delete the category record from the database
        $category->delete();

        return redirect()->route('categories.index')
            ->with('success', 'Category deleted successfully');
    }
}
