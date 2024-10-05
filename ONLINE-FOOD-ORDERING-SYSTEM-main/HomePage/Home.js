document.addEventListener('DOMContentLoaded', () => {
    const text1 = "Order Delicious Food Anytime, Anywhere!";
    const text2 = "Get your favorite dishes delivered to your door with Food Junction.";

    let heroText1 = document.getElementById("hero-text-1");
    let heroText2 = document.getElementById("hero-text-2");

    let i = 0;
    let speed = 100; // Speed of typing effect

    // Function to handle search form submission
    document.querySelector('.search-bar form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const query = document.querySelector('.search-bar input').value;
    
        try {
            const response = await fetch(`http://localhost:5000/api/search?q=${query}`);
            const data = await response.json();
            console.log(data.dishes); // Display or use the dishes data
            console.log(data.restaurants); // Display or use the restaurants data
        } catch (err) {
            console.error('Error:', err);
        }
    });
    
    // Typewriter effect for the first text
    function typeWriter1() {
        if (i < text1.length) {
            heroText1.innerHTML += text1.charAt(i);
            i++;
            setTimeout(typeWriter1, speed);
        } else {
            i = 0; // Reset for the second text
            setTimeout(typeWriter2, 1000); // Delay before typing the second text
        }
    }

    // Typewriter effect for the second text
    function typeWriter2() {
        if (i < text2.length) {
            heroText2.innerHTML += text2.charAt(i);
            i++;
            setTimeout(typeWriter2, speed);
        }
    }

    // Start typing the first text
    typeWriter1();

    // Handle filter dropdown visibility
    const filterButton = document.querySelector('.filter');
    const filterOptions = document.querySelector('.filter-options');

    if (filterButton && filterOptions) {
        filterButton.addEventListener('click', () => {
            // Toggle the display of the filter options
            if (filterOptions.style.display === 'block') {
                filterOptions.style.display = 'none';
            } else {
                filterOptions.style.display = 'block';
            }
        });

        // Close the filter options if clicked outside
        document.addEventListener('click', (event) => {
            if (!filterButton.contains(event.target) && !filterOptions.contains(event.target)) {
                filterOptions.style.display = 'none';
            }
        });
    }
});
