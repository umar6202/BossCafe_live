// 1. SELECT ELEMENTS
const meal_sections = document.querySelectorAll('.section_header');
const navLinks = document.querySelectorAll('nav ul li a');
const navContainer = document.querySelector('nav'); // The container with overflow-x: auto

let last_active = "";

// 2. THE OBSERVER LOGIC (Detects sections without lag)
const observerOptions = {
    rootMargin: '-150px 0px -70% 0px', // Detects section when it's near the top
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id !== last_active) {
                last_active = id;
                activateNav(id);
            }
        }
    });
}, observerOptions);

// 3. START WATCHING EACH SECTION
meal_sections.forEach(section => observer.observe(section));

// 4. ACTIVATE AND CENTER LINK (Horizontal Only)
function activateNav(id) {
    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href').includes(id)) {
            link.classList.add('active');

            // Calculate horizontal center without affecting vertical page scroll
            const linkOffset = link.offsetLeft;
            const linkWidth = link.offsetWidth;
            const containerWidth = navContainer.offsetWidth;

            // Move the navbar scrollbar to center the active link
            navContainer.scrollTo({
                left: linkOffset - (containerWidth / 2) + (linkWidth / 2),
                behavior: 'smooth'
            });
        }
    });
}

// 5. CLEAR ACTIVE STATE AT THE TOP
window.addEventListener('scroll', () => {
    // If we are within 100px of the top of the page
    if (window.scrollY < 100) {
        last_active = "";
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Optional: Reset navbar scroll to the beginning
        navContainer.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    }
});

//Modal
// Initialize the Modal once so we can use .show()
document.addEventListener('DOMContentLoaded', () => {
    const modalElement = document.getElementById('productModal');
    const productModal = new bootstrap.Modal(modalElement);

    document.querySelectorAll('.menu_card').forEach(card => {
        card.addEventListener('click', function () {
            // Pull data from the clicked card
            const title = this.getAttribute('data-title');
            const price = this.getAttribute('data-price');
            const oldPrice = this.getAttribute('data-old-price');
            const desc = this.getAttribute('data-desc');
            const img = this.getAttribute('data-img');

            // Fill the modal
            document.getElementById('modalTitle').innerText = title;
            document.getElementById('modalDesc').innerText = desc;
            document.getElementById('modalImg').src = img;
            document.getElementById('modalPrice').innerHTML = `Rs. ${price} <small class="text-decoration-line-through text-muted fw-normal fs-6">Rs. ${oldPrice}</small>`;
            document.getElementById('modalBtnPrice').innerText = `Rs. ${price}`;

            productModal.show();
        });
    });
});
