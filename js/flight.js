document.addEventListener('DOMContentLoaded', function() {
    // Flight data
    const flights = [
        {
            id: 'ET701',
            airline: 'Ethiopian Airlines',
            logo: 'https://logo.clearbit.com/ethiopianairlines.com',
            departure: 'ADD',
            arrival: 'JFK',
            departureTime: '08:00',
            arrivalTime: '16:30',
            duration: '12h 30m',
            price: 1200,
            date: '2023-12-15',
            seats: {
                firstClass: 12,
                businessClass: 24,
                economy: 120
            }
        },
        {
            id: 'ET702',
            airline: 'Ethiopian Airlines',
            logo: 'https://logo.clearbit.com/ethiopianairlines.com',
            departure: 'ADD',
            arrival: 'LHR',
            departureTime: '10:30',
            arrivalTime: '18:45',
            duration: '7h 15m',
            price: 980,
            date: '2023-12-15',
            seats: {
                firstClass: 8,
                businessClass: 20,
                economy: 150
            }
        },
        {
            id: 'QR703',
            airline: 'Qatar Airways',
            logo: 'https://logo.clearbit.com/qatarairways.com',
            departure: 'ADD',
            arrival: 'DXB',
            departureTime: '14:15',
            arrivalTime: '19:30',
            duration: '5h 15m',
            price: 750,
            date: '2023-12-15',
            seats: {
                firstClass: 10,
                businessClass: 30,
                economy: 140
            }
        }
    ];

    // DOM Elements
    const flightCardsContainer = document.querySelector('.flight-cards');
    const seatSelectionSection = document.querySelector('.seat-selection');
    const bookingSummarySection = document.querySelector('.booking-summary');
    const confirmationSection = document.querySelector('.confirmation');
    const searchForm = document.querySelector('.search-form');
    const confirmSeatsBtn = document.querySelector('.confirm-seats-btn');
    const bookNowBtn = document.querySelector('.book-now-btn');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const creditCardForm = document.querySelector('.credit-card-form');
    const paypalForm = document.querySelector('.paypal-form');
    const totalAmount = document.getElementById('total-amount');
    
    // Current booking state
    let currentFlight = null;
    let selectedSeats = [];
    let totalPrice = 0;

    // Initialize the page
    function init() {
        renderFlightCards(flights);
        setupEventListeners();
    }

    // Render flight cards
    function renderFlightCards(flights) {
        flightCardsContainer.innerHTML = '';
        
        flights.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'flight-card';
            flightCard.innerHTML = `
                <div class="flight-header">
                    <span class="flight-id">${flight.id}</span>
                    <span class="flight-price">$${flight.price}</span>
                </div>
                <div class="flight-body">
                    <div class="flight-details">
                        <div class="flight-departure">
                            <div class="flight-time">${flight.departureTime}</div>
                            <div class="flight-airport">${flight.departure}</div>
                        </div>
                        <div class="flight-duration">${flight.duration}</div>
                        <div class="flight-arrival">
                            <div class="flight-time">${flight.arrivalTime}</div>
                            <div class="flight-airport">${flight.arrival}</div>
                        </div>
                    </div>
                    <div class="flight-airline">
                        <img src="${flight.logo}" alt="${flight.airline}" class="airline-logo">
                        <span>${flight.airline}</span>
                    </div>
                </div>
                <button class="book-btn" data-flight-id="${flight.id}">Book Now</button>
            `;
            flightCardsContainer.appendChild(flightCard);
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Search form submission
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // In a real app, you would filter flights based on search criteria
                // For demo, we'll just show all flights
                renderFlightCards(flights);
            });
        }

        // Book now buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('book-btn')) {
                const flightId = e.target.getAttribute('data-flight-id');
                currentFlight = flights.find(flight => flight.id === flightId);
                showSeatSelection();
                generateSeats();
            }
        });

        // Confirm seats button
        if (confirmSeatsBtn) {
            confirmSeatsBtn.addEventListener('click', function() {
                if (selectedSeats.length === 0) {
                    alert('Please select at least one seat');
                    return;
                }
                showBookingSummary();
                updateTotalPrice();
            });
        }

        // Book now button in summary
        if (bookNowBtn) {
            bookNowBtn.addEventListener('click', function() {
                // In a real app, you would process payment here
                showConfirmation();
            });
        }

        // Payment method selection
        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                paymentMethods.forEach(m => m.classList.remove('active'));
                this.classList.add('active');
                
                if (this.getAttribute('data-method') === 'credit') {
                    creditCardForm.classList.remove('hidden');
                    paypalForm.classList.add('hidden');
                } else {
                    creditCardForm.classList.add('hidden');
                    paypalForm.classList.remove('hidden');
                }
            });
        });
    }

    // Show seat selection section
    function showSeatSelection() {
        document.querySelector('.flight-results').classList.add('hidden');
        seatSelectionSection.classList.remove('hidden');
    }

    // Generate seats for the airplane
    function generateSeats() {
        const seatClasses = [
            { id: 'first-class', count: currentFlight.seats.firstClass, price: 500 },
            { id: 'business-class', count: currentFlight.seats.businessClass, price: 300 },
            { id: 'economy-class', count: currentFlight.seats.economy, price: 100 },
            { id: 'exit-row', count: 8, price: 150 }
        ];

        seatClasses.forEach(seatClass => {
            const container = document.getElementById(seatClass.id);
            container.innerHTML = '';
            
            for (let i = 1; i <= seatClass.count; i++) {
                const seat = document.createElement('div');
                seat.className = 'seat available';
                seat.textContent = i;
                seat.setAttribute('data-class', seatClass.id);
                seat.setAttribute('data-price', seatClass.price);
                
                // Randomly book some seats for demo
                if (Math.random() > 0.7) {
                    seat.classList.remove('available');
                    seat.classList.add('booked');
                } else {
                    seat.addEventListener('click', function() {
                        toggleSeatSelection(this);
                    });
                }
                
                container.appendChild(seat);
            }
        });
    }

    // Toggle seat selection
    function toggleSeatSelection(seat) {
        const seatClass = seat.getAttribute('data-class');
        const seatPrice = parseInt(seat.getAttribute('data-price'));
        const seatNumber = seat.textContent;
        const seatId = `${seatClass}-${seatNumber}`;
        
        if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            selectedSeats = selectedSeats.filter(s => s.id !== seatId);
        } else {
            seat.classList.add('selected');
            selectedSeats.push({
                id: seatId,
                class: seatClass,
                number: seatNumber,
                price: seatPrice
            });
        }
    }

    // Show booking summary
    function showBookingSummary() {
        seatSelectionSection.classList.add('hidden');
        bookingSummarySection.classList.remove('hidden');
        
        // Update flight info
        const flightInfo = document.querySelector('.flight-info');
        flightInfo.innerHTML = `
            <h3>Flight Details</h3>
            <p><strong>Flight:</strong> ${currentFlight.id} (${currentFlight.airline})</p>
            <p><strong>Route:</strong> ${currentFlight.departure} → ${currentFlight.arrival}</p>
            <p><strong>Date:</strong> ${currentFlight.date}</p>
            <p><strong>Departure:</strong> ${currentFlight.departureTime}</p>
            <p><strong>Arrival:</strong> ${currentFlight.arrivalTime}</p>
            <p><strong>Duration:</strong> ${currentFlight.duration}</p>
            <h4>Selected Seats</h4>
            <ul class="selected-seats">
                ${selectedSeats.map(seat => `
                    <li>${seat.class.replace('-', ' ')} - Seat ${seat.number} ($${seat.price})</li>
                `).join('')}
            </ul>
        `;
    }

    // Update total price
    function updateTotalPrice() {
        totalPrice = currentFlight.price;
        selectedSeats.forEach(seat => {
            totalPrice += seat.price;
        });
        totalAmount.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Show confirmation
    function showConfirmation() {
        bookingSummarySection.classList.add('hidden');
        confirmationSection.classList.remove('hidden');
        
        // Update confirmation details
        const bookingDetails = document.querySelector('.booking-details');
        bookingDetails.innerHTML = `
            <p><strong>Booking Reference:</strong> ${generateBookingReference()}</p>
            <p><strong>Flight:</strong> ${currentFlight.id} (${currentFlight.airline})</p>
            <p><strong>Route:</strong> ${currentFlight.departure} → ${currentFlight.arrival}</p>
            <p><strong>Date:</strong> ${currentFlight.date}</p>
            <p><strong>Departure:</strong> ${currentFlight.departureTime}</p>
            <p><strong>Passenger:</strong> ${document.getElementById('full-name').value}</p>
            <p><strong>Seats:</strong> ${selectedSeats.map(s => `${s.class.replace('-', ' ')} ${s.number}`).join(', ')}</p>
            <p><strong>Total Paid:</strong> $${totalPrice.toFixed(2)}</p>
        `;
    }

    // Generate random booking reference
    function generateBookingReference() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Initialize the app
    init();
});