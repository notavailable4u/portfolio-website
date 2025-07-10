document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.filter button');
    const cards = document.querySelectorAll('article.card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter').toLowerCase();

            // Remove 'active' class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));

            // Add 'active' class to the clicked button
            button.classList.add('active');

            cards.forEach(card => {
                const category = card.getAttribute('data-category')?.toLowerCase() || '';
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = ''; // Show the card
                } else {
                    card.style.display = 'none'; // Hide the card
                }
            });
        });
    });

    // Show all cards by default
    cards.forEach(card => {
        card.style.display = ''; // Show all cards
    });
});
