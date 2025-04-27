 /*
  This script uses Intersection Observer to animate the bars when
  they scroll into view. If needed, add a polyfill for older browsers.
*/

// Select all skill-bar-fill elements
const skillBars = document.querySelectorAll('.skill-bar-fill');

// Intersection Observer options
const observerOptions = {
  threshold: 0.3 // Trigger animation when 30% of each bar is visible
};

const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const barFill = entry.target;
      // Retrieve target percentage from data attribute
      const percentage = barFill.getAttribute('data-percentage');
      // Trigger the fill animation
      barFill.style.width = percentage + '%';
      // Unobserve so it doesn't re-trigger
      observer.unobserve(barFill);
    }
  });
}, observerOptions);

// Observe each skill bar
skillBars.forEach(bar => {
  skillObserver.observe(bar);
});





// Grab all elements with class 'count' the counting section
const counters = document.querySelectorAll('.count');
    
// Intersection Observer to trigger counting when in view
const options = {
  root: null,       // viewport
  rootMargin: '0px',
  threshold: 0.2    // trigger when 20% of the element is visible
};

const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Start counting
      const counter = entry.target;
      const updateCount = () => {
        const target = +counter.getAttribute('data-count');
        const current = +counter.innerText;
        // You can adjust speed by changing the divisor below
        const increment = Math.ceil(target / 100);

        if (current < target) {
          counter.innerText = current + increment;
          setTimeout(updateCount, 30); // 30ms for smoother animation
        } else {
          counter.innerText = target; // final value
        }
      };
      
      updateCount();
      // Once counted, unobserve so it doesn't trigger again
      observer.unobserve(counter);
    }
  });
};

const observer = new IntersectionObserver(callback, options);
counters.forEach(counter => observer.observe(counter));








// JavaScript sliding of the logo (Phone Mode Only)
document.addEventListener('DOMContentLoaded', function () {
  const logos = document.querySelectorAll('.logos-row .logo-item');
  let currentIndex = 0;

  function isPhoneMode() {
    return window.innerWidth <= 768; // Adjust as needed
  }

  // Function to display the active logo
  function showLogo(index) {
    logos.forEach((logo, i) => {
      if (i === index) {
        logo.classList.add('active');
        logo.style.display = "flex"; // Ensure the current one is visible
      } else {
        logo.classList.remove('active');
        logo.style.display = "none"; // Hide others
      }
    });
  }

  // Initialize: Show only the first logo
  if (isPhoneMode()) {
    showLogo(currentIndex);
  }

  // Variables to track touch positions
  let touchstartX = 0;
  let touchendX = 0;
  const threshold = 50; // Minimum swipe distance to register

  const logosRow = document.querySelector('.logos-row');

  function addTouchListeners() {
    if (isPhoneMode()) {
      logosRow.addEventListener('touchstart', touchStartHandler);
      logosRow.addEventListener('touchend', touchEndHandler);
    } else {
      logosRow.removeEventListener('touchstart', touchStartHandler);
      logosRow.removeEventListener('touchend', touchEndHandler);
    }
  }

  function touchStartHandler(e) {
    touchstartX = e.touches[0].clientX; // Get initial touch X position
  }

  function touchEndHandler(e) {
    touchendX = e.changedTouches[0].clientX; // Get final touch X position
    handleSwipe();
  }

  // Handle swipe logic
  function handleSwipe() {
    if (!isPhoneMode()) return; // Ensure function only runs in phone mode

    let swipeDistance = touchendX - touchstartX;

    if (swipeDistance < -threshold) {
      // Swipe Left: Show next logo
      currentIndex = (currentIndex + 1) % logos.length; // Loop to the beginning
      showLogo(currentIndex);
    } else if (swipeDistance > threshold) {
      // Swipe Right: Show previous logo
      currentIndex = (currentIndex - 1 + logos.length) % logos.length; // Loop to the end
      showLogo(currentIndex);
    }
  }

  // Run once on page load
  addTouchListeners();

  // Check for screen size changes (e.g., resizing the window)
  window.addEventListener('resize', addTouchListeners);
});






