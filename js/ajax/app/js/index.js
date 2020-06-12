const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');

const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const statusCode = 400;

        xhr.open(method, url);

        xhr.responseType = 'json';

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        if (method === 'DELETE') {
            xhr.setRequestHeader('Authorization', 'admin');
        }

        xhr.onload = () => {
            if (xhr.statusText >= statusCode) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject('Something went wrong!');
        };

        xhr.send(JSON.stringify(data));
    });

    return promise;
};

function newUserForm() {
    const title = document.createElement('h1');
    title.textContent = 'Manage User App';
    appContainer.appendChild(title);

    const form = document.createElement('form');
    form.setAttribute('id', 'add-user_form');
    form.setAttribute('method', 'GET');
    appContainer.appendChild(form);

    const addUserForm = document.querySelector('#add-user_form');

    const inputName = document.createElement('input');
    inputName.classList.add('add-user_name');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('required', 'true');
    inputName.setAttribute('placeholder', 'Name');
    addUserForm.appendChild(inputName);

    const inputFullName = document.createElement('input');
    inputFullName.classList.add('add-user_fullname');
    inputFullName.setAttribute('type', 'text');
    inputFullName.setAttribute('required', 'true');
    inputFullName.setAttribute('placeholder', 'Full Name');
    addUserForm.appendChild(inputFullName);

    const addUserButton = document.createElement('button');
    addUserButton.classList.add('add-new_user');
    addUserButton.setAttribute('type', 'submit');
    addUserButton.textContent = 'Add New User';
    addUserForm.appendChild(addUserButton);
}

newUserForm();

const beforeTableLoading = document.createElement('h2');
beforeTableLoading.classList.add('when-table-loading');
beforeTableLoading.textContent = 'Waiting for data...';
appContainer.appendChild(beforeTableLoading);

const div = document.createElement('div');
div.classList.add('table-wrapper');
appContainer.appendChild(div);

const table = document.createElement('table');
table.classList.add('user-table');
document.querySelector('.table-wrapper').appendChild(table);

function userTableData() {
    const tr = document.createElement('tr');
    tr.classList.add('user-table_header');
    table.appendChild(tr);

    const userHeader = document.querySelector('.user-table_header');
    const tableHeader = ['User id', 'User full name', 'User name', 'Update user', 'Delete user'];
    
    for (let i = 0; i < tableHeader.length; i++) {
        const th = document.createElement('th');
        th.textContent = tableHeader[i];
        userHeader.appendChild(th);
    }
}

const renderTable = () => {
    sendHttpRequest('GET', baseUrl + '/users').then(responseData => {
        userTableData();
        document.querySelector('.when-table-loading').remove();

        for (let elem of responseData) {
            createTable(elem);
        }
    });
};

function createTable(elem) {
    const tr = document.createElement('tr');
    tr.setAttribute('data-user_for-id', elem.id);

    const userId = document.createElement('td');
    const forUser = document.createElement('span');
    forUser.classList.add('user-id');
    forUser.textContent = elem.id;
    userId.appendChild(forUser);

    const userName = document.createElement('td');
    const userNameInput = document.createElement('input');
    userNameInput.setAttribute('type', 'text');
    userNameInput.setAttribute('placeholder', 'The field must be filled');
    userNameInput.setAttribute('value', elem.name);
    userNameInput.setAttribute('data-user-name_id', elem.id);
    userNameInput.classList.add('user-name');
    userName.appendChild(userNameInput);

    const userNickname = document.createElement('td');
    const userNicknameInput = document.createElement('input');
    userNicknameInput.setAttribute('type', 'text');
    userNicknameInput.setAttribute('placeholder', 'The field must be filled');
    userNicknameInput.setAttribute('value', elem.username);
    userNicknameInput.setAttribute('data-user-nickName_id', elem.id);
    userNicknameInput.classList.add('user-nickname');
    userNickname.appendChild(userNicknameInput);

    const updateUser = document.createElement('td');
    const updateUserButton = document.createElement('input');
    updateUserButton.setAttribute('type', 'submit');
    updateUserButton.setAttribute('value', 'Update');
    updateUserButton.setAttribute('data-update-user-id', elem.id);
    updateUserButton.classList.add('update-user_button');
    updateUser.appendChild(updateUserButton);

    const deleteUser = document.createElement('td');
    const deleteUserButton = document.createElement('input');
    deleteUserButton.setAttribute('type', 'submit');
    deleteUserButton.setAttribute('value', 'Delete');
    deleteUserButton.setAttribute('data-delete-user-id', elem.id);
    deleteUserButton.classList.add('delete-user_button');
    deleteUser.appendChild(deleteUserButton);

    tr.appendChild(userId);
    tr.appendChild(userName);
    tr.appendChild(userNickname);
    tr.appendChild(updateUser);
    tr.appendChild(deleteUser);
    document.querySelector('.user-table').appendChild(tr);
}

renderTable();

document.querySelector('.add-new_user').addEventListener('click', event => {
    const userName = document.querySelector('.add-user_name');
    const userNickname = document.querySelector('.add-user_fullname');

    if (userName.value && userNickname.value) {
        event.preventDefault();
        event.target.setAttribute('disabled', true);
        const newUserName = document.querySelector('.add-user_name').value;
        const newUserFullname = document.querySelector('.add-user_fullname').value;
        const newUserObj = {
            name: newUserFullname,
            username: newUserName
        }

        sendData(newUserObj);
    }
});

document.querySelector('.user-table').addEventListener('click', (event) => {

    if (event.target.getAttribute('data-update-user-id')) {
        event.target.setAttribute('disabled', true);
        const targetUpdateId = event.target.dataset.updateUserId;
        const userName = document.querySelector(`input[data-user-name_id='${targetUpdateId}']`).value;
        const userNickname = document.querySelector(`input[data-user-nickName_id='${targetUpdateId}']`).value;
        const userObject = {
            name: userName,
            username: userNickname
        };

        updateData(targetUpdateId, userObject);
    }

    if (event.target.getAttribute('data-delete-user-id')) {
        event.target.setAttribute('disabled', true);
        const targetDeleteId = event.target.dataset.deleteUserId;
        const deleteTr = event.target.closest('tr');

        deleteData(targetDeleteId, deleteTr);
    }
});

const sendData = (newUserData) => {
    sendHttpRequest('POST', `${baseUrl}/users`, newUserData).then(() => {
        document.querySelector('.add-new_user').removeAttribute('disabled');
        addNewUserRow();
        const userName = document.querySelector('.add-user_name');
        const userNickname = document.querySelector('.add-user_fullname');
        userName.value = '';
        userNickname.value = '';
    });
};

const addNewUserRow = () => {
    sendHttpRequest('GET', baseUrl + '/users').then(responseData => {
        createTable(responseData[responseData.length - 1]);
    });
};

const deleteData = (userId, tableRow) => {
    sendHttpRequest('DELETE', `${baseUrl}/users/${userId}`).then(() => {
        tableRow.parentElement.removeChild(tableRow);
    }).catch(err => {
        console.log(err);
    });
};

const updateData = (userId, changeUserData) => {
    sendHttpRequest('PUT', `${baseUrl}/users/${userId}`, changeUserData).then(() => {
        document.querySelector(`input[data-update-user-id='${userId}']`).removeAttribute('disabled');
    }).catch(err => {
        console.log(err);
    });
};