/* JavaScript (crud.js) for managing CRUD operations */
function createData() {
    const dataInput = document.getElementById('dataInput').value;
    document.getElementById('dataOutput').innerText = 'Data Created: ' + dataInput;
}

function readData() {
    const data = document.getElementById('dataOutput').innerText;
    alert('Data Read: ' + data);
}

function updateData() {
    const newData = prompt('Enter new data to update:');
    if (newData) {
        document.getElementById('dataOutput').innerText = 'Data Updated: ' + newData;
    }
}

function deleteData() {
    document.getElementById('dataOutput').innerText = 'Data Deleted';
}