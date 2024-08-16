
window.onload = function() {
    const btn = document.querySelector('.main-form__button');
    const input = document.querySelector('.main-form__text');
    const table = document.querySelector('.main-table');

    const loadItems = () => {
        const items = JSON.parse(localStorage.getItem('todoItems')) || [];
        items.forEach(item => {
            addRow(item);
        });
    };

    const saveItems = () => {
        const rows = table.querySelectorAll('tr');
        const items = Array.from(rows).map(row => row.querySelector('td').textContent);
        localStorage.setItem('todoItems', JSON.stringify(items));
    };

    const addRow = (item) => {
        const newRow = document.createElement('tr');
        const newCell = document.createElement('td');
        newCell.textContent = item;
        newRow.appendChild(newCell);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', function() {
            newRow.remove();
            saveItems();
        });

        newRow.appendChild(deleteButton);
        table.appendChild(newRow);
    };

    loadItems();

    btn.addEventListener('click', function(event) {
        event.preventDefault(); 

        const value = input.value.trim(); 

        if (value) {
            addRow(value);
            saveItems();
            input.value = '';
        }
    });
}
