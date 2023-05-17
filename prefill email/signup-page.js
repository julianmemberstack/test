window.onload = function() {
    // Get the value of the "email" parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
  
    // If the email parameter is not empty, set it as the value of the email field in the signup form
    if (email) {
      console.log('Pre-filling email field with value:', email);
      const emailField = document.querySelector('[ms-prefill="email"]');
      if (emailField) {
        emailField.value = email;
      } else {
        console.log('Could not find email field with ms-prefill attribute set to "email"');
      }
    } else {
      console.log('No email parameter found in URL');
    }
  };