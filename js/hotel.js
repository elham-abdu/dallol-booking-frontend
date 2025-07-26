// Sample hotel data with corrected image paths
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
        badge: "Popular"
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
        badge: "Luxury"
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
        badge: "Best Value"
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
        badge: null
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
        badge: null
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
        badge: null
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
        badge: null
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
        badge: null
    }
];

// DOM Elements
const hotelsContainer = document.getElementById('hotelsContainer');
const priceRange = document.getElementById('priceRange');
const stars = document.querySelectorAll('.star');
const amenitiesCheckboxes = document.querySelectorAll('input[name="amenity"]');
const sortBy = document.getElementById('sortBy');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageNumbers = document.getElementById('pageNumbers');

// Pagination variables
let currentPage = 1;
const hotelsPerPage = 4;
let filteredHotels = [...hotelsData];

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
                <button class="book-btn">Book Now</button>
            </div>
        </div>
    `;

    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Price range filter
    priceRange.addEventListener('input', () => {
        document.getElementById('priceValue').textContent = `$${priceRange.value}`;
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
}

// Filter hotels based on selected filters
function filterHotels() {
    const maxPrice = parseInt(priceRange.value);
    const selectedRating = document.querySelector('.star.active')?.dataset.rating || 0;
    const selectedAmenities = Array.from(amenitiesCheckboxes)
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