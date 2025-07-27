document.addEventListener('DOMContentLoaded', function() {
    // In a real app, you would fetch bookings from your backend
    // For demo purposes, we'll use mock data
    
    const bookings = [
        {
            id: 'BK123456',
            type: 'flight',
            airline: 'Ethiopian Airlines',
            flightNumber: 'ET 123',
            departure: {
                airport: 'ADD',
                time: '2023-12-15T08:30:00',
                terminal: 'T2',
                city: 'Addis Ababa',
                country: 'Ethiopia'
            },
            arrival: {
                airport: 'DXB',
                time: '2023-12-15T10:45:00',
                terminal: 'T1',
                city: 'Dubai',
                country: 'UAE'
            },
            duration: '2h 15m',
            passengers: [
                {
                    name: 'John Doe',
                    seat: '12A',
                    mealPreference: 'Vegetarian',
                    passport: 'AB123456'
                },
                {
                    name: 'Jane Doe',
                    seat: '12B',
                    mealPreference: 'Non-vegetarian',
                    passport: 'AB654321'
                }
            ],
            status: 'confirmed',
            bookingDate: '2023-11-10T14:30:00',
            price: 900,
            class: 'economy',
            paymentMethod: 'Credit Card (**** 1234)',
            baggageAllowance: '2 x 23kg checked, 1 x 7kg cabin'
        },
        {
            id: 'BK789012',
            type: 'flight',
            airline: 'Emirates',
            flightNumber: 'EK 456',
            departure: {
                airport: 'DXB',
                time: '2023-10-10T15:30:00',
                terminal: 'T3',
                city: 'Dubai',
                country: 'UAE'
            },
            arrival: {
                airport: 'ADD',
                time: '2023-10-10T20:45:00',
                terminal: 'T2',
                city: 'Addis Ababa',
                country: 'Ethiopia'
            },
            duration: '4h 15m',
            passengers: [
                {
                    name: 'John Doe',
                    seat: '24F',
                    mealPreference: 'Vegetarian',
                    passport: 'AB123456'
                }
            ],
            status: 'completed',
            bookingDate: '2023-09-05T10:15:00',
            price: 850,
            class: 'premium',
            paymentMethod: 'Credit Card (**** 1234)',
            baggageAllowance: '2 x 32kg checked, 1 x 7kg cabin'
        },
        {
            id: 'BK345678',
            type: 'flight',
            airline: 'Qatar Airways',
            flightNumber: 'QR 789',
            departure: {
                airport: 'ADD',
                time: '2023-09-01T10:00:00',
                terminal: 'T1',
                city: 'Addis Ababa',
                country: 'Ethiopia'
            },
            arrival: {
                airport: 'DOH',
                time: '2023-09-01T14:30:00',
                terminal: 'T1',
                city: 'Doha',
                country: 'Qatar'
            },
            duration: '3h 30m',
            passengers: [
                {
                    name: 'John Doe',
                    seat: '8C',
                    mealPreference: 'Vegetarian',
                    passport: 'AB123456'
                }
            ],
            status: 'cancelled',
            bookingDate: '2023-08-15T16:45:00',
            price: 750,
            class: 'business',
            paymentMethod: 'Credit Card (**** 1234)',
            cancellationDate: '2023-08-20T11:30:00',
            refundStatus: 'Processed'
        }
    ];
    
    const bookingsList = document.getElementById('bookings-list');
    const tabButtons = document.querySelectorAll('.bookings-tabs .tab-btn');
    const bookingModal = document.getElementById('bookingModal');
    const bookingModalContent = document.getElementById('bookingModalContent');
    
    // Load bookings
    function loadBookings(filter = 'upcoming') {
        const filteredBookings = bookings.filter(booking => {
            if (filter === 'upcoming') {
                return booking.status === 'confirmed' && 
                       new Date(booking.departure.time) > new Date();
            } else if (filter === 'past') {
                return booking.status !== 'cancelled' && 
                       new Date(booking.departure.time) <= new Date();
            } else if (filter === 'cancelled') {
                return booking.status === 'cancelled';
            }
            return true;
        });
        
        if (filteredBookings.length === 0) {
            bookingsList.innerHTML = `
                <div class="no-bookings">
                    <i class="fas fa-suitcase-rolling"></i>
                    <p>You don't have any ${filter} bookings yet</p>
                    <a href="../pages/flight.html" class="search-flights-btn">Search Flights</a>
                </div>
            `;
            return;
        }
        
        bookingsList.innerHTML = '';
        
        filteredBookings.forEach(booking => {
            const bookingElement = createBookingElement(booking);
            bookingsList.appendChild(bookingElement);
        });
    }
    
    function createBookingElement(booking) {
        const element = document.createElement('div');
        element.className = 'booking-card';
        
        const departureDate = new Date(booking.departure.time);
        const arrivalDate = new Date(booking.arrival.time);
        const bookingDate = new Date(booking.bookingDate);
        
        // Format dates
        const formatDate = (date) => {
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        };
        
        const formatTime = (date) => {
            return date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        };
        
        element.innerHTML = `
            <div class="booking-header">
                <div class="booking-id">Booking #${booking.id}</div>
                <div class="booking-date">Booked on ${formatDate(bookingDate)} at ${formatTime(bookingDate)}</div>
                <div class="booking-status ${booking.status}">${booking.status.toUpperCase()}</div>
            </div>
            
            <div class="booking-details">
                <div class="flight-info">
                    <div class="airline-logo">${booking.airline.substring(0, 2)}</div>
                    <div class="airline-name">${booking.airline}</div>
                    <div class="flight-number">${booking.flightNumber}</div>
                </div>
                
                <div class="flight-route">
                    <div class="departure">
                        <div class="time">${formatTime(departureDate)}</div>
                        <div class="date">${formatDate(departureDate)}</div>
                        <div class="airport">${booking.departure.airport} (Terminal ${booking.departure.terminal})</div>
                        <div class="city">${booking.departure.city}, ${booking.departure.country}</div>
                    </div>
                    
                    <div class="duration">
                        <div class="flight-route-line"></div>
                        <div class="duration-text">${booking.duration}</div>
                    </div>
                    
                    <div class="arrival">
                        <div class="time">${formatTime(arrivalDate)}</div>
                        <div class="date">${formatDate(arrivalDate)}</div>
                        <div class="airport">${booking.arrival.airport} (Terminal ${booking.arrival.terminal})</div>
                        <div class="city">${booking.arrival.city}, ${booking.arrival.country}</div>
                    </div>
                </div>
                
                <div class="booking-summary">
                    <div class="seats">
                        <strong>Passengers:</strong> ${booking.passengers.length}
                    </div>
                    <div class="class">
                        <strong>Class:</strong> ${booking.class.charAt(0).toUpperCase() + booking.class.slice(1)}
                    </div>
                    <div class="price">
                        <strong>Total:</strong> $${booking.price}
                    </div>
                </div>
            </div>
            
            <div class="booking-actions">
                ${booking.status === 'confirmed' && new Date(booking.departure.time) > new Date() ? 
                    `<button class="cancel-btn" aria-label="Cancel booking ${booking.id}">Cancel Booking</button>` : ''}
                <button class="details-btn" aria-label="View details for booking ${booking.id}">View Details</button>
            </div>
        `;
        
        // Add event listeners to buttons
        const detailsBtn = element.querySelector('.details-btn');
        detailsBtn.addEventListener('click', () => showBookingDetails(booking));
        
        if (booking.status === 'confirmed' && new Date(booking.departure.time) > new Date()) {
            const cancelBtn = element.querySelector('.cancel-btn');
            cancelBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to cancel this booking?')) {
                    cancelBooking(booking.id);
                }
            });
        }
        
        return element;
    }
    
    function showBookingDetails(booking) {
        const departureDate = new Date(booking.departure.time);
        const arrivalDate = new Date(booking.arrival.time);
        const bookingDate = new Date(booking.bookingDate);
        
        // Format dates
        const formatDateTime = (date) => {
            return date.toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        };
        
        bookingModalContent.innerHTML = `
            <div class="booking-details-modal">
                <h3>Flight Information</h3>
                <div class="detail-row">
                    <div class="detail-label">Booking Reference:</div>
                    <div class="detail-value">${booking.id}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Status:</div>
                    <div class="detail-value"><span class="booking-status ${booking.status}">${booking.status.toUpperCase()}</span></div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Airline:</div>
                    <div class="detail-value">${booking.airline} (${booking.flightNumber})</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Class:</div>
                    <div class="detail-value">${booking.class.charAt(0).toUpperCase() + booking.class.slice(1)}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Baggage Allowance:</div>
                    <div class="detail-value">${booking.baggageAllowance}</div>
                </div>
                
                <h3>Flight Schedule</h3>
                <div class="detail-row">
                    <div class="detail-label">Departure:</div>
                    <div class="detail-value">
                        ${formatDateTime(departureDate)}<br>
                        ${booking.departure.airport} (Terminal ${booking.departure.terminal})<br>
                        ${booking.departure.city}, ${booking.departure.country}
                    </div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Arrival:</div>
                    <div class="detail-value">
                        ${formatDateTime(arrivalDate)}<br>
                        ${booking.arrival.airport} (Terminal ${booking.arrival.terminal})<br>
                        ${booking.arrival.city}, ${booking.arrival.country}
                    </div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Duration:</div>
                    <div class="detail-value">${booking.duration}</div>
                </div>
                
                <h3>Passenger Details</h3>
                <ul class="passenger-list">
                    ${booking.passengers.map(passenger => `
                        <li>
                            <strong>${passenger.name}</strong><br>
                            Seat: ${passenger.seat}<br>
                            Meal: ${passenger.mealPreference}<br>
                            Passport: ${passenger.passport}
                        </li>
                    `).join('')}
                </ul>
                
                <h3>Payment Information</h3>
                <div class="detail-row">
                    <div class="detail-label">Total Amount:</div>
                    <div class="detail-value">$${booking.price}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Payment Method:</div>
                    <div class="detail-value">${booking.paymentMethod}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Booking Date:</div>
                    <div class="detail-value">${formatDateTime(bookingDate)}</div>
                </div>
                
                ${booking.status === 'cancelled' ? `
                    <h3>Cancellation Details</h3>
                    <div class="detail-row">
                        <div class="detail-label">Cancellation Date:</div>
                        <div class="detail-value">${formatDateTime(new Date(booking.cancellationDate))}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Refund Status:</div>
                        <div class="detail-value">${booking.refundStatus}</div>
                    </div>
                ` : ''}
            </div>
        `;
        
        bookingModal.style.display = 'block';
        document.getElementById('bookingModalTitle').textContent = `Booking #${booking.id} Details`;
    }
    
    function cancelBooking(bookingId) {
        // In a real app, you would make an API call to cancel the booking
        // For demo, we'll just update the local data
        const bookingIndex = bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex !== -1) {
            bookings[bookingIndex].status = 'cancelled';
            bookings[bookingIndex].cancellationDate = new Date().toISOString();
            bookings[bookingIndex].refundStatus = 'Processing';
            
            // Reload the bookings
            const activeTab = document.querySelector('.bookings-tabs .tab-btn.active');
            loadBookings(activeTab.dataset.tab);
            
            // Show confirmation
            alert('Your booking has been cancelled. Refund will be processed within 5-7 business days.');
        }
    }
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            loadBookings(button.dataset.tab);
        });
    });
    
    // Modal close button
    document.querySelector('.close-modal').addEventListener('click', () => {
        bookingModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookingModal.style.display === 'block') {
            bookingModal.style.display = 'none';
        }
    });
    
    // Initial load
    loadBookings();
});