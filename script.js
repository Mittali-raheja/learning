const userList = document.querySelector('.user-list');

async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return [];
    }
}

async function displayUsers() {
    const users = await fetchUsers();

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.username}</td>
           <td>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</td>
        `;
        userList.appendChild(row);
    });
}

displayUsers();
