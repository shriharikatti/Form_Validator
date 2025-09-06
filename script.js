document.addEventListener('DOMContentLoaded', () => {
  // Get all the necessary elements from the DOM
  const form = document.getElementById('form');
  const firstname_input = document.getElementById('Firstname-input');
  const email_input = document.getElementById('email-input');
  const password_input = document.getElementById('password-input');
  const repeat_password_input = document.getElementById(
    'Repeat-password-input'
  );
  const error_message = document.getElementById('error-message');
  const submitButton = document.querySelector('button[type="submit"]');

  // Track which fields have been interacted with
  const fieldInteracted = {
    firstname: false,
    email: false,
    password: false,
    repeatPassword: false,
  };

  // Flag to track if form was submitted
  let formSubmitted = false;

  function validateForm() {
    let formIsValid = true;
    let errorMessages = [];

    // Clear all previous errors and classes
    error_message.textContent = '';
    firstname_input.parentElement.classList.remove('incorrect');
    email_input.parentElement.classList.remove('incorrect');
    password_input.parentElement.classList.remove('incorrect');
    repeat_password_input.parentElement.classList.remove('incorrect');

    // Validation patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    // Individual field validations (run regardless of other fields)

    // Email validation - validate if email has content and has been interacted with
    if (email_input.value.trim() !== '' && fieldInteracted.email) {
      if (!emailRegex.test(email_input.value)) {
        formIsValid = false;
        errorMessages.push('Please enter a valid email address.');
        email_input.parentElement.classList.add('incorrect');
      }
    }

    // Password validation - validate if password has content and has been interacted with
    if (password_input.value.trim() !== '' && fieldInteracted.password) {
      if (!passwordRegex.test(password_input.value)) {
        formIsValid = false;
        errorMessages.push(
          'Password must be at least 8 characters, contain a number, a unique symbol, and both upper and lowercase letters.'
        );
        password_input.parentElement.classList.add('incorrect');
      }
    }

    // Password match validation - validate if both passwords have content and have been interacted with
    if (
      password_input.value.trim() !== '' &&
      repeat_password_input.value.trim() !== '' &&
      fieldInteracted.repeatPassword
    ) {
      if (password_input.value !== repeat_password_input.value) {
        formIsValid = false;
        errorMessages.push('Passwords do not match.');
        password_input.parentElement.classList.add('incorrect');
        repeat_password_input.parentElement.classList.add('incorrect');
      }
    }

    // Check if all fields are filled
    const allFieldsFilled =
      firstname_input.value.trim() !== '' &&
      email_input.value.trim() !== '' &&
      password_input.value.trim() !== '' &&
      repeat_password_input.value.trim() !== '';

    if (!allFieldsFilled) {
      formIsValid = false;

      // Only show "fill all fields" error on form submission
      if (formSubmitted) {
        // Only show this error if no other specific errors exist
        if (errorMessages.length === 0) {
          error_message.textContent = 'Please fill in all the fields.';
          if (firstname_input.value.trim() === '')
            firstname_input.parentElement.classList.add('incorrect');
          if (email_input.value.trim() === '')
            email_input.parentElement.classList.add('incorrect');
          if (password_input.value.trim() === '')
            password_input.parentElement.classList.add('incorrect');
          if (repeat_password_input.value.trim() === '')
            repeat_password_input.parentElement.classList.add('incorrect');
        }
      }
    }

    // Show the first error message if any
    if (errorMessages.length > 0) {
      error_message.textContent = errorMessages[0];
    }

    // Update button state - only enable if all fields are valid AND filled
    updateButtonState(formIsValid && allFieldsFilled);
    return formIsValid && allFieldsFilled;
  }

  function updateButtonState(isValid) {
    submitButton.disabled = !isValid;
    submitButton.style.opacity = isValid ? '1' : '0.5';
    submitButton.style.cursor = isValid ? 'pointer' : 'not-allowed';
  }

  // Add event listeners to track field interactions
  firstname_input.addEventListener('input', () => {
    fieldInteracted.firstname = true;
    validateForm();
  });

  firstname_input.addEventListener('blur', () => {
    fieldInteracted.firstname = true;
    validateForm();
  });

  email_input.addEventListener('input', () => {
    fieldInteracted.email = true;
    validateForm();
  });

  email_input.addEventListener('blur', () => {
    fieldInteracted.email = true;
    validateForm();
  });

  password_input.addEventListener('input', () => {
    fieldInteracted.password = true;
    validateForm();
  });

  password_input.addEventListener('blur', () => {
    fieldInteracted.password = true;
    validateForm();
  });

  repeat_password_input.addEventListener('input', () => {
    fieldInteracted.repeatPassword = true;
    validateForm();
  });

  repeat_password_input.addEventListener('blur', () => {
    fieldInteracted.repeatPassword = true;
    validateForm();
  });

  // Form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formSubmitted = true;

    // Mark all fields as interacted on submission
    Object.keys(fieldInteracted).forEach((key) => {
      fieldInteracted[key] = true;
    });

    if (validateForm()) {
      alert('Form submitted successfully!');
    }
  });

  // Initial state - disable button, no errors
  updateButtonState(false);
});
