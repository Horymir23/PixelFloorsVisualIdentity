document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.expand-button');
    const cards = document.querySelectorAll('.glass-card');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetId = button.getAttribute('data-target');
            const clickedCard = document.getElementById(targetId);
            const clickedColumn = clickedCard.parentElement; // The div with col-md-4/6/3

            // Check if already expanded
            const isExpanded = clickedColumn.classList.contains('col-md-6');

            // Reset all columns to default state first
            resetAllColumns();

            if (!isExpanded) {
                // Expand clicked column
                clickedColumn.classList.remove('col-md-4');
                clickedColumn.classList.add('col-md-6');
                clickedCard.classList.add('expanded');
                button.classList.add('active'); // Rotate icon

                // Shrink siblings
                const allColumns = document.querySelectorAll('.glass-card');
                allColumns.forEach(card => {
                    const col = card.parentElement;
                    if (col !== clickedColumn) {
                        col.classList.remove('col-md-4');
                        col.classList.add('col-md-3');
                        card.classList.add('shrunk');
                    }
                });
            }
        });
    });

    function resetAllColumns() {
        const allCardElements = document.querySelectorAll('.glass-card');
        allCardElements.forEach(card => {
            const col = card.parentElement;
            col.classList.remove('col-md-6', 'col-md-3');
            col.classList.add('col-md-4');
            card.classList.remove('expanded', 'shrunk');

            // Reset button icon state
            const btn = card.querySelector('.expand-button');
            if (btn) btn.classList.remove('active');
        });
    }
});
