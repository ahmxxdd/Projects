let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");
        
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove("active");
                document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
            });
        };
    });

    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 100);

    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
};

ScrollReveal({
    reset: true,
    distance: "80px",
    duration: 2000,
    delay: 200 
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img, .services-container, portfolio-box, .contact form", { origin: "bottom" });
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

const typed = new Typed(".multiple-text", {
    strings: ["Full Stack Developer", "Shell Scripter", "Cyber Security Analyst", "Mobile-App Developer", "Python Developer", "Java Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Get all the toggle buttons and their corresponding content sections
const toggleButtons = document.querySelectorAll('.toggleButton');

toggleButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Find the parent portfolio-box
    const portfolioBox = this.closest('.portfolio-box');
    const moreContent = portfolioBox.querySelector('.project-description-more');
    
    // Toggle the max-height and display the content smoothly
    if (moreContent.style.maxHeight === '0px' || !moreContent.style.maxHeight) {
      // Expand the content
      moreContent.style.maxHeight = `${moreContent.scrollHeight}px`;
      this.textContent = 'Show Less';  // Change button text to 'Show Less'
    } else {
      // Collapse the content
      moreContent.style.maxHeight = '0';
      this.textContent = 'Show More';  // Change button text to 'Show More'
    }
  });
});
