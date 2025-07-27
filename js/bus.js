const modal = document.getElementById('routeModal');
const btn = document.getElementById('openSeatModal');
const span = document.getElementsByClassName('close-modal')[0];

btn.onclick = function() {
  modal.style.display = 'block';
}

span.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const modal = document.getElementById('routeModal');
    const openButtons = document.querySelectorAll('.btn-primary, #openSeatModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Open modal function
    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
    
    // Close modal function
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    // Add click event to all Book Now buttons
    openButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });
    
    // Close modal when clicking X
    closeModal.addEventListener('click', closeModalFunc);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModalFunc();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunc();
        }
    });
});