//JS for the testemonal
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const nextButton = document.querySelector('.testimonial-next');
  const prevButton = document.querySelector('.testimonial-prev');
  let currentSlide = 0;

  // Function to show the current slide
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = (i === index) ? 'block' : 'none';
    });
  }

  // Function to go to the next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
    showSlide(currentSlide);
  }

  // Function to go to the previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Loop back to the last slide
    showSlide(currentSlide);
  }

  // Function to check screen size and activate slider only on 1028px and below
  function handleScreenSizeChange() {
    if (window.matchMedia("(max-width: 1028px)").matches) {
      nextButton.addEventListener('click', nextSlide);
      prevButton.addEventListener('click', prevSlide);
      showSlide(currentSlide); // Show the first slide initially
    } else {
      // Reset styles if screen size is above 1028px
      slides.forEach(slide => slide.style.display = 'block');
      nextButton.removeEventListener('click', nextSlide);
      prevButton.removeEventListener('click', prevSlide);
    }
  }

  // Run on page load and whenever the screen is resized
  handleScreenSizeChange();
  window.addEventListener('resize', handleScreenSizeChange);
});










//1028px portfolio

document.addEventListener("DOMContentLoaded", function () {
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const prevButton = document.querySelector(".portfolio-nav.previous");
  const nextButton = document.querySelector(".portfolio-nav.next");

  let currentIndex = 0;
  const itemsPerView = 2;

  function showItems() {
    portfolioItems.forEach((item, index) => {
      if (index >= currentIndex && index < currentIndex + itemsPerView) {
        item.classList.add("visible");
      } else {
        item.classList.remove("visible");
      }
    });
  }

  function nextSlide() {
    if (currentIndex + itemsPerView < portfolioItems.length) {
      currentIndex += itemsPerView;
    } else {
      currentIndex = 0; // Loop back to start
    }
    showItems();
  }

  function prevSlide() {
    if (currentIndex - itemsPerView >= 0) {
      currentIndex -= itemsPerView;
    } else {
      currentIndex = portfolioItems.length - itemsPerView; // Loop to last set
    }
    showItems();
  }

  // Function to check screen size and add event listeners accordingly
  function handleScreenSizeChange() {
    if (window.matchMedia("(max-width: 1028px)").matches) {
      nextButton.addEventListener("click", nextSlide);
      prevButton.addEventListener("click", prevSlide);
      showItems(); // Show the first set on load
    } else {
      nextButton.removeEventListener("click", nextSlide);
      prevButton.removeEventListener("click", prevSlide);
    }
  }

  // Initial check and event listener for resizing
  handleScreenSizeChange();
  window.addEventListener("resize", handleScreenSizeChange);
}); 



//768x and below portfolio

document.addEventListener("DOMContentLoaded", function () {
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const prevButton = document.querySelector(".previous");
  const nextButton = document.querySelector(".next");
  let currentIndex = 0;

  function updatePortfolio() {
    if (window.innerWidth <= 768) {
      // Hide all items
      portfolioItems.forEach((item) => item.classList.remove("visible"));

      // Show only the current item
      portfolioItems[currentIndex].classList.add("visible");
    } else {
      // If screen is larger than 768px, show all items
      portfolioItems.forEach((item) => item.classList.add("visible"));
    }
  }

  nextButton.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      currentIndex = (currentIndex + 1) % portfolioItems.length; // Loop forward
      updatePortfolio();
    }
  });

  prevButton.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length; // Loop backward
      updatePortfolio();
    }
  });

  // Update portfolio on page load & screen resize
  updatePortfolio();
  window.addEventListener("resize", updatePortfolio);
}); 






document.addEventListener("DOMContentLoaded", function () {
  const serviceBoxes = document.querySelectorAll(".service-box");
  const prevBtn = document.querySelector(".service-prev");
  const nextBtn = document.querySelector(".service-next");

  let currentIndex = 0;

  function updateServices() {
    if (window.innerWidth >= 1030) { // Now starts from 1030px instead of 1024px
      serviceBoxes.forEach((box, index) => {
        if (index >= currentIndex && index < currentIndex + 3) {
          box.classList.add("active");
        } else {
          box.classList.remove("active");
        }
      });
    } else {
      serviceBoxes.forEach(box => box.classList.add("active")); // Show all on mobile (below 1030px)
    }
  }

  updateServices();

  nextBtn.addEventListener("click", function () {
    if (window.innerWidth >= 1030) {
      if (currentIndex + 3 < serviceBoxes.length) {
        currentIndex++;
      } else {
        currentIndex = 0; // Loop back to the first
      }
      updateServices();
    }
  });

  prevBtn.addEventListener("click", function () {
    if (window.innerWidth >= 1030) {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = serviceBoxes.length - 3; // Loop back to the last three
      }
      updateServices();
    }
  });

  // Update services on window resize
  window.addEventListener("resize", updateServices);
});







