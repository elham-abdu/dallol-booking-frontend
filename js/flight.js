document.addEventListener('DOMContentLoaded', function() {
    // Airport data
    const airports = [
        { code: "ADD", name: "Addis Ababa Bole International Airport", city: "Addis Ababa", country: "Ethiopia" },
        { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "UAE" },
        { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "USA" },
        { code: "LHR", name: "Heathrow Airport", city: "London", country: "UK" },
        { code: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "China" }
    ];

    // Flight data (mock)
    const flightData = [
        {
            id: 1,
            airline: "Ethiopian Airlines",
            airlineCode: "ET",
            flightNumber: "ET 701",
            departureTime: "08:30",
            arrivalTime: "10:45",
            duration: "2h 15m",
            stops: 0,
            price: 450,
            departureAirport: "ADD",
            arrivalAirport: "DXB",
            departureDate: "2023-12-15",
            aircraft: "Boeing 787"
        },
        {
            id: 2,
            airline: "Emirates",
            airlineCode: "EK",
            flightNumber: "EK 123",
            departureTime: "11:20",
            arrivalTime: "14:35",
            duration: "3h 15m",
            stops: 1,
            price: 520,
            departureAirport: "ADD",
            arrivalAirport: "DXB",
            departureDate: "2023-12-15",
            aircraft: "Airbus A380"
        },
        // Add more flights as needed
    ];

    // DOM Elements
    const flightForm = document.getElementById('flight-form');
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    const fromSuggestions = document.getElementById('from-suggestions');
    const toSuggestions = document.getElementById('to-suggestions');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const returnDateGroup = document.getElementById('return-date-group');
    const departureInput = document.getElementById('departure');
    const returnInput = document.getElementById('return');
    const decreasePassengers = document.getElementById('decrease-passengers');
    const increasePassengers = document.getElementById('increase-passengers');
    const passengersInput = document.getElementById('passengers');
    const flightList = document.getElementById('flight-list');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const sortButtons = document.querySelectorAll('.sort-btn');

    // Initialize
    function init() {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        departureInput.min = today;
        returnInput.min = today;

        // Event listeners
        setupEventListeners();
    }

    // Setup all event listeners
    function setupEventListeners() {
        // Tab switching
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                if (button.dataset.tab === 'round-trip') {
                    returnDateGroup.style.display = 'block';
                    returnInput.required = true;
                } else {
                    returnDateGroup.style.display = 'none';
                    returnInput.required = false;
                }
            });
        });

        // Airport autocomplete
        fromInput.addEventListener('input', () => showSuggestions(fromInput, fromSuggestions));
        toInput.addEventListener('input', () => showSuggestions(toInput, toSuggestions));

        // Handle suggestion selection
        fromSuggestions.addEventListener('click', (e) => handleSuggestionClick(e, fromInput));
        toSuggestions.addEventListener('click', (e) => handleSuggestionClick(e, toInput));

        // Passenger counter
        decreasePassengers.addEventListener('click', () => {
            let value = parseInt(passengersInput.value);
            if (value > 1) passengersInput.value = value - 1;
        });

        increasePassengers.addEventListener('click', () => {
            let value = parseInt(passengersInput.value);
            if (value < 9) passengersInput.value = value + 1;
        });

        // Price range display
        priceRange.addEventListener('input', () => {
            priceValue.textContent = priceRange.value;
        });

        // Sort buttons
        sortButtons.forEach(button => {
            button.addEventListener('click', () => {
                sortButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                sortFlights(button.dataset.sort);
            });
        });

        // Form submission
        flightForm.addEventListener('submit', function(e) {
            e.preventDefault();
            searchFlights();
        });
    }

    // Show airport suggestions
    function showSuggestions(input, suggestionsContainer) {
        const value = input.value.toLowerCase();
        if (value.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        const matches = airports.filter(airport => 
            airport.city.toLowerCase().includes(value) || 
            airport.name.toLowerCase().includes(value) ||
            airport.code.toLowerCase().includes(value)
        );

        if (matches.length > 0) {
            suggestionsContainer.innerHTML = matches.map(airport => `
                <div data-code="${airport.code}">
                    <strong>${airport.city}</strong> (${airport.code})<br>
                    <small>${airport.name}</small>
                </div>
            `).join('');
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }

    // Handle suggestion selection
    function handleSuggestionClick(e, inputField) {
        let suggestion;
        if (e.target.tagName === 'DIV') {
            suggestion = e.target;
        } else if (e.target.parentElement.tagName === 'DIV') {
            suggestion = e.target.parentElement;
        } else {
            return;
        }

        const code = suggestion.getAttribute('data-code');
        const airport = airports.find(a => a.code === code);
        inputField.value = `${airport.city} (${airport.code})`;
        document.getElementById(`${inputField.id}-suggestions`).style.display = 'none';
    }

    // Search flights
    function searchFlights() {
        // Validate form
        if (!fromInput.value || !toInput.value) {
            alert('Please select departure and arrival airports');
            return;
        }

        if (fromInput.value === toInput.value) {
            alert('Departure and arrival airports cannot be the same');
            return;
        }

        if (!departureInput.value) {
            alert('Please select a departure date');
            return;
        }

        // Get selected filters
        const maxPrice = parseInt(priceRange.value);
        const selectedAirlines = Array.from(
            document.querySelectorAll('input[name="airline"]:checked')
        ).map(el => el.value);
        
        const selectedStops = Array.from(
            document.querySelectorAll('input[name="stops"]:checked')
        ).map(el => parseInt(el.value));

        // Filter flights (in a real app, this would be an API call)
        const filteredFlights = flightData.filter(flight => {
            return flight.price <= maxPrice &&
                   selectedAirlines.includes(flight.airlineCode.toLowerCase()) &&
                   (selectedStops.includes(flight.stops) || 
                    (flight.stops >= 2 && selectedStops.includes(2)));
        });

        // Display results
        if (filteredFlights.length === 0) {
            flightList.innerHTML = '<div class="no-flights">No flights found matching your criteria</div>';
        } else {
            displayFlights(filteredFlights);
        }
    }

    // Display flights
    function displayFlights(flights) {
        flightList.innerHTML = '';

        flights.forEach(flight => {
            const flightElement = document.createElement('div');
            flightElement.className = 'flight-card';
            flightElement.innerHTML = `
                <div class="flight-info">
                    <div class="flight-header">
                        <div class="airline">
                            <div class="airline-logo">${flight.airlineCode}</div>
                            <span>${flight.airline}</span>
                        </div>
                        <div class="flight-price">$${flight.price}</div>
                    </div>
                    <div class="flight-details">
                        <div class="flight-time">
                            <span>${flight.departureTime}</span>
                            <span>${flight.departureAirport}</span>
                        </div>
                        <div class="flight-duration">
                            <span>${flight.duration}</span>
                            <div class="flight-route">
                                <div class="flight-route-line"></div>
                            </div>
                            <span class="flight-stops">${flight.stops === 0 ? 'Non-stop' : flight.stops === 1 ? '1 Stop' : `${flight.stops} Stops`}</span>
                        </div>
                        <div class="flight-time">
                            <span>${flight.arrivalTime}</span>
                            <span>${flight.arrivalAirport}</span>
                        </div>
                    </div>
                </div>
                <div class="flight-action">
                    <button class="book-btn">Book Now</button>
                </div>
            `;
            flightList.appendChild(flightElement);
        });

        // Add event listeners to book buttons
        document.querySelectorAll('.book-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const flightCard = this.closest('.flight-card');
                const flightId = flightCard.dataset.id;
                // In a real app, you would redirect to booking page or show modal
                alert('Booking functionality would go here');
            });
        });
    }

    // Sort flights
    function sortFlights(sortBy) {
        const flightCards = Array.from(document.querySelectorAll('.flight-card'));
        if (flightCards.length === 0) return;
        
        flightCards.sort((a, b) => {
            const aPrice = parseInt(a.querySelector('.flight-price').textContent.replace(/\D/g, ''));
            const bPrice = parseInt(b.querySelector('.flight-price').textContent.replace(/\D/g, ''));
            
            const aDuration = a.querySelector('.flight-duration').textContent;
            const bDuration = b.querySelector('.flight-duration').textContent;
            
            const aTime = a.querySelector('.flight-time span').textContent;
            const bTime = b.querySelector('.flight-time span').textContent;
            
            switch(sortBy) {
                case 'price': return aPrice - bPrice;
                case 'duration': 
                    return convertDurationToMinutes(aDuration) - convertDurationToMinutes(bDuration);
                case 'departure': return aTime.localeCompare(bTime);
                default: return 0;
            }
        });

        // Re-append sorted flights
        flightList.innerHTML = '';
        flightCards.forEach(card => flightList.appendChild(card));
    }

    // Helper function to convert duration to minutes
    function convertDurationToMinutes(duration) {
        const [hours, minutes] = duration.split('h ').map(part => parseInt(part));
        return hours * 60 + (minutes || 0);
    }

    // Initialize the page
    init();
});