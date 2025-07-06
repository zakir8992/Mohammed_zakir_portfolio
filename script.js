// ===== Page Load: Spinner + Animation =====
window.addEventListener("load", () => {
  document.querySelector(".spinner-container").style.display = "none";
  document.querySelector(".page-content").classList.add("visible");
  updateCertDots('servicenowCarousel', 'servicenowDots');
  updateCertDots('dataCarousel', 'dataDots');
  updateProjectDots('servicenowProjectsCarousel', 'servicenowProjectsDots');
  updateProjectDots('dataProjectsCarousel', 'dataProjectsDots');
});

// ===== Resume Form =====
function openForm() {
  document.getElementById('resumePopup').style.display = 'flex';
  document.querySelector('.page-content').classList.add('dimmed');
}
function closeForm() {
  document.getElementById('resumePopup').style.display = 'none';
  document.querySelector('.page-content').classList.remove('dimmed');
  document.getElementById('name').value = "";
  document.getElementById('email').value = "";
  document.getElementById('formMessage').textContent = "";
}
function submitForm() {
  const email = document.getElementById('email').value.trim();
  const name = document.getElementById('name').value.trim();
  const role = document.querySelector('input[name="role"]:checked')?.value;
  const message = document.getElementById('formMessage');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !role) {
    message.style.color = 'orange';
    message.textContent = "Please fill out all fields.";
    return;
  }

  if (!emailRegex.test(email)) {
    message.style.color = 'red';
    message.textContent = "Please enter a valid email address.";
    return;
  }

  message.style.color = 'lightgreen';
  message.textContent = "✅ Sending data...";

  fetch('https://script.google.com/macros/s/AKfycbzl7gidVvLzCTUNymEW7pMt8CcErCN7HunBEzPb1zQtVwWArlQ7m4jGX0soXUVUhff1/exec', {
    method: "POST",
    body: new URLSearchParams({ name, email, role })
  })
    .then(res => res.text())
    .then(() => {
      message.style.color = 'lightgreen';
      message.textContent = "✅ Details submitted successfully!";
      setTimeout(closeForm, 1500);
    })
    .catch(() => {
      message.style.color = 'red';
      message.textContent = "❌ Something went wrong. Try again.";
    });
}

// ===== Hamburger Menu =====
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        document.getElementById("navLinks").classList.remove("active");
      }
    });
  });

  const resumeBtn = document.querySelector(".buttonpop button");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        document.getElementById("navLinks").classList.remove("active");
      }
    });
  }
});

// ===== Certification Toggle =====
function toggleCert(tabId) {
  document.querySelectorAll('.cert-section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('.cert-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  document.querySelector(`.cert-btn[onclick="toggleCert('${tabId}')"]`).classList.add('active');
}

// ===== Certification Scroll (left/right arrows) =====
function scrollCert(carouselId, direction) {
  const slide = document.getElementById(carouselId);
  const scrollAmount = slide.offsetWidth;
  slide.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });

  const dotsId = (carouselId === 'servicenowCarousel') ? 'servicenowDots' : 'dataDots';
  setTimeout(() => updateCertDots(carouselId, dotsId), 400);
}

// ===== Certification Dots =====
function updateCertDots(carouselId, dotsId) {
  const slide = document.getElementById(carouselId);
  const dots = document.getElementById(dotsId);
  const certs = slide.querySelectorAll('.cert');
  const index = Math.round(slide.scrollLeft / slide.offsetWidth);

  dots.innerHTML = '';
  certs.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === index) dot.classList.add('active');
    dots.appendChild(dot);
  });
}

document.getElementById('servicenowCarousel')?.addEventListener('scroll', () => {
  updateCertDots('servicenowCarousel', 'servicenowDots');
});
document.getElementById('dataCarousel')?.addEventListener('scroll', () => {
  updateCertDots('dataCarousel', 'dataDots');
});

// ===== Projects Tab Toggle =====
function toggleProject(projectId) {
  document.querySelectorAll('.project-carousel-section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('.project-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(projectId).classList.add('active');
  event.target.classList.add('active');
}

// ===== Project Carousel Logic =====
function scrollProject(carouselId, direction) {
  const carousel = document.getElementById(carouselId);
  const scrollAmount = carousel.offsetWidth;
  carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function updateProjectDots(carouselId, dotsId) {
  const carousel = document.getElementById(carouselId);
  const dotsContainer = document.getElementById(dotsId);
  const items = carousel.querySelectorAll('.project-card');
  const index = Math.round(carousel.scrollLeft / carousel.offsetWidth);

  dotsContainer.innerHTML = '';
  items.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === index) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });
}

// Scroll listeners for project carousels
document.addEventListener("DOMContentLoaded", () => {
  const snow = document.getElementById('servicenowProjectsCarousel');
  if (snow) snow.addEventListener('scroll', () => {
    updateProjectDots('servicenowProjectsCarousel', 'servicenowProjectsDots');
  });

  const data = document.getElementById('dataProjectsCarousel');
  if (data) data.addEventListener('scroll', () => {
    updateProjectDots('dataProjectsCarousel', 'dataProjectsDots');
  });
});

// Initial load
window.addEventListener('load', () => {
  updateProjectDots('servicenowProjectsCarousel', 'servicenowProjectsDots');
  updateProjectDots('dataProjectsCarousel', 'dataProjectsDots');
});

// ===== Projects Tab Toggle =====
function toggleProject(projectId, event) {
  document.querySelectorAll('.project-carousel-section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('.project-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(projectId).classList.add('active');
  if (event && event.target) event.target.classList.add('active');
}

