<?php

namespace App\Http\Controllers;

use App\Models\Rounds;
use Illuminate\Http\Request;

class RoundController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieve rounds for the authenticated user
        $rounds = Rounds::where('user_id', auth()->id())
                        ->orderBy("created_at", "desc")
                        ->paginate(10);
        
        return view('game.profile', ['rounds' => $rounds]);
    }


    public function store(Request $request)
    {
        // Validate the incoming request data if necessary

        // Create a new round
        $round = new Rounds();
        $round->user_id = auth()->id(); // Assuming user is authenticated
        $round->quote = $request->quote;
        $round->author = $request->author;
        $round->level = $request->level;
        $round->wpm = $request->wpm;
        $round->accuracy = $request->accuracy;
        $round->error_rate = $request->error_rate;
        $round->save();

        return response()->json(['success' => true]);
    }
 
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rounds $rounds)
    {
        //
    }
}
