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
                // Expand clicked column - Start width animation
                clickedColumn.classList.remove('col-md-4');
                clickedColumn.classList.add('col-md-6');
                button.classList.add('active'); // Rotate/Transform icon

                // Delay the layout switch (Split View) until width is substantial
                // This prevents "height explosion" where split content squishes into narrow col
                if (clickedCard.dataset.expandTimeout) {
                    clearTimeout(clickedCard.dataset.expandTimeout);
                }

                clickedCard.dataset.expandTimeout = setTimeout(() => {
                    clickedCard.classList.add('expanded');
                }, 350); // 350ms delay (CSS width transition is 500ms)

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

            // Clear any pending expansion
            if (card.dataset.expandTimeout) {
                clearTimeout(card.dataset.expandTimeout);
                delete card.dataset.expandTimeout;
            }

            col.classList.remove('col-md-6', 'col-md-3');
            col.classList.add('col-md-4');
            // Remove expanded layout immediately for collapse
            card.classList.remove('expanded', 'shrunk');

            // Reset button icon state
            const btn = card.querySelector('.expand-button');
            if (btn) btn.classList.remove('active');
        });
    }
});
