document.addEventListener('DOMContentLoaded', function() {
    // Sample cab data
    const availableCabs = [
        {
            id: 1,
            type: "Standard",
            image: "../images/cab-1.jpg",
            driver: {
                name: "Michael Abebe",
                avatar: "../images/driver-1.jpg",
                rating: 4.7,
                rides: 256
            },
            vehicle: "Toyota Corolla (Blue)",
            license: "A7890",
            distance: "0.5 km away",
            eta: "3 min",
            price: "$4.25"
        },
        {
            id: 2,
            type: "Premium",
            image: "../images/cab-2.jpg",
            driver: {
                name: "Selamawit Kebede",
                avatar: "../images/driver-2.jpg",
                rating: 4.9,
                rides: 412
            },
            vehicle: "Hyundai Elantra (Black)",
            license: "B4567",
            distance: "1.2 km away",
            eta: "5 min",
            price: "$6.80"
        },
        {
            id: 3,
            type: "XL",
            image: "../images/cab-3.jpg",
            driver: {
                name: "Yohannes Tesfaye",
                avatar: "../images/driver-3.jpg",
                rating: 4.5,
                rides: 187
            },
            vehicle: "Toyota Hiace (White)",
            license: "C1234",
            distance: "0.8 km away",
            eta: "4 min",
            price: "$5.95"
        }
    ];

    // DOM Elements
    const searchForm = document.querySelector('.search-form');
    const pickupTimeLater = document.getElementById('pickup-time');
    const timeOptions = document.querySelectorAll('.time-option');
    const availableCabsSection = document.querySelector('.available-cabs');
    const cabResults = document.getElementById('cab-results');
    const cabDetailsSection = document.querySelector('.cab-details');
    const bookingConfirmedSection = document.querySelector('.booking-confirmed');
    const paymentOptions = document.querySelectorAll('.payment-option');
    const cardDetails = document.querySelector('.card-details');

    // Time option selection
    timeOptions.forEach(option => {
        option.addEventListener('click', function() {
            timeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.time === 'later') {
                pickupTimeLater.classList.remove('hidden');
            } else {
                pickupTimeLater.classList.add('hidden');
            }
        });
    });

    // Search form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const pickup = document.getElementById('pickup').value;
        const dropoff = document.getElementById('dropoff').value;
        
        if (!pickup || !dropoff) {
            alert('Please enter both pickup and dropoff locations');
            return;
        }
        
        // Show available cabs
        loadAvailableCabs();
        availableCabsSection.classList.remove('hidden');
        
        // Scroll to results
        availableCabsSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Load available cabs
    function loadAvailableCabs() {
        cabResults.innerHTML = '';
        
        availableCabs.forEach(cab => {
            const cabCard = document.createElement('div');
            cabCard.className = 'cab-card';
            cabCard.innerHTML = `
                <div class="cab-image">
                    <img src="${cab.image}" alt="${cab.type} cab">
                </div>
                <div class="cab-content">
                    <h3 class="cab-title">${cab.type}</h3>
                    <div class="cab-driver">
                        <img src="${cab.driver.avatar}" alt="${cab.driver.name}" class="driver-avatar">
                        <div>
                            <div class="driver-name">${cab.driver.name}</div>
                            <div class="cab-rating">
                                ${generateRatingStars(cab.driver.rating)} (${cab.driver.rides} rides)
                            </div>
                        </div>
                    </div>
                    <div class="cab-meta">
                        <span><i class="fas fa-car"></i> ${cab.vehicle} • ${cab.license}</span>
                        <span><i class="fas fa-clock"></i> ${cab.eta}</span>
                    </div>
                    <div class="cab-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${cab.distance}</span>
                        <span class="cab-price">${cab.price}</span>
                    </div>
                    <button class="cab-btn" data-id="${cab.id}">Book This Cab</button>
                </div>
            `;
            cabResults.appendChild(cabCard);
        });
    }

    // Generate rating stars
    function generateRatingStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    // Cab selection
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cab-btn')) {
            const cabId = parseInt(e.target.dataset.id);
            const selectedCab = availableCabs.find(cab => cab.id === cabId);
            
            if (selectedCab) {
                showCabDetails(selectedCab);
                availableCabsSection.classList.add('hidden');
                cabDetailsSection.classList.remove('hidden');
                cabDetailsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Show cab details
    function showCabDetails(cab) {
        const pickupAddress = document.getElementById('pickup').value || 'Bole Medhanialem, Addis Ababa';
        const dropoffAddress = document.getElementById('dropoff').value || 'Mexico Square, Addis Ababa';
        
        document.getElementById('pickup-address').textContent = pickupAddress;
        document.getElementById('dropoff-address').textContent = dropoffAddress;
        document.getElementById('confirmed-pickup').textContent = pickupAddress;
        document.getElementById('confirmed-dropoff').textContent = dropoffAddress;
    }

    // Payment method selection
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.method === 'card') {
                cardDetails.classList.remove('hidden');
            } else {
                cardDetails.classList.add('hidden');
            }
        });
    });

    // Confirm booking
    const confirmBookingBtn = document.querySelector('.confirm-booking-btn');
    if (confirmBookingBtn) {
        confirmBookingBtn.addEventListener('click', function() {
            cabDetailsSection.classList.add('hidden');
            bookingConfirmedSection.classList.remove('hidden');
            bookingConfirmedSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Track driver button
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('track-driver-btn')) {
            alert('Tracking driver... This would open a map in a real application.');
        }
    });

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.header').appendChild(mobileMenuToggle);
    
    mobileMenuToggle.addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('show');
    });
});