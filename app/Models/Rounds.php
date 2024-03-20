<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rounds extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'quote', 'author', 'level', 'wpm', 'accuracy', 'error_rate', // Add other fields if necessary
    ];

    // Define relationship with User model if needed
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
