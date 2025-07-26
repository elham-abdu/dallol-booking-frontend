// Flight data (mock data for demonstration)
const flightData = [
    {
        id: 1,
        airline: "Ethiopian Airlines",
        airlineCode: "ET",
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
    // ... (rest of your flight data remains the same)
];

// DOM Elements
const flightForm = document.getElementById('flight-form');
const flightList = document.getElementById('flight-list');
const tabButtons = document.querySelectorAll('.tab-btn');
const sortButtons = document.querySelectorAll('.sort-btn');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const returnDateGroup = document.getElementById('return-date-group');

// Initialize the page
function initFlightPage() {
    // Set up event listeners
    setupEventListeners();
    
    // Hide return date by default (for one-way trips)
    returnDateGroup.style.display = 'none';
    
    // Initialize price range display
    updatePriceRange();
    
    // Set default departure date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departure').value = today;
    document.getElementById('departure').min = today;
}

// Set up all event listeners
function setupEventListeners() {
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show/hide return date based on tab
            if (button.dataset.tab === 'round-trip') {
                returnDateGroup.style.display = 'block';
                // Set minimum return date to departure date
                const departureDate = document.getElementById('departure').value;
                if (departureDate) {
                    document.getElementById('return').min = departureDate;
                }
            } else {
                returnDateGroup.style.display = 'none';
            }
        });
    });
    
    // Update return date min when departure date changes
    document.getElementById('departure').addEventListener('change', function() {
        if (returnDateGroup.style.display !== 'none') {
            document.getElementById('return').min = this.value;
        }
    });
    
    // Form submission
    if (flightForm) {
        flightForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                searchFlights();
            } catch (error) {
                console.error('Search error:', error);
                flightList.innerHTML = '<div class="no-flights">Error searching for flights. Please try again.</div>';
            }
        });
    }
    
    // Sort buttons
    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            sortButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            sortFlights(button.dataset.sort);
        });
    });
    
    // Price range filter
    if (priceRange) {
        priceRange.addEventListener('input', updatePriceRange);
    }
}

// Update price range display
function updatePriceRange() {
    if (priceValue) {
        priceValue.textContent = priceRange.value;
    }
}

// Validate search form
function validateSearchForm() {
    const from = document.getElementById('from').value.trim();
    const to = document.getElementById('to').value.trim();
    const departureDate = document.getElementById('departure').value;
    
    if (!from || !to) {
        throw new Error('Please enter both departure and arrival locations');
    }
    
    if (from === to) {
        throw new Error('Departure and arrival locations cannot be the same');
    }
    
    if (!departureDate) {
        throw new Error('Please select a departure date');
    }
    
    if (returnDateGroup.style.display !== 'none') {
        const returnDate = document.getElementById('return').value;
        if (!returnDate) {
            throw new Error('Please select a return date');
        }
        if (returnDate < departureDate) {
            throw new Error('Return date cannot be before departure date');
        }
    }
}

// Search flights (mock implementation)
function searchFlights() {
    try {
        // Validate form first
        validateSearchForm();
        
        // Get filter values
        const maxPrice = parseInt(priceRange.value);
        const selectedAirlines = Array.from(
            document.querySelectorAll('input[name="airline"]:checked')
        ).map(el => el.value);
        
        const selectedStops = Array.from(
            document.querySelectorAll('input[name="stops"]:checked')
        ).map(el => parseInt(el.value));
        
        // Filter flights
        let filteredFlights = flightData.filter(flight => {
            return flight.price <= maxPrice &&
                   selectedAirlines.includes(flight.airlineCode.toLowerCase()) &&
                   (selectedStops.includes(flight.stops) || 
                    (flight.stops >= 2 && selectedStops.includes(2)));
        });
        
        // Display results
        if (filteredFlights.length === 0) {
            displayNoFlightsMessage();
        } else {
            displayFlights(filteredFlights);
        }
    } catch (error) {
        displayErrorMessage(error.message);
        throw error; // Re-throw for the form handler
    }
}

// Display error message
function displayErrorMessage(message) {
    flightList.innerHTML = `<div class="no-flights">${message}</div>`;
}

// Display no flights message
function displayNoFlightsMessage() {
    flightList.innerHTML = `
        <div class="no-flights">
            <p>No flights found matching your criteria</p>
            <button class="retry-btn" onclick="searchFlights()">Try Again</button>
        </div>
    `;
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
            case 'price':
                return aPrice - bPrice;
            case 'duration':
                return convertDurationToMinutes(aDuration) - convertDurationToMinutes(bDuration);
            case 'departure':
                return aTime.localeCompare(bTime);
            default:
                return 0;
        }
    });
    
    // Re-append sorted flights
    flightList.innerHTML = '';
    flightCards.forEach(card => flightList.appendChild(card));
}

// Helper function to convert duration string to minutes
function convertDurationToMinutes(duration) {
    const [hours, minutes] = duration.split('h ').map(part => parseInt(part));
    return hours * 60 + (minutes || 0);
}

// Display flights in the UI
function displayFlights(flights) {
    flightList.innerHTML = '';
    
    flights.forEach(flight => {
        const flightCard = document.createElement('div');
        flightCard.className = 'flight-card';
        flightCard.dataset.id = flight.id;
        
        flightCard.innerHTML = `
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
        
        flightList.appendChild(flightCard);
    });
    
    // Add event listeners to book buttons
    document.querySelectorAll('.book-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const flightCard = this.closest('.flight-card');
            const flightId = flightCard.dataset.id;
            const flight = flightData.find(f => f.id == flightId);
            
            if (flight) {
                alert(`Booking ${flight.airline} flight from ${flight.departureAirport} to ${flight.arrivalAirport} for $${flight.price}`);
                // In a real app, redirect to booking page:
                // window.location.href = `booking.html?flightId=${flightId}`;
            }
        });
    });
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initFlightPage);