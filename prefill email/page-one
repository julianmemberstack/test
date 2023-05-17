const form = document.querySelector('[ms="form"]');
const field = document.querySelector('[ms="field"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const email = field.value;
  const redirectUrl = form.getAttribute('ms-redirect');
  const actionUrl = redirectUrl + '?email=' + encodeURIComponent(email);
  
  window.location.href = actionUrl;
});