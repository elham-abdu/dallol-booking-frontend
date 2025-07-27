// Sample hotel data with room information
const hotelsData = [
    {
        id: 1,
        name: "Sheraton Addis",
        location: "Addis Ababa, Ethiopia",
        image: "../images/hotel/a.jpg",
        rating: 4.8,
        reviews: 1245,
        amenities: ["wifi", "pool", "gym", "spa", "breakfast"],
        price: 250,
        badge: "Popular",
        rooms: [
            {
                id: 101,
                type: "single",
                name: "Standard Single Room",
                description: "Comfortable single room with a queen bed, work desk, and city view.",
                amenities: ["wifi", "tv", "ac", "breakfast"],
                price: 150,
                image: "../images/rooms/single.jpg",
                available: 5
            },
            {
                id: 102,
                type: "double",
                name: "Deluxe Double Room",
                description: "Spacious double room with king bed, sitting area, and mountain view.",
                amenities: ["wifi", "tv", "ac", "breakfast", "minibar"],
                price: 220,
                image: "../images/rooms/double.jpg",
                available: 8
            },
            {
                id: 103,
                type: "suite",
                name: "Executive Suite",
                description: "Luxurious suite with separate living area, premium amenities, and panoramic views.",
                amenities: ["wifi", "tv", "ac", "breakfast", "minibar", "jacuzzi"],
                price: 350,
                image: "../images/rooms/suite.jpg",
                available: 3
            }
        ]
    },
    {
        id: 2,
        name: "Hilton Addis Ababa",
        location: "Addis Ababa, Ethiopia",
        image: "../images/hotel/b.jpg",
        rating: 4.7,
        reviews: 987,
        amenities: ["wifi", "pool", "gym", "breakfast"],
        price: 220,
        badge: "Luxury",
        rooms: [
            {
                id: 201,
                type: "single",
                name: "Classic Single Room",
                description: "Elegant single room with modern amenities and city view.",
                amenities: ["wifi", "tv", "ac"],
                price: 180,
                image: "../images/rooms/single2.jpg",
                available: 7
            },
            {
                id: 202,
                type: "double",
                name: "Premium Double Room",
                description: "Comfortable double room with premium bedding and work area.",
                amenities: ["wifi", "tv", "ac", "minibar"],
                price: 240,
                image: "../images/rooms/double2.jpg",
                available: 5
            },
            {
                id: 203,
                type: "family",
                name: "Family Room",
                description: "Spacious room with two double beds, perfect for families.",
                amenities: ["wifi", "tv", "ac", "breakfast"],
                price: 280,
                image: "../images/rooms/family.jpg",
                available: 4
            }
        ]
    },
    {
        id: 3,
        name: "Radisson Blu",
        location: "Addis Ababa, Ethiopia",
        image: "../images/hotel/c.jpg",
        rating: 4.5,
        reviews: 756,
        amenities: ["wifi", "pool", "breakfast"],
        price: 190,
        badge: "Best Value",
        rooms: [
            {
                id: 301,
                type: "single",
                name: "Business Single Room",
                description: "Functional room with ergonomic workspace and high-speed internet.",
                amenities: ["wifi", "tv", "ac", "workdesk"],
                price: 160,
                image: "../images/rooms/single3.jpg",
                available: 6
            },
            {
                id: 302,
                type: "double",
                name: "Superior Double Room",
                description: "Contemporary double room with premium amenities.",
                amenities: ["wifi", "tv", "ac", "breakfast"],
                price: 200,
                image: "../images/rooms/double3.jpg",
                available: 7
            }
        ]
    },
    {
        id: 4,
        name: "Jupiter International",
        location: "Addis Ababa, Ethiopia",
        image: "../images/hotel/d.jpg",
        rating: 4.3,
        reviews: 654,
        amenities: ["wifi", "gym", "breakfast"],
        price: 150,
        badge: null,
        rooms: [
            {
                id: 401,
                type: "single",
                name: "Standard Room",
                description: "Comfortable accommodation with essential amenities.",
                amenities: ["wifi", "tv", "ac"],
                price: 120,
                image: "../images/rooms/single4.jpg",
                available: 10
            },
            {
                id: 402,
                type: "double",
                name: "Deluxe Room",
                description: "Upgraded room with additional space and amenities.",
                amenities: ["wifi", "tv", "ac", "breakfast"],
                price: 160,
                image: "../images/rooms/double4.jpg",
                available: 8
            }
        ]
    },
    {
        id: 5,
        name: "Elilly International",
        location: "Addis Ababa, Ethiopia",
        image: "../images/hotel/i.jpg",
        rating: 4.2,
        reviews: 543,
        amenities: ["wifi", "pool"],
        price: 140,
        badge: null,
        rooms: [
            {
                id: 501,
                type: "single",
                name: "Economy Single",
                description: "Basic accommodation with comfortable bedding.",
                amenities: ["wifi", "tv"],
                price: 100,
                image: "../images/rooms/single5.jpg",
                available: 12
            },
            {
                id: 502,
                type: "double",
                name: "Comfort Double",
                description: "Standard double room with modern decor.",
                amenities: ["wifi", "tv", "ac"],
                price: 140,
                image: "../images/rooms/double5.jpg",
                available: 9
            }
        ]
    },
    {
        id: 6,
        name: "Harmony Hotel",
        location: "Addis Ababa, Ethiopia",
        image: "../images/hotel/f.jpg",
        rating: 4.0,
        reviews: 432,
        amenities: ["wifi", "breakfast"],
        price: 120,
        badge: null,
        rooms: [
            {
                id: 601,
                type: "single",
                name: "Standard Single",
                description: "Simple and comfortable single room.",
                amenities: ["wifi", "tv"],
                price: 90,
                image: "../images/rooms/single6.jpg",
                available: 15
            },
            {
                id: 602,
                type: "double",
                name: "Standard Double",
                description: "Basic double room with essential amenities.",
                amenities: ["wifi", "tv"],
                price: 120,
                image: "../images/rooms/double6.jpg",
                available: 10
            }
        ]
    },
    {
        id: 7,
        name: "Capital Hotel",
        location: "Addis Ababa, Ethiopia",
        image: "../images/hotel/g.jpg",
        rating: 3.9,
        reviews: 321,
        amenities: ["wifi"],
        price: 100,
        badge: null,
        rooms: [
            {
                id: 701,
                type: "single",
                name: "Basic Single",
                description: "No-frills accommodation for budget travelers.",
                amenities: ["wifi"],
                price: 70,
                image: "../images/rooms/single7.jpg",
                available: 20
            },
            {
                id: 702,
                type: "double",
                name: "Basic Double",
                description: "Simple double room with shared bathroom.",
                amenities: ["wifi"],
                price: 100,
                image: "../images/rooms/double7.jpg",
                available: 15
            }
        ]
    },
    {
        id: 8,
        name: "Azzeman Hotel",
        location: "Addis Ababa, Ethiopia",
        image: "../images/hotel/h.jpg",
        rating: 3.8,
        reviews: 210,
        amenities: ["wifi", "gym"],
        price: 90,
        badge: null,
        rooms: [
            {
                id: 801,
                type: "single",
                name: "Budget Single",
                description: "Economical single room with basic amenities.",
                amenities: ["wifi"],
                price: 60,
                image: "../images/rooms/single8.jpg",
                available: 25
            },
            {
                id: 802,
                type: "double",
                name: "Budget Double",
                description: "Affordable double room for cost-conscious travelers.",
                amenities: ["wifi"],
                price: 90,
                image: "../images/rooms/double8.jpg",
                available: 20
            }
        ]
    }
];

