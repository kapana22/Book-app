document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');
    
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Get form values
        const username = registrationForm.elements['username'].value;
        const email = registrationForm.elements['email'].value;
        const password = registrationForm.elements['password'].value;
        const confirmPassword = registrationForm.elements['confirm-password'].value;
        
        // Validate form data
        if (!username || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // You can send the registration data to your server here
        
        // Clear form fields
        registrationForm.reset();
        
        // Redirect to login page or show success message
        alert('Registration successful! You can now login.');
    });
});
