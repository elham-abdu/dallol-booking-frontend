document.addEventListener('DOMContentLoaded', function() {
    // Featured Tours Data
    const featuredTours = [
        {
            id: 1,
            title: "Historical Route Adventure",
            image: "../images/tour/𝐄𝐭𝐡𝐢𝐨𝐩𝐢𝐚𝐧 𝐚𝐞𝐬𝐭𝐡𝐞𝐭𝐢𝐜_🇪🇹.jpg",
            description: "Explore Ethiopia's rich history with visits to Axum, Lalibela, Gondar, and Bahir Dar. This 10-day tour covers the most significant historical sites in the country.",
            duration: "10 Days",
            destinations: "4 Cities",
            price: 1499
        },
        {
            id: 2,
            title: "Danakil Depression Expedition",
            image: "../images/tour/ethiopia ⋆ ࣪_ 🇪🇹📍.jpg",
            description: "Witness one of the most alien landscapes on Earth. This 5-day expedition takes you to the hottest place on the planet with its colorful sulfur springs and salt flats.",
            duration: "5 Days",
            destinations: "3 Sites",
            price: 1299
        },
        {
            id: 3,
            title: "Simien Mountains Trek",
            image: "../images/tour/Voyage en Ethiopie.jpg",
            description: "Trek through Ethiopia's stunning Simien Mountains National Park, home to rare wildlife and breathtaking views. Suitable for all fitness levels.",
            duration: "7 Days",
            destinations: "Multiple Trails",
            price: 1099
        },
    ];

    // Load featured tours
    const tourGrid = document.getElementById('featured-tours');
    
    featuredTours.forEach(tour => {
        const tourCard = document.createElement('div');
        tourCard.className = 'tour-card';
        tourCard.innerHTML = `
            <div class="tour-image">
                <img src="${tour.image}" alt="${tour.title}">
            </div>
            <div class="tour-content">
                <h3 class="tour-title">${tour.title}</h3>
                <p class="tour-description">${tour.description}</p>
                <div class="tour-meta">
                    <span><i class="fas fa-calendar-alt"></i> ${tour.duration}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${tour.destinations}</span>
                </div>
                <div class="tour-price">$${tour.price}</div>
                <button class="tour-btn" data-id="${tour.id}">Book Now</button>
            </div>
        `;
        tourGrid.appendChild(tourCard);
    });

    // Category selection
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            // In a real app, you would filter tours by category here
            alert(`Showing ${category} tours`);
            categoryCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Tour booking buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tour-btn') || e.target.classList.contains('deal-btn')) {
            const tourId = e.target.getAttribute('data-id');
            // In a real app, you would redirect to booking page or show a modal
            alert(`Booking tour ${tourId}`);
        }
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            // In a real app, you would send this to your backend
            alert(`Thank you for subscribing with ${email}!`);
            this.reset();
        });
    }

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.header').appendChild(mobileMenuToggle);
    
    mobileMenuToggle.addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('show');
    });
});