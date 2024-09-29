// script.js

// Global variable to store employee data
let employees = [];

// Fetch employee data from the Random User Generator API
fetch('https://randomuser.me/api/?results=12&nat=us')
  .then(response => response.json()) 
  .then(data => {
    employees = data.results; 
    displayEmployees(employees); 
  })
  .catch(error => console.error('Error fetching employee data:', error));

// Function to display employees in the grid
function displayEmployees(employeeData) {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = ''; 

    employeeData.forEach((employee, index) => {
        const cardHTML = `
            <div class="grid-element" data-index="${index}">
                <div class="profile" style="background-image: url(${employee.picture.large})"></div>
                <div class="name">${employee.name.first} ${employee.name.last}</div>
                <div class="email">${employee.email}</div>
                <div class="city">${employee.location.city}</div>
            </div>
        `;

        gridContainer.insertAdjacentHTML('beforeend', cardHTML);
    });

    addCardEventListeners();
}

// Function to attach event listeners to the dynamically created cards
function addCardEventListeners() {
    const gridElements = document.querySelectorAll('.grid-element');

    gridElements.forEach((element) => {
        element.addEventListener('click', () => {
            const index = element.getAttribute('data-index'); // Get index from data-index attribute
            showModal(index); // Pass the index to showModal
        });
    });
}

// Function to show the modal and populate its content
function showModal(index) {
    const employee = employees[index];
    // Populate modal fields with employee data
    document.querySelector('.modal-content .profile-image').style.backgroundImage = `url(${employee.picture.large})`;
    document.querySelector('.modal-name').textContent = `${employee.name.first} ${employee.name.last}`;
    document.querySelector('.modal-email').textContent = employee.email;
    document.querySelector('.modal-city').textContent = employee.location.city;
    document.querySelector('.modal-cell').textContent = employee.cell;
    document.querySelector('.modal-address').textContent = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.postcode}`;
    document.querySelector('.modal-birthdate').textContent = `Birthday: ${new Date(employee.dob.date).toLocaleDateString()}`;

    document.querySelector('.overlay').classList.remove('hidden');
    document.querySelector('.modal').classList.remove('hidden');
}

// Close modal and hide it
const closeModalBtn = document.querySelector('.close-btn');
closeModalBtn.addEventListener('click', () => {
    document.querySelector('.overlay').classList.add('hidden');
    document.querySelector('.modal').classList.add('hidden');
});

// Hide modal when clicking outside the modal content
const overlay = document.querySelector('.overlay');
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.classList.add('hidden');
        document.querySelector('.modal').classList.add('hidden');
    }
});
