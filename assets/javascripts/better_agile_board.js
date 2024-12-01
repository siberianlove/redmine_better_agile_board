document.addEventListener('DOMContentLoaded', function () {
    const toggleCheckbox = document.getElementById('toggleScroll');
    if (toggleCheckbox) {
        generateUserFilterButtons()
        toggleCheckbox.addEventListener('change', function (event) {
            if (event.target.checked) {
                enableScroll()
            } else {
                disableScroll()
            }
            // Сохранение настройки пользователя через AJAX
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Получаем токен из meta
            fetch('/better_agile_board/save_user_setting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken // Добавляем CSRF-токен
                },
                body: JSON.stringify({toggleScroll: event.target.checked})
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    console.log('Setting saved');
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        });
        // Запрос текущих настроек пользователя
        fetch('/better_agile_board/load_user_setting', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then(data => {
                if (data.toggleScroll) {
                    toggleCheckbox.checked = true;
                    enableScroll(); // Активируйте прокрутку, если настройка включена
                }
            })
            .catch(error => console.error('Error fetching user setting:', error));

    }
});

function enableScroll() {
    const columns = document.querySelectorAll('td.issue-status-col');
    columns.forEach(column => {
        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('scrollable-content');
        while (column.firstChild) {
            contentWrapper.appendChild(column.firstChild);
        }
        column.appendChild(contentWrapper);
    });
}

function disableScroll() {
    const columns = document.querySelectorAll('td.issue-status-col');
    columns.forEach(column => {
        const contentWrapper = column.querySelector('.scrollable-content');
        if (contentWrapper) {
            while (contentWrapper.firstChild) {
                column.appendChild(contentWrapper.firstChild);
            }
            column.removeChild(contentWrapper);
        }
    });
}


// Функция сброса фильтрации
function resetFilter() {
    const tasks = document.querySelectorAll('.issue-card');
    tasks.forEach(task => {
        task.style.display = ''; // Показываем все задачи
    });
}

function generateUserFilterButtons() {
    const tasks = document.querySelectorAll('.issue-card');
    const uniqueUsers = new Set();

    tasks.forEach(task => {
        const assignedUser = task.querySelector('.assigned-user a');
        if (assignedUser) {
            uniqueUsers.add(assignedUser.textContent.trim());
        }
    });

    if (uniqueUsers.size > 0) {
        // Получаем элемент контейнера для кнопок
        const buttonContainer = document.getElementsByClassName('buttons')[0];

        // Создаем кнопку "Показать все задачи"
        const showAllButton = document.createElement('button');
        showAllButton.textContent = 'Показать все задачи';
        showAllButton.type = 'button';
        showAllButton.onclick = resetFilter; // Привязываем функцию сброса фильтрации
        buttonContainer.appendChild(showAllButton);
        // Создаем кнопки для каждого пользователя
        uniqueUsers.forEach(user => {
            const button = document.createElement('button');
            button.textContent = `${user}`;
            button.type = 'button'
            button.onclick = () => filterByUser(user);
            buttonContainer.appendChild(button);
        });
    }
}

// Функция фильтрации задач по имени пользователя
function filterByUser(userName) {
    const tasks = document.querySelectorAll('.issue-card');

    tasks.forEach(task => {
        const assignedUser = task.querySelector('.assigned-user a');
        if (assignedUser && assignedUser.textContent.includes(userName)) {
            task.style.display = ''; // Показываем задачи для выбранного пользователя
        } else {
            task.style.display = 'none'; // Скрываем остальные задачи
        }
    });
}

generateUserFilterButtons()