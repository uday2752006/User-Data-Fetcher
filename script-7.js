// DOM Elements
const fetchBtn = document.getElementById('fetchBtn');
const reloadBtn = document.getElementById('reloadBtn');
const loader = document.getElementById('loader');
const errorContainer = document.getElementById('errorContainer');
const usersContainer = document.getElementById('usersContainer');

// API URL
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch user data
async function fetchUserData() {
    try {
        // Show loader and clear previous data
        loader.classList.remove('hidden');
        errorContainer.classList.add('hidden');
        usersContainer.innerHTML = '';
        fetchBtn.disabled = true;
        reloadBtn.disabled = true;

        // Fetch data from API
        const response = await fetch(API_URL);

        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON response
        const users = await response.json();

        // Display users
        displayUsers(users);
    } catch (error) {
        // Handle errors
        handleError(error);
    } finally {
        // Hide loader and enable buttons
        loader.classList.add('hidden');
        fetchBtn.disabled = false;
        reloadBtn.disabled = false;
    }
}

// Display users in the DOM
function displayUsers(users) {
    if (!users || users.length === 0) {
        usersContainer.innerHTML = '<p class="no-users">No users found.</p>';
        return;
    }

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';

        userCard.innerHTML = `
            <h2>${user.name}</h2>
            <p><span class="label">Username:</span> ${user.username}</p>
            <p><span class="label">Email:</span> <a href="mailto:${user.email}">${user.email}</a></p>
            <p><span class="label">Phone:</span> ${user.phone}</p>
            <p><span class="label">Website:</span> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
            <div class="address">
                <p><span class="label">Address:</span></p>
                <p>${user.address.street}, ${user.address.suite}</p>
                <p>${user.address.city}, ${user.address.zipcode}</p>
                <p><span class="label">Geo:</span> ${user.address.geo.lat}, ${user.address.geo.lng}</p>
            </div>
            <div class="company">
                <p><span class="label">Company:</span> ${user.company.name}</p>
                <p>${user.company.catchPhrase}</p>
                <p>${user.company.bs}</p>
            </div>
        `;

        usersContainer.appendChild(userCard);
    });
}

// Handle errors
function handleError(error) {
    console.error('Error fetching user data:', error);
    errorContainer.textContent = `Error: ${error.message}. Please check your internet connection and try again.`;
    errorContainer.classList.remove('hidden');
    usersContainer.innerHTML = '';
}

// Event Listeners
fetchBtn.addEventListener('click', fetchUserData);
reloadBtn.addEventListener('click', fetchUserData);

// Initial fetch on page load (optional)
document.addEventListener('DOMContentLoaded', () => {
    // fetchUserData(); // Uncomment if you want to load data automatically
});