// DOM Elements
const hotelsContainer = document.getElementById('hotelsContainer');
const priceRange = document.getElementById('priceRange');
const stars = document.querySelectorAll('.star');
const amenitiesCheckboxes = document.querySelectorAll('input[name="amenity"]');
const roomTypeCheckboxes = document.querySelectorAll('input[name="room-type"]');
const sortBy = document.getElementById('sortBy');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageNumbers = document.getElementById('pageNumbers');
const roomModal = document.getElementById('roomModal');
const modalHotelName = document.getElementById('modalHotelName');
const roomTypesContainer = document.getElementById('roomTypesContainer');
const closeModal = document.querySelector('.close-modal');
const confirmBookingBtn = document.querySelector('.confirm-booking');

// Pagination variables
let currentPage = 1;
const hotelsPerPage = 4;
let filteredHotels = [...hotelsData];
let selectedHotel = null;
let selectedRoom = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderHotels();
    setupEventListeners();
});

// Render hotels based on filters and pagination
function renderHotels() {
    // Clear current hotels
    hotelsContainer.innerHTML = '';

    // Calculate pagination
    const startIndex = (currentPage - 1) * hotelsPerPage;
    const endIndex = startIndex + hotelsPerPage;
    const paginatedHotels = filteredHotels.slice(startIndex, endIndex);

    // Render each hotel
    paginatedHotels.forEach(hotel => {
        const hotelCard = createHotelCard(hotel);
        hotelsContainer.appendChild(hotelCard);
    });

    // Update pagination controls
    updatePaginationControls();
}

