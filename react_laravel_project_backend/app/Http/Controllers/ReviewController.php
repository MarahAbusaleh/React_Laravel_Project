<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{

    //This function to return all review on specific item as response to API
    public function getAllReviews($item_id)
    {
        //
    }


    //This function to add review that come from react page as response to API 
    public function addNewReview(Request $request)
    {
        //
    }


    public function index()
    {
        //
    }


    public function destroy(Review $review)
    {
        //
    }
}
