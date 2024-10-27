
const addPopupButton = document.getElementById('add-popup');
const addPopup = document.querySelector('.popup-box');
const editPopup = document.querySelector('.edit-popup-box');
const popupOverlay = document.querySelector('.popup-overlay');
const addButton = document.getElementById('add-book');
const cancelAddButton = document.getElementById('cancel-popup');
const saveButton = document.getElementById('save-book');
const cancelEditButton = document.getElementById('edit-cancel-popup');


let tasks = [];
let currentEditIndex = null;

addPopupButton.addEventListener('click', () => {
    addPopup.style.display = 'block';
    popupOverlay.style.display = 'block';
});


function hidePopups() {
    addPopup.style.display = 'none';
    editPopup.style.display = 'none';
    popupOverlay.style.display = 'none';
}


addButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    const title = document.getElementById('title-input').value;
    const heading = document.getElementById('heading-input').value;
    const description = document.getElementById('description-input').value;

    if (title && heading && description) {
        tasks.push({ title, heading, description });
        renderTasks();
        hidePopups();
        document.querySelector('form').reset();
    }
});

function renderTasks() {
    const container = document.querySelector('.container');
    container.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskContainer = document.createElement('div');
        taskContainer.className = 'book-container';
        taskContainer.innerHTML = `
            <h2>${task.title}</h2>
            <h5>${task.heading}</h5>
            <p>${task.description}</p>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="editTask(${index})">Edit</button>
        `;
        container.appendChild(taskContainer);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Edit Task
function editTask(index) {
    currentEditIndex = index;
    const task = tasks[index];

    document.getElementById('edit-title-input').value = task.title;
    document.getElementById('edit-heading-input').value = task.heading;
    document.getElementById('edit-description-input').value = task.description;

    editPopup.style.display = 'block';
    popupOverlay.style.display = 'block';
}


saveButton.addEventListener('click', (event) => {
    event.preventDefault();

    const title = document.getElementById('edit-title-input').value;
    const heading = document.getElementById('edit-heading-input').value;
    const description = document.getElementById('edit-description-input').value;

    if (currentEditIndex !== null && title && heading && description) {
        tasks[currentEditIndex] = { title, heading, description };
        renderTasks();
        hidePopups();
        currentEditIndex = null;
    }
});

// Cancel Add Popup
cancelAddButton.addEventListener('click', (event) => {
    event.preventDefault();
    hidePopups();
});

// Cancel Edit Popup
cancelEditButton.addEventListener('click', (event) => {
    event.preventDefault();
    hidePopups();
});

// Hide Popups on Overlay Click
popupOverlay.addEventListener('click', hidePopups);
