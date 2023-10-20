<?php

namespace App\Http\Controllers;

use App\DataTables\ReviewDataTable;
use App\Models\Item;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // This function returns all reviews for a specific item as a response to the API.
    public function getAllReviews()
    {
        $reviews = Review::all();
        return response()->json($reviews, 200);
    }

    public function getSingleReview($id)
    {
        $item = Item::find($id);

        if (!$item) {
            return response()->json(['error' => 'Item not found'], 404);
        }

        $reviews = Review::where('item_id', $id)->get();

        return response()->json($reviews);
    }


    // This function adds a new review that comes from a React page as a response to the API.
    public function addNewReview(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|integer',
            'item_id' => 'required|integer',
            'comment' => 'required|string',
            'time' => 'required|date',
        ]);

        $review = Review::create($data);

        return response()->json($review, 201);
    }

    // This function returns a list of reviews.
    public function index()
    {
        $reviews = Review::all();
        return response()->json($reviews, 200);
    }

    public function indexDash(ReviewDataTable $dataTables)
    {
        return $dataTables->render('AdminDashboard.Pages.review.index');
    }

    // This function deletes a specific review.
    public function destroy(Review $review)
    {
        $review->delete();
        return response()->json(null, 204);
    }
}
