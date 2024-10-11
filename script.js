document.addEventListener('DOMContentLoaded', function() {
  let therapyFit = document.getElementById('therapy-fit');
  let palmBg = document.getElementById('palm-bg');
  let container = therapyFit.parentElement;
  let containerHeight = container.offsetHeight;
  let palmBgHeight = palmBg.offsetHeight;
  let initialPalmBgPosition = containerHeight - palmBgHeight;
  let maxBottomTherapyFit = 200;
  let palmBgStopPoint = 0;
  const boxes = document.querySelectorAll('.box');
  const supportInfo = document.querySelector('.support-info');

  palmBg.style.top = initialPalmBgPosition + 'px';

  window.addEventListener('scroll', function() {
      var value = window.scrollY;

      var palmBgPosition = initialPalmBgPosition - (value * 0.1);
      if (palmBgPosition >= palmBgStopPoint) {
          palmBg.style.top = palmBgPosition + 'px';
      } else {
          palmBg.style.top = palmBgStopPoint + 'px';
      }

      var therapyFitPosition = value * 0.1;
      if (therapyFitPosition <= maxBottomTherapyFit) {
          therapyFit.style.top = therapyFitPosition + 'px';
      } else {
          therapyFit.style.top = maxBottomTherapyFit + 'px';
      }
  });

  const options = {
    root: null, // Use the viewport as the root
    threshold: 0.1 // Trigger when 10% of the box is visible
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
          } else {
              // Remove 'in-view' class when the box is not in view
              entry.target.classList.remove('in-view');
          }
      });
  }, options);

  // Observe each box
  boxes.forEach(box => {
      observer.observe(box);
  });
  observer.observe(supportInfo);
});