// Create hotel card HTML
function createHotelCard(hotel) {
    const card = document.createElement('div');
    card.className = 'hotel-card';

    // Amenities icons mapping
    const amenitiesIcons = {
        wifi: '<i class="fas fa-wifi"></i>',
        pool: '<i class="fas fa-swimming-pool"></i>',
        gym: '<i class="fas fa-dumbbell"></i>',
        spa: '<i class="fas fa-spa"></i>',
        breakfast: '<i class="fas fa-utensils"></i>'
    };

    // Create stars rating
    const fullStars = Math.floor(hotel.rating);
    const halfStar = hotel.rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let starsHtml = '';
    for (let i = 0; i < fullStars; i++) starsHtml += '<i class="fas fa-star"></i>';
    if (halfStar) starsHtml += '<i class="fas fa-star-half-alt"></i>';
    for (let i = 0; i < emptyStars; i++) starsHtml += '<i class="far fa-star"></i>';

    // Create amenities badges
    const amenitiesHtml = hotel.amenities.map(amenity => 
        `<span class="hotel-amenity">${amenitiesIcons[amenity] || ''} ${amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>`
    ).join('');

    // Badge HTML if exists
    const badgeHtml = hotel.badge ? `<span class="hotel-badge">${hotel.badge}</span>` : '';

    card.innerHTML = `
        <div class="hotel-image">
            <img src="${hotel.image}" alt="${hotel.name}">
            ${badgeHtml}
        </div>
        <div class="hotel-details">
            <h3 class="hotel-name">${hotel.name}</h3>
            <div class="hotel-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${hotel.location}</span>
            </div>
            <div class="hotel-rating">
                <div class="hotel-stars">${starsHtml}</div>
                <span class="hotel-reviews">${hotel.rating} (${hotel.reviews} reviews)</span>
            </div>
            <div class="hotel-amenities">
                ${amenitiesHtml}
            </div>
            <div class="hotel-price">
                <div class="price">
                    $${hotel.price} <span>/ night</span>
                </div>
                <button class="book-btn" data-hotel-id="${hotel.id}">Book Now</button>
            </div>
        </div>
    `;

    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Price range filter
    priceRange.addEventListener('input', () => {
        filterHotels();
    });

    // Star rating filter
    stars.forEach(star => {
        star.addEventListener('click', () => {
            // Toggle active class
            stars.forEach(s => s.classList.remove('active'));
            star.classList.add('active');
            filterHotels();
        });
    });

    // Amenities filter
    amenitiesCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            filterHotels();
        });
    });

    // Room type filter
    roomTypeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            filterHotels();
        });
    });

    // Sort by
    sortBy.addEventListener('change', () => {
        sortHotels();
        renderHotels();
    });

    // Pagination buttons
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderHotels();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderHotels();
        }
    });

    // Book now buttons (delegated event)
    hotelsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('book-btn')) {
            const hotelId = parseInt(e.target.getAttribute('data-hotel-id'));
            showRoomSelectionModal(hotelId);
        }
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        roomModal.style.display = 'none';
    });

    // Confirm booking
    confirmBookingBtn.addEventListener('click', () => {
        if (selectedRoom) {
            alert(`Booking confirmed for ${selectedRoom.name} at ${selectedHotel.name}!`);
            roomModal.style.display = 'none';
        } else {
            alert('Please select a room first');
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === roomModal) {
            roomModal.style.display = 'none';
        }
    });
}

