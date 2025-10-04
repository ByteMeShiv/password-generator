document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const passwordOutput = document.getElementById('passwordOutput');
    const lengthInput = document.getElementById('length');

    // The character set for the password
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

    function generatePassword(length) {
        // Create an array to hold random values
        const randomValues = new Uint8Array(length);
        
        // Fill the array with cryptographically secure random numbers
        window.crypto.getRandomValues(randomValues);
        
        let password = '';
        for (let i = 0; i < length; i++) {
            // Use the random number to pick a character from the set
            password += chars[randomValues[i] % chars.length];
        }
        
        return password;
    }

    // Event listener for the generate button
    generateBtn.addEventListener('click', () => {
        const length = parseInt(lengthInput.value, 10);
        
        // Basic validation
        if (isNaN(length) || length < 4 || length > 128) {
            alert('Please enter a valid length between 4 and 128.');
            return;
        }
        
        const newPassword = generatePassword(length);
        passwordOutput.value = newPassword;
    });

    // Event listener for the copy button
    copyBtn.addEventListener('click', () => {
        if (passwordOutput.value) {
            // Use the modern Navigator Clipboard API
            navigator.clipboard.writeText(passwordOutput.value).then(() => {
                // Give feedback to the user
                copyBtn.textContent = '✅';
                setTimeout(() => {
                    copyBtn.textContent = '📋';
                }, 2000); // Reset after 2 seconds
            }).catch(err => {
                alert('Failed to copy password.');
                console.error('Clipboard error:', err);
            });
        }
    });
});