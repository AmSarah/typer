<x-layout>
    @vite('resources/js/app.js');

    <div class="container">

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Your Result
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <canvas id="wpmChart" width="400" height="200"></canvas>
                        <p id="wpm"></p>
                        <p id="accuracy"></p>
                        <p id="errorRate"></p>
                        <p id="completionTime"></p>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn btn-primary btn-play-again">
                            Play Again
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card p-3">
            <div class="card-header d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <input type="radio" class="btn-check" name="levels" id="short" autocomplete="off" />
                    <label class="btn btn-outline-primary" for="short">Short</label>

                    <input type="radio" class="btn-check" name="levels" id="medium" autocomplete="off" checked />
                    <label class="btn btn-outline-primary" for="medium">Medium</label>

                    <input type="radio" class="btn-check" name="levels" id="long" autocomplete="off" />
                    <label class="btn btn-outline-primary" for="long">Long</label>
                </div>
                <button id="refresh" class="btn btn-outline-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-bootstrap-reboot" viewBox="0 0 16 16">
                        <path
                            d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.8 6.8 0 0 0 1.16 8z" />
                        <path
                            d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324z" />
                    </svg>
                </button>
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p id="quote"></p>
                    <footer class="blockquote-footer">
                        <cite title="Source Title" id="author"></cite>
                    </footer>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" style="height: 150px" id="userAnswer"></textarea>
                    </div>
                </blockquote>
            </div>
            <div class="card-footer text-body-secondary" id="counter">0:00</div>
        </div>
    </div>
    <script src="{{ asset('js/app.js') }}"></script>

</x-layout>
