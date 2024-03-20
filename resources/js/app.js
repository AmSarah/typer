$(document).ready(function () {
    class TyperGame {
        constructor() {
            this.quotes = []; // Array to store fetched quotes
            this.originalQuote = "";
            this.author = "Source Title";
            this.level = "medium";
            this.startTime = null;
            this.endTime = null;
            this.timerInterval = null;
            this.myChart = null;
            this.mistakes = 0; // Track mistakes

            // Initialize the game
            this.init();
        }

        // Initialize the game
        init() {
            this.bindEvents();
            this.fetchQuotes();
            this.createChart(); // Create the chart instance
            this.generateQuote(); // Choose a random quote when the page is loaded
        }

        // Fetch quotes from the Quotable API
        fetchQuotes() {
            const apiUrl = "https://api.quotable.io/quotes";
            axios.get(apiUrl)
                .then(response => {
                    if (!response.data || !Array.isArray(response.data.results)) {
                        throw new Error('Invalid response format');
                    }
                    this.quotes = response.data.results;
                    this.generateQuote();
                    $("#quote").show(); // Show the quote paragraph once loaded
                })
                .catch(error => {
                    console.error('Error fetching quotes:', error);
                    $("#quote").text("Error fetching quotes. Please try again later.");
                });
        }

        generateQuote() {
            if (!this.quotes || this.quotes.length === 0) {
                console.error('No quotes available.');
                return;
            }

            // Get the selected level
            this.level = $('input[name="levels"]:checked').attr("id");

            // Filter quotes based on level
            const filteredQuotes = this.quotes.filter(quote => {
                switch (this.level) {
                    case "short":
                        return quote.length < 80;
                    case "medium":
                        return quote.length >= 80 && quote.length < 100;
                    case "long":
                        return quote.length >= 100;
                    default:
                        return false;
                }
            });

            if (filteredQuotes.length === 0) {
                console.error('No quotes available for the selected level.');
                return;
            }

            // Choose a random quote from the filtered list
            const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
            const selectedQuote = filteredQuotes[randomIndex];

            // Update the quote and author in the UI
            $("#quote").text(selectedQuote.content);
            $("#author").text(selectedQuote.author); // Update the author
            $("#userAnswer").val("").prop("disabled", false); // Clear and enable the text area
            this.originalQuote = selectedQuote.content;
            this.mistakes = 0; // Reset mistakes
        }
        bindEvents() {
            $("#userAnswer").off("input").on("input", () => this.checkAnswer());
            $(".btn-play-again").off("click").click(() => this.resetGame());
            $('input[type="radio"]').off("change").change(() => this.resetGame()); // Change to resetGame() instead of generateQuote()
            $("#refresh").off("click").click(() => this.resetGame()); // Change to resetGame() instead of generateQuote()
        }
        

        checkAnswer() {
            const typedText = $("#userAnswer").val().trim();
            const originalText = this.originalQuote;
            let isCorrect = true;
        
            // Start the timer as soon as the user starts typing
            if (!this.startTime && typedText.length > 0) {
                this.startTime = new Date();
                this.startTimer();
            }
        
            for (let i = 0; i < typedText.length; i++) {
                if (typedText[i] !== originalText[i]) {
                    isCorrect = false;
                    break;
                }
            }
        
            $("#userAnswer").css("color", isCorrect ? "green" : "red");
        
            if (isCorrect && typedText.length === originalText.length) {
                this.endTime = new Date();
                this.showResult(); // Show the result when the game is completed
                clearInterval(this.timerInterval); // Stop the timer
                $("#userAnswer").prop("disabled", true); // Disable the text area
            }
        }
        

        resetGame() {
            // Reset UI elements
            $("#userAnswer").val("").prop("disabled", false); // Clear and enable the text area
            $("#counter").text("0:00");
            $("#userAnswer").css("color", "black"); // Reset text color
        
            // Reset timer variables
            this.startTime = null;
            this.endTime = null;
            clearInterval(this.timerInterval); // Stop the timer
        
            // Reset mistakes count
            this.mistakes = 0;
        
            // Generate a new quote
            this.generateQuote();
        
            // Close the result modal if open
            this.closeResultModal();
        }
        

        createChart() {
            const ctx = document.getElementById('wpmChart').getContext('2d');
            this.myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['1', '2', '3', '4', '5'],
                    datasets: [{
                        label: 'WPM Over Time',
                        data: [],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        updateChartData(data) {
            this.myChart.data.datasets[0].data = data;
            this.myChart.update();
        }

        showResult() {
            const typedText = $("#userAnswer").val().trim();
            const originalText = this.originalQuote;
            const totalCharacters = originalText.length;
            const totalWords = originalText.split(" ").length;
        
            // Calculate WPM
            const timeDiff = (this.endTime - this.startTime) / 1000; // in seconds
            const wpm = Math.round((totalWords / timeDiff) * 60);
        
            // Calculate accuracy and error rate
            const accuracy = Math.round(((totalCharacters - this.mistakes) / totalCharacters) * 100);
            const errorRate = Math.round((this.mistakes / totalWords) * 100);
        
            // Display results
            $("#wpm").text(`WPM: ${wpm}`);
            $("#accuracy").text(`Accuracy: ${accuracy}%`);
            $("#errorRate").text(`Error Rate: ${errorRate}%`);
        
            // Get the completion time from the timer displayed on the card
            const completionTime = $("#counter").text();
            $("#completionTime").text(`Completion Time: ${completionTime}`);
        
            // Show the result modal
            $("#exampleModal").modal("show");
        
            // Update chart with actual data
            if (this.myChart) {
                this.myChart.data.labels.push(this.myChart.data.labels.length + 1); // Add a new label
                this.myChart.data.datasets[0].data.push(wpm); // Add a new data point
                this.myChart.update(); // Update the chart
            } else {
                const ctx = document.getElementById('wpmChart').getContext('2d');
                this.myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['1'], // Initial label
                        datasets: [{
                            label: 'WPM Over Time',
                            data: [wpm], // Initial data point
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            tension: 0.1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
            $.ajax({
                url: '/rounds',
                type: 'POST',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {
                    quote: $("#quote").text(),
                    author: $("#author").text(),
                    level: $('input[name="levels"]:checked').attr("id"),
                    wpm: wpm,
                    accuracy: accuracy,
                    error_rate: errorRate,
                    completion_time: completionTime
                },
                
                success: function(response) {
                    console.log('Game result saved successfully');
                },
                error: function(xhr, status, error) {
                    console.error('Error saving game result:', error);
                }
            });
        }

        closeResultModal() {
            $("#exampleModal").modal("hide");
        }

        startTimer() {
            let timer = 0; // Timer starts from 0
            this.timerInterval = setInterval(() => {
                const minutes = Math.floor(timer / 60);
                const seconds = timer % 60;
                $("#counter").text(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
                timer++;
            }, 1000);
        }
    }

    // Create an instance of TyperGame
    const typerGame = new TyperGame();
});
