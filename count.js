function animateCount() {
  var elements = document.querySelectorAll('[count]');
  
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var startCount = parseInt(element.innerHTML);
    var endCount = parseInt(element.getAttribute('count'));
    var duration = 5000; // Duration in milliseconds
    var step = Math.ceil((endCount - startCount) / (duration / 50));
    var currentCount = startCount;
    
    var interval = setInterval(function() {
      currentCount += step;
      
      if (currentCount >= endCount) {
        clearInterval(interval);
        currentCount = endCount;
      }
      
      element.innerHTML = currentCount;
    }, 50);
  }
}

// Example usage
animateCount();
