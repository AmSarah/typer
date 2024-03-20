<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rounds>
 */
class roundsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
           'user_id'=>1,
           'quote' =>'To be or not to be',
           'author'=> 'Sarah Saleh',
           'level' => 'short',
            'wpm' => 60,
            'accuracy'=> 90.2,
            'error_rate'=> 3.5 ];
    }
}
