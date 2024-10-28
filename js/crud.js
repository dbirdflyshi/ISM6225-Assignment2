/* JavaScript (crud.js) for managing CRUD operations with localStorage support */
document.addEventListener('DOMContentLoaded', () => {
    loadStoredData();
});

function submitData() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const date_completed = formatDate(document.getElementById('date_completed').value);
    const number_pages = document.getElementById('number_pages').value;

    const data = { title, author, date_completed, number_pages };
    let dataList = JSON.parse(localStorage.getItem('dataList')) || [];
    dataList.push(data);
    localStorage.setItem('dataList', JSON.stringify(dataList));

    appendDataToOutput(dataList.length - 1, data);
    clearForm();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    if (isNaN(month) || isNaN(day) || isNaN(year)) {
        return 'Not A Date';
    } else {
        return `${month}/${day}/${year}`;
    }
}

function appendDataToOutput(index, data) {
    const dataTable = document.querySelector('#dataTable tbody');
    const row = document.createElement('tr');
    row.setAttribute('data-index', index);

    row.innerHTML = `
        <td>${data.title}</td>
        <td>${data.author}</td>
        <td>${data.date_completed}</td>
        <td>${data.number_pages}</td>
        <td>
            <button class="edit-btn" onclick="editData(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteData(${index})">Delete</button>
        </td>
    `;

    dataTable.appendChild(row);
}

function loadStoredData() {
    const dataList = JSON.parse(localStorage.getItem('dataList')) || [];
    dataList.forEach((data, index) => {
        appendDataToOutput(index, data);
    });
}

function editData(index) {
    const dataList = JSON.parse(localStorage.getItem('dataList'));
    const data = dataList[index];

    const fadeBackground = document.createElement('div');
    fadeBackground.classList.add('fade-background');
    document.body.appendChild(fadeBackground);

    const editPopup = document.createElement('div');
    editPopup.classList.add('edit-popup');
    editPopup.innerHTML = `
        <div class="edit-form">
            <h2>Edit Book</h2>
            <label for="editItem1">Book Title</label>
            <input type="text" id="editItem1" value="${data.title}" required>
            <label for="editItem2">Book Author</label>
            <input type="text" id="editItem2" value="${data.author}" required>
            <label for="editItem3">Date Completed</label>
            <input type="text" id="editItem3" value="${data.date_completed}" required>
            <label for="editItem4">Number Of Pages</label>
            <input type="number" id="editItem4" value="${data.number_pages}" required>
            <div class="edit-buttons">
                <button onclick="saveEditData(${index})">Save</button>
                <button onclick="closeEditPopup()">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(editPopup);
}

function saveEditData(index) {
    const title = document.getElementById('editItem1').value;
    const author = document.getElementById('editItem2').value;
    const date_completed = formatDate(document.getElementById('editItem3').value);
    const number_pages = document.getElementById('editItem4').value;

    let dataList = JSON.parse(localStorage.getItem('dataList'));
    dataList[index] = { title, author, date_completed, number_pages };
    localStorage.setItem('dataList', JSON.stringify(dataList));
    updateDataOutput();
    closeEditPopup();
}

function closeEditPopup() {
    const editPopup = document.querySelector('.edit-popup');
    const fadeBackground = document.querySelector('.fade-background');
    if (editPopup) {
        document.body.removeChild(editPopup);
    }
    if (fadeBackground) {
        document.body.removeChild(fadeBackground);
    }
}

function deleteData(index) {
    let dataList = JSON.parse(localStorage.getItem('dataList'));
    dataList.splice(index, 1);
    localStorage.setItem('dataList', JSON.stringify(dataList));
    updateDataOutput();
}

function updateDataOutput() {
    const dataTable = document.querySelector('#dataTable tbody');
    dataTable.innerHTML = '';
    loadStoredData();
}

function clearForm() {
    document.getElementById('crudForm').reset();
}
