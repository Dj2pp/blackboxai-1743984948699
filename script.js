// User data storage (simulating MySQL database)
let users = JSON.parse(localStorage.getItem('users')) || [];

// Handle Signup
function handleSignup() {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorElement = document.getElementById('signupError');

  // Reset error message
  errorElement.textContent = '';
  errorElement.classList.remove('show');

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    showError(errorElement, 'All fields are required');
    return;
  }

  if (!isValidEmail(email)) {
    showError(errorElement, 'Invalid email format');
    return;
  }

  if (password.length < 8) {
    showError(errorElement, 'Password must be at least 8 characters');
    return;
  }

  if (password !== confirmPassword) {
    showError(errorElement, 'Passwords do not match');
    return;
  }

  // Check if user already exists
  if (users.some(user => user.email === email)) {
    showError(errorElement, 'Email already registered');
    return;
  }

  // Add new user (in a real app, password would be hashed)
  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  // Store current user session (simulated)
  localStorage.setItem('currentUser', JSON.stringify({ name, email }));

  // Redirect to homepage
  window.location.href = 'index.html';
}

// Handle Login
function handleLogin() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const errorElement = document.getElementById('loginError');

  // Reset error message
  errorElement.textContent = '';
  errorElement.classList.remove('show');

  // Validation
  if (!email || !password) {
    showError(errorElement, 'Email and password are required');
    return;
  }

  // Check credentials
  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    showError(errorElement, 'Invalid email or password');
    return;
  }

  // Store current user session (simulated)
  localStorage.setItem('currentUser', JSON.stringify({ 
    name: user.name, 
    email: user.email 
  }));

  // Redirect to homepage
  window.location.href = 'index.html';
}

// Helper Functions
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(element, message) {
  element.textContent = message;
  element.classList.add('show');
  
  // Hide error after 5 seconds
  setTimeout(() => {
    element.classList.remove('show');
  }, 5000);
}

// Check if user is logged in (for future use)
function checkLoginStatus() {
  return localStorage.getItem('currentUser') !== null;
}

// Logout function (for future use)
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Initialize page (for future use)
document.addEventListener('DOMContentLoaded', function() {
  // Check login status and update UI accordingly
  if (checkLoginStatus()) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    // Update UI to show logged in state
  }
});