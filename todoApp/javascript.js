window.onload = function() {
    const btn = document.querySelector('.main-form__button');
    const input = document.querySelector('.main-form__text');
    const table = document.querySelector('.main-table');

    // 삭제된 번호를 추적하기 위한 배열
    let deletedIndexes = [];

    // 순번을 재설정하는 함수
    const reindexRows = () => {
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, index) => {
            const cell = row.querySelector('td');
            if (cell) {
                cell.textContent = `${index + 1}. ${cell.textContent.split('. ')[1]}`;
            }
        });
    };

    // 현재 테이블에서 다음 사용 가능한 순번을 찾는 함수
    const getNextIndex = () => {
        if (deletedIndexes.length > 0) {
            return deletedIndexes.shift(); // 삭제된 번호 중 가장 낮은 번호 반환
        }
        const rows = table.querySelectorAll('tr');
        if (rows.length === 0) return 1;
        const lastRow = rows[rows.length - 1];
        const lastIndex = parseInt(lastRow.querySelector('td').textContent.split('.')[0]);
        return lastIndex + 1;
    };

    // 항목을 추가하는 함수
    const addRow = (item) => {
        const newRow = document.createElement('tr');
        const newCell = document.createElement('td');

        // 순번을 가져와서 텍스트에 붙임
        const index = getNextIndex();
        newCell.textContent = `${index}. ${item}`;
        newRow.appendChild(newCell);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', function() {
            newRow.remove();
            deletedIndexes.push(index); // 삭제된 번호를 배열에 추가
            saveItems();
        });

        newRow.appendChild(deleteButton);
        table.appendChild(newRow);
        saveItems();
    };

    // 항목을 저장하는 함수
    const saveItems = () => {
        const rows = table.querySelectorAll('tr');
        const items = Array.from(rows).map(row => {
            const text = row.querySelector('td').textContent;
            return text.split('. ')[1]; // 순번 제외하고 항목만 저장
        });
        localStorage.setItem('todoItems', JSON.stringify(items));
        localStorage.setItem('deletedIndexes', JSON.stringify(deletedIndexes));
    };

    // 항목을 불러오는 함수
    const loadItems = () => {
        const items = JSON.parse(localStorage.getItem('todoItems')) || [];
        deletedIndexes = JSON.parse(localStorage.getItem('deletedIndexes')) || [];

        items.forEach(item => {
            addRow(item);
        });
        reindexRows(); // 항목 불러온 후 순번 재설정
    };

    loadItems();

    btn.addEventListener('click', function(event) {
        event.preventDefault(); 

        const value = input.value.trim(); 

        if (value) {
            addRow(value);
            input.value = '';
        }
    });
};
