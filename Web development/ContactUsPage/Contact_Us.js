// Script to toggle FAQ items
const toggles = document.querySelectorAll('.faq-toggle');

toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        // Toggle active class for the clicked item
        toggle.classList.toggle('active');
        
        // Get the next sibling (the content)
        const content = toggle.nextElementSibling;
        
        // If content is open, close it, else open it
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});