// Show room selection modal
function showRoomSelectionModal(hotelId) {
    selectedHotel = hotelsData.find(hotel => hotel.id === hotelId);
    if (!selectedHotel) return;

    modalHotelName.textContent = `${selectedHotel.name} - Select Your Room`;
    roomTypesContainer.innerHTML = '';

    // Filter rooms based on selected room types (if any)
    const selectedRoomTypes = Array.from(roomTypeCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    let roomsToShow = selectedHotel.rooms;
    if (selectedRoomTypes.length > 0) {
        roomsToShow = selectedHotel.rooms.filter(room => 
            selectedRoomTypes.includes(room.type)
        );
    }

    if (roomsToShow.length === 0) {
        roomTypesContainer.innerHTML = '<p>No rooms available matching your criteria.</p>';
    } else {
        roomsToShow.forEach(room => {
            const roomOption = createRoomOption(room);
            roomTypesContainer.appendChild(roomOption);
        });
    }

    roomModal.style.display = 'block';
    selectedRoom = null;
}

// Create room option HTML
function createRoomOption(room) {
    const roomOption = document.createElement('div');
    roomOption.className = 'room-option';
    roomOption.setAttribute('data-room-id', room.id);

    // Amenities icons mapping
    const amenitiesIcons = {
        wifi: '<i class="fas fa-wifi"></i>',
        tv: '<i class="fas fa-tv"></i>',
        ac: '<i class="fas fa-snowflake"></i>',
        breakfast: '<i class="fas fa-utensils"></i>',
        minibar: '<i class="fas fa-wine-bottle"></i>',
        jacuzzi: '<i class="fas fa-hot-tub"></i>',
        workdesk: '<i class="fas fa-laptop"></i>'
    };

    // Create amenities badges
    const amenitiesHtml = room.amenities.map(amenity => 
        `<span class="room-amenity">${amenitiesIcons[amenity] || ''} ${amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>`
    ).join('');

    roomOption.innerHTML = `
        <div class="room-image">
            <img src="${room.image}" alt="${room.name}">
        </div>
        <div class="room-details">
            <h3 class="room-name">${room.name}</h3>
            <p class="room-description">${room.description}</p>
            <div class="room-amenities">
                ${amenitiesHtml}
            </div>
            <div class="room-price">
                <div class="price-details">
                    <span class="price-amount">$${room.price}</span>
                    <span class="price-info">per night (${room.available} available)</span>
                </div>
                <button class="select-room-btn" data-room-id="${room.id}">Select Room</button>
            </div>
        </div>
    `;

    // Add event listener to select room button
    roomOption.querySelector('.select-room-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        selectRoom(room);
    });

    return roomOption;
}

// Select a room
function selectRoom(room) {
    // Remove selected class from all rooms
    document.querySelectorAll('.room-option').forEach(option => {
        option.classList.remove('selected');
    });

    // Add selected class to clicked room
    const roomElement = document.querySelector(`.room-option[data-room-id="${room.id}"]`);
    roomElement.classList.add('selected');

    selectedRoom = room;
}

// Filter hotels based on selected filters
function filterHotels() {
    const maxPrice = parseInt(priceRange.value);
    const selectedRating = document.querySelector('.star.active')?.dataset.rating || 0;
    const selectedAmenities = Array.from(amenitiesCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    const selectedRoomTypes = Array.from(roomTypeCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    filteredHotels = hotelsData.filter(hotel => {
        // Price filter
        if (hotel.price > maxPrice) return false;

        // Rating filter
        if (selectedRating && hotel.rating < selectedRating) return false;

        // Amenities filter
        if (selectedAmenities.length > 0) {
            const hasAllAmenities = selectedAmenities.every(amenity => 
                hotel.amenities.includes(amenity)
            );
            if (!hasAllAmenities) return false;
        }

        // Room type filter
        if (selectedRoomTypes.length > 0) {
            const hasMatchingRoom = hotel.rooms.some(room => 
                selectedRoomTypes.includes(room.type)
            );
            if (!hasMatchingRoom) return false;
        }

        return true;
    });

    // Reset to first page
    currentPage = 1;
    
    // Sort and render
    sortHotels();
    renderHotels();
}

// Sort hotels based on selected option
function sortHotels() {
    const sortValue = sortBy.value;

    switch (sortValue) {
        case 'price-low':
            filteredHotels.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredHotels.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredHotels.sort((a, b) => b.rating - a.rating);
            break;
        default: // recommended
            filteredHotels.sort((a, b) => b.rating - a.rating);
    }
}

// Update pagination controls
function updatePaginationControls() {
    const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

    // Update button states
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;

    // Update page numbers
    pageNumbers.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('span');
        pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderHotels();
        });
        pageNumbers.appendChild(pageBtn);
    }
}