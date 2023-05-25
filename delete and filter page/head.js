document.addEventListener("DOMContentLoaded", function() {
    const elementsToDelay = document.querySelectorAll('[ms-code-delay]');

    elementsToDelay.forEach(element => {
      element.style.visibility = "hidden"; // Hide the element initially
    });

    setTimeout(function() {
      elementsToDelay.forEach(element => {
        element.style.visibility = "visible"; // Make the element visible after the delay
        element.style.opacity = "0"; // Set the initial opacity to 0
        element.style.animation = "fadeIn 0.5s"; // Apply the fadeIn animation
        element.addEventListener("animationend", function() {
          element.style.opacity = "1"; // Set opacity to 1 at the end of the animation
        });
      });
    }, 1500);
  });

  document.addEventListener("DOMContentLoaded", async function() {
    const memberstack = window.$memberstackDom;
    
    // Retrieve the current member JSON data
    const member = await memberstack.getMemberJSON();
  
    // Save the member JSON as a local storage item
    localStorage.setItem("memberJSON", JSON.stringify(member));
  });

  