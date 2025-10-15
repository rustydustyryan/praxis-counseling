document.addEventListener('DOMContentLoaded', function() {
  const therapyFit = document.getElementById('therapy-fit');
  const palmBg = document.getElementById('palm-bg');
  const boxes = document.querySelectorAll('.box');
  const supportInfo = document.querySelector('.support-info');
  
  // Use a media query to define what "mobile" means
  const mobileMediaQuery = window.matchMedia('(max-width: 930px)');
  
  // Define variables that will be used in the parallax calculation
  let containerHeight, palmBgHeight, initialPalmBgPosition, maxBottomTherapyFit, palmBgStopPoint;

  // Function to set up and run the parallax effect
  function setupParallax() {
    // Check if the screen is *not* mobile
    if (!mobileMediaQuery.matches) {
      // Re-fetch parent element and recalculate values if window size changes
      const container = therapyFit.parentElement;
      containerHeight = container.offsetHeight;
      palmBgHeight = palmBg.offsetHeight;
      initialPalmBgPosition = containerHeight - palmBgHeight;
      maxBottomTherapyFit = 200;
      palmBgStopPoint = 0;
      
      palmBg.style.top = initialPalmBgPosition + 'px';
      
      // Add the scroll event listener
      window.addEventListener('scroll', handleParallaxScroll);
    } else {
      // If mobile, ensure inline styles are reset and remove the listener
      therapyFit.style.top = '';
      palmBg.style.top = '';
      
      window.removeEventListener('scroll', handleParallaxScroll);
    }
  }

  // Define the scroll handling logic in a named function
  function handleParallaxScroll() {
    const value = window.scrollY;

    const palmBgPosition = initialPalmBgPosition - value * 0.1;
    if (palmBgPosition >= palmBgStopPoint) {
      palmBg.style.top = palmBgPosition + 'px';
    } else {
      palmBg.style.top = palmBgStopPoint + 'px';
    }

    const therapyFitPosition = value * 0.1;
    if (therapyFitPosition <= maxBottomTherapyFit) {
      therapyFit.style.top = therapyFitPosition + 'px';
    } else {
      therapyFit.style.top = maxBottomTherapyFit + 'px';
    }
  }
  
  // Initial check on page load
  setupParallax();

  // Listen for changes in screen size and re-evaluate
  mobileMediaQuery.addEventListener('change', setupParallax);

  // Intersection Observer for boxes (unrelated to parallax issue)
  const options = {
    root: null,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, options);

  boxes.forEach(box => {
    observer.observe(box);
  });
  observer.observe(supportInfo);
});
