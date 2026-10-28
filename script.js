// Personalise the links and image below before publishing.
const PROFILE = {
  // Add your real profile URLs, e.g. https://www.linkedin.com/in/your-handle/
  linkedin: "https://www.linkedin.com/",
  instagram: "https://www.instagram.com/",
  // Keep this as your own image path, or replace it with a public image URL.
  photo: "assets/durvesh-photo.jpg"
};

document.getElementById("linkedinLink").href = PROFILE.linkedin;
document.getElementById("contactLinkedin").href = PROFILE.linkedin;
document.getElementById("instagramLink").href = PROFILE.instagram;
document.getElementById("contactInstagram").href = PROFILE.instagram;
document.getElementById("profilePhoto").src = PROFILE.photo;
document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
  menuToggle.textContent = opened ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

// Filter skills by category.
document.querySelectorAll("#skillFilters .filter-chip").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("#skillFilters .filter-chip").forEach(chip => chip.classList.remove("active"));
    button.classList.add("active");
    const category = button.dataset.filter;
    document.querySelectorAll("#skillsGrid .skill-card").forEach(card => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  });
});

// Rotating hero role.
const roles = ["AI automation", "enterprise applications", "PLM solutions", "video editing"];
const roleElement = document.getElementById("typedRole");
let roleIndex = 0;
setInterval(() => {
  roleIndex = (roleIndex + 1) % roles.length;
  roleElement.animate([{opacity: 0, transform: "translateY(5px)"}, {opacity: 1, transform: "translateY(0)"}], {duration: 350});
  roleElement.textContent = roles[roleIndex];
}, 2600);

// Update active navigation link while scrolling.
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, {rootMargin: "-30% 0px -60% 0px"});
sections.forEach(section => observer.observe(section));