// SERVICE BOX (Affects Between 767px and 1028px)
document.addEventListener("DOMContentLoaded", function () {
  const serviceBoxes = document.querySelectorAll(".service-box");
  const prevButton = document.querySelector(".service-prev");
  const nextButton = document.querySelector(".service-next");

  let currentIndex = 0;
  const itemsPerView = 2; // Show 2 items at a time
  const totalBoxes = serviceBoxes.length;

  function updateVisibility() {
    serviceBoxes.forEach((box) => box.classList.remove("active"));

    for (let i = 0; i < itemsPerView; i++) {
      let index = (currentIndex + i) % totalBoxes;
      serviceBoxes[index].classList.add("active");
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + itemsPerView) % totalBoxes;
    updateVisibility();
  }

  function prevSlide() {
    currentIndex = (currentIndex - itemsPerView + totalBoxes) % totalBoxes;
    updateVisibility();
  }

  function handleResize() {
    if (window.innerWidth >= 767 && window.innerWidth <= 1028) {
      nextButton.addEventListener("click", nextSlide);
      prevButton.addEventListener("click", prevSlide);
      updateVisibility();
    } else {
      nextButton.removeEventListener("click", nextSlide);
      prevButton.removeEventListener("click", prevSlide);
    }
  }

  window.addEventListener("resize", handleResize);
  handleResize(); // Run on page load
});














//SERVICE BOX 768px
document.addEventListener("DOMContentLoaded", function () {
  const serviceBoxes = document.querySelectorAll(".service-box");
  const prevButton = document.querySelector(".service-prev");
  const nextButton = document.querySelector(".service-next");

  let currentIndex = 0;
  let itemsPerView = 1; // Only 1 service box displayed for 768px and below
  const totalBoxes = serviceBoxes.length;

  function updateVisibility() {
      if (window.innerWidth > 768) return; // Stop function if screen is larger than 768px

      serviceBoxes.forEach((box) => box.classList.remove("active"));

      let index = currentIndex % totalBoxes;
      serviceBoxes[index].classList.add("active");
  }

  nextButton.addEventListener("click", function () {
      if (window.innerWidth > 768) return; // Only works for 768px and below
      currentIndex = (currentIndex + 1) % totalBoxes;
      updateVisibility();
  });

  prevButton.addEventListener("click", function () {
      if (window.innerWidth > 768) return; // Only works for 768px and below
      currentIndex = (currentIndex - 1 + totalBoxes) % totalBoxes;
      updateVisibility();
  });

  // Adjust visibility only when screen is resized to 768px and below
  window.addEventListener("resize", function () {
      if (window.innerWidth <= 768) {
          updateVisibility();
      }
  });

  // Initialize only if the screen is 768px or below
  if (window.innerWidth <= 768) {
      updateVisibility();
  }
});





// Navbar drop-down menu when scrolling down
window.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector("header");
    const brand = document.querySelector(".brand");
    const nav = document.querySelector("nav");
    let lastScrollPosition = 0;
    let isNavbarVisible = false;

    function handleScroll() {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
            // Scrolling down and beyond 100px: Show the header if not already visible
            if (!isNavbarVisible) {
                navbar.style.transition = "top 1.5s ease"; // Smooth drop-down effect
                navbar.classList.add("sticky", "drop-down");
                brand.classList.add("scrolled"); // Optional: change brand styles on scroll
                nav.classList.add("scrolled"); // Optional: change nav styles on scroll
                isNavbarVisible = true;
            }
        } else if (currentScrollPosition < lastScrollPosition && currentScrollPosition > 100) {
            // Scrolling up: Keep the navbar visible
            if (!isNavbarVisible) {
                navbar.style.transition = "top 2s ease"; // Smooth drop-down effect
                navbar.classList.add("sticky", "drop-down");
                brand.classList.add("scrolled");
                nav.classList.add("scrolled");
                isNavbarVisible = true;
            }
        }

        if (currentScrollPosition === 0) {
            // At the very top of the page: Return the navbar to its original state
            navbar.classList.remove("sticky", "drop-down");
            navbar.style.top = "0"; // Ensure no negative or leftward transition
            brand.classList.remove("scrolled");
            nav.classList.remove("scrolled");
            isNavbarVisible = false;
        }

        lastScrollPosition = currentScrollPosition;
    }

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);

    // Ensure navbar overlays all elements
    navbar.style.zIndex = "9999";
});
