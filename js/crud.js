/* JavaScript (crud.js) for managing CRUD operations with localStorage support */
document.addEventListener('DOMContentLoaded', () => {
    loadStoredData();
});

function submitData() {
    const item1 = document.getElementById('item1').value;
    const item2 = document.getElementById('item2').value;
    const item3 = document.getElementById('item3').value;
    const item4 = document.getElementById('item4').value;

    const data = { item1, item2, item3, item4 };
    let dataList = JSON.parse(localStorage.getItem('dataList')) || [];
    dataList.push(data);
    localStorage.setItem('dataList', JSON.stringify(dataList));

    appendDataToOutput(dataList.length - 1, data);
    clearForm();
}

function appendDataToOutput(index, data) {
    const dataOutput = document.getElementById('dataOutput');
    const row = document.createElement('div');
    row.classList.add('data-row');
    row.setAttribute('data-index', index);

    row.innerHTML = `
        <span>${data.item1}</span>
        <span>${data.item2}</span>
        <span>${data.item3}</span>
        <span>${data.item4}</span>
        <div class="action-buttons">
            <button class="edit-btn" onclick="editData(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteData(${index})">Delete</button>
        </div>
    `;

    dataOutput.appendChild(row);
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
            <h2>Edit Data</h2>
            <label for="editItem1">Item 1</label>
            <input type="text" id="editItem1" value="${data.item1}" required>
            <label for="editItem2">Item 2</label>
            <input type="text" id="editItem2" value="${data.item2}" required>
            <label for="editItem3">Item 3</label>
            <input type="text" id="editItem3" value="${data.item3}" required>
            <label for="editItem4">Number</label>
            <input type="number" id="editItem4" value="${data.item4}" required>
            <div class="edit-buttons">
                <button onclick="saveEditData(${index})">Save</button>
                <button onclick="closeEditPopup()">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(editPopup);
}

function saveEditData(index) {
    const item1 = document.getElementById('editItem1').value;
    const item2 = document.getElementById('editItem2').value;
    const item3 = document.getElementById('editItem3').value;
    const item4 = document.getElementById('editItem4').value;

    let dataList = JSON.parse(localStorage.getItem('dataList'));
    dataList[index] = { item1, item2, item3, item4 };
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
    const dataOutput = document.getElementById('dataOutput');
    dataOutput.innerHTML = '<h2>Output</h2><div class="output-headers"><span>Item 1</span><span>Item 2</span><span>Item 3</span><span>Number</span><span>Actions</span></div>';
    loadStoredData();
}

function clearForm() {
    document.getElementById('crudForm').reset();
}