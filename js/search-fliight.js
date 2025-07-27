document.addEventListener('DOMContentLoaded', function() {
    // Get search parameters from storage
    const searchParams = JSON.parse(localStorage.getItem('searchParams'));
    
    if (!searchParams) {
        window.location.href = '../pages/flight.html';
        return;
    }
    
    // Update the search details display
    document.querySelector('.search-details').innerHTML = `
        <div>
            <span>${searchParams.departure}</span>
            <i class="fas fa-arrow-right"></i>
            <span>${searchParams.arrival}</span>
        </div>
        <div>${formatDate(searchParams.departureDate)} • 
              ${getPassengerText(searchParams.passengers)} • 
              ${formatClass(searchParams.cabinClass)}</div>
    `;
    
    // Fetch and display flight results
    fetchFlights(searchParams);
});

function fetchFlights(params) {
    // In a real app, this would be an API call
    // For demo, we'll use mock data
    const mockFlights = [
        {
            id: 1,
            airline: "Ethiopian Airlines",
            flightNumber: "ET 701",
            departure: "08:30",
            arrival: "10:45",
            duration: "2h 15m",
            price: 450,
            stops: 0
        },
        // More flight data...
    ];
    
    displayFlights(mockFlights);
}

function displayFlights(flights) {
    const container = document.getElementById('flightResults');
    
    if (flights.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-plane-slash"></i>
                <p>No flights found matching your criteria</p>
                <button class="modify-search">Modify Search</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = flights.map(flight => `
        <div class="flight-card">
            <div class="flight-header">
                <div class="airline-info">
                    <div class="airline-logo">${flight.airline.substring(0,2)}</div>
                    <div>
                        <div class="airline-name">${flight.airline}</div>
                        <div class="flight-number">${flight.flightNumber}</div>
                    </div>
                </div>
                <div class="flight-price">$${flight.price}</div>
            </div>
            <div class="flight-details">
                <!-- Flight details here -->
            </div>
            <button class="book-btn">Select</button>
        </div>
    `).join('');
}

// Helper functions
function formatDate(dateString) {
    // Format date for display
}

function getPassengerText(count) {
    return count === "1" ? "1 Adult" : `${count} Adults`;
}

function formatClass(cabinClass) {
    return cabinClass.charAt(0).toUpperCase() + cabinClass.slice(1);
}