<x-layout>
    <x-slot name="mainClass">profile-main</x-slot>

    <div class="container">
        {{-- <section class="mt-1">
            <h2>Your Statistics Summary</h2>
            <div class="card">
                <div class="card-body">
                    <p><strong>Words Per Minute (WPM):</strong> 60</p>
                    <p><strong>Accuracy:</strong> 95%</p>
                    <p><strong>Error Rate:</strong> 5%</p>
                </div>
            </div>
        </section> --}}
        <h2 class="pb-2 mt-5">Your Typing History</h2>
        <!-- Check if there are rounds to display -->
        @if ($rounds->isEmpty())
            <p>No typing history available.</p>
        @else
            <!-- Table to display typing history -->
            <table class="table mt-2">
                <thead>
                    <tr>
                        <th>Completed At</th>
                        <th>Level</th>
                        <th>WPM</th>
                        <th>Accuracy</th>
                        <th>Error Rate</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($rounds as $round)
                        <tr>
                            <td>{{ $round->created_at }} </td>
                            <td>{{ $round->level }}</td>
                            <td>{{ $round->wpm }}</td>
                            <td>{{ $round->accuracy }}%</td>
                            <td>{{ $round->error_rate }}%</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>
</x-layout>
