// =======================================
// CUSTOMER REGISTRATION SYSTEM
// Part 1
// =======================================

// Customer Array
let customers = JSON.parse(localStorage.getItem("customers")) || [];

// Form Elements
const form = document.getElementById("customerForm");

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const countryInput = document.getElementById("country");
const cityInput = document.getElementById("city");
const addressInput = document.getElementById("address");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const tableBody = document.getElementById("customerTable");

// ============================
// Save Customers
// ============================

function saveCustomers() {
    localStorage.setItem("customers", JSON.stringify(customers));
}

// ============================
// Clear Form
// ============================

function clearForm() {

    form.reset();

}

// ============================
// Validation
// ============================

function validateForm() {

    if (nameInput.value.trim() === "") {

        alert("Please enter your name.");

        return false;

    }

    if (ageInput.value < 13 || ageInput.value > 120) {

        alert("Age must be between 13 and 120.");

        return false;

    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value)) {

        alert("Please enter a valid email.");

        return false;

    }

    const phonePattern =
        /^[0-9+\-\s]{8,15}$/;

    if (!phonePattern.test(phoneInput.value)) {

        alert("Please enter a valid phone number.");

        return false;

    }

    if (passwordInput.value.length < 8) {

        alert("Password must contain at least 8 characters.");

        return false;

    }

    if (passwordInput.value !== confirmPasswordInput.value) {

        alert("Passwords do not match.");

        return false;

    }

    return true;

}

// ============================
// Add Customer
// ============================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    if (!validateForm()) return;

    const customer = {

        id: Date.now(),

        name: nameInput.value,

        age: ageInput.value,

        gender: genderInput.value,

        email: emailInput.value,

        phone: phoneInput.value,

        country: countryInput.value,

        city: cityInput.value,

        address: addressInput.value

    };

    customers.push(customer);

    saveCustomers();

    displayCustomers();

    clearForm();

    alert("Customer Registered Successfully!");

});

// ============================
// Display Customers
// ============================

function displayCustomers() {

    tableBody.innerHTML = "";

    customers.forEach((customer, index) => {

        tableBody.innerHTML += `

        <tr>

            <td>${customer.id}</td>

            <td>${customer.name}</td>

            <td>${customer.age}</td>

            <td>${customer.gender}</td>

            <td>${customer.email}</td>

            <td>${customer.phone}</td>

            <td>${customer.country}</td>

            <td>${customer.city}</td>

            <td>

                <button class="edit-btn" onclick="editCustomer(${index})">

                    Edit

                </button>

                <button class="delete-btn" onclick="deleteCustomer(${index})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ============================
// Load Customers
// ============================

displayCustomers();



// =======================================
// EDIT CUSTOMER
// =======================================

function editCustomer(index) {

    const customer = customers[index];

    nameInput.value = customer.name;
    ageInput.value = customer.age;
    genderInput.value = customer.gender;
    emailInput.value = customer.email;
    phoneInput.value = customer.phone;
    countryInput.value = customer.country;
    cityInput.value = customer.city;
    addressInput.value = customer.address;

    // Remove old customer.
    // When the form is submitted again,
    // it will be added with the updated values.
    customers.splice(index, 1);

    saveCustomers();
    displayCustomers();
    updateDashboard();

}

// =======================================
// DELETE CUSTOMER
// =======================================

function deleteCustomer(index){

    if(confirm("Delete this customer?")){

        customers.splice(index,1);

        saveCustomers();

        displayCustomers();

        updateDashboard();

    }

}

// =======================================
// UPDATE DASHBOARD
// =======================================

function updateDashboard(){

    const total = customers.length;

    const male = customers.filter(c => c.gender === "Male").length;

    const female = customers.filter(c => c.gender === "Female").length;

    let averageAge = 0;

    if(total > 0){

        const ageSum = customers.reduce((sum,c)=>{

            return sum + Number(c.age);

        },0);

        averageAge = (ageSum / total).toFixed(1);

    }

    document.getElementById("totalCustomers").textContent = total;

    document.getElementById("maleCustomers").textContent = male;

    document.getElementById("femaleCustomers").textContent = female;

    document.getElementById("averageAge").textContent = averageAge;

}

updateDashboard();

// =======================================
// REFRESH AFTER REGISTER
// =======================================

const oldDisplay = displayCustomers;

displayCustomers = function(){

    oldDisplay();

    updateDashboard();

};
// ======================================
// SEARCH CUSTOMERS
// ======================================

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {

    const value = searchInput.value.toLowerCase();

    const rows = document.querySelectorAll("#customerTable tr");

    rows.forEach(row => {

        const name = row.children[1].textContent.toLowerCase();

        if (name.includes(value)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

});

// ======================================
// SORT CUSTOMERS
// ======================================

const sortSelect = document.getElementById("sortSelect");

sortSelect.addEventListener("change", function () {

    const option = sortSelect.value;

    if (option === "name") {

        customers.sort((a, b) => a.name.localeCompare(b.name));

    }

    else if (option === "age") {

        customers.sort((a, b) => Number(a.age) - Number(b.age));

    }

    saveCustomers();

    displayCustomers();

});

// ======================================
// DARK MODE
// ======================================

const themeToggle = document.getElementById("themeToggle");

const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {

    body.classList.add("dark");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}

themeToggle.addEventListener("click", function () {

    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});




// ======================================
// MOBILE HAMBURGER MENU
// ======================================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("active");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

        });

    });

}

// ======================================
// BACK TO TOP BUTTON
// ======================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        backToTop.style.display = "block";

    } else {

        backToTop.style.display = "none";

    }

});

backToTop.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// ======================================
// SMOOTH SCROLLING
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ======================================
// SIMPLE DASHBOARD COUNTER ANIMATION
// ======================================

function animateCounter(id, endValue) {

    const element = document.getElementById(id);

    if (!element) return;

    let current = 0;

    const increment = endValue / 40;

    const timer = setInterval(() => {

        current += increment;

        if (current >= endValue) {

            element.textContent = endValue;

            clearInterval(timer);

        } else {

            element.textContent = Math.floor(current);

        }

    }, 20);

}

// ======================================
// REFRESH DASHBOARD WITH ANIMATION
// ======================================

const oldDashboard = updateDashboard;

updateDashboard = function () {

    oldDashboard();

    animateCounter(
        "totalCustomers",
        customers.length
    );

    animateCounter(
        "maleCustomers",
        customers.filter(c => c.gender === "Male").length
    );

    animateCounter(
        "femaleCustomers",
        customers.filter(c => c.gender === "Female").length
    );

};

// ======================================
// INITIALIZE WEBSITE
// ======================================

displayCustomers();

updateDashboard();

console.log("Customer Registration System Loaded Successfully!");