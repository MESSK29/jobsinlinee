document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Validation: Check if all fields are filled
    if (!firstName || !email || !phone) {
        alert('Please fill in all fields!');
        return;
    }

    // Validation: Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    // Validation: Check phone number format (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number!');
        return;
    }

    // Success message (optional, can be removed if redirecting immediately)
    alert(`Welcome, ${firstName}! Your signup was successful.\nEmail: ${email}\nPhone: ${phone}`);

    // Reset the form
    this.reset();

    // Redirect to the main website with firstName as a query parameter
    window.location.href = `index1.html?firstName=${encodeURIComponent(firstName)}`;
});

// Input focus/blur effects for labels
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('label').style.transform = 'translateY(-5px)';
    });
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.querySelector('label').style.transform = 'translateY(0)';
        }
    });
});