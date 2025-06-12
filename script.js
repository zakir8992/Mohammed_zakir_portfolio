window.addEventListener("load", () => {
    // Hide spinner
    document.querySelector(".spinner-container").style.display = "none";
  
    // Trigger the formation animation
    const content = document.querySelector(".page-content");
    content.classList.remove("blurred"); // if still using blur
    content.classList.add("visible");
  });

// Resume popup functionality
function openForm() {
    document.getElementById('resumePopup').style.display = 'flex';
    document.querySelector('.page-content').classList.add('dimmed');
  }
  
  
  
  function openForm() {
    document.getElementById('resumePopup').style.display = 'flex';
    document.querySelector('.page-content').classList.add('dimmed');
  }
  
  function closeForm() {
    document.getElementById('resumePopup').style.display = 'none';
    document.getElementById('formMessage').textContent = '';
    document.querySelector('.page-content').classList.remove('dimmed');

    document.getElementById('name').value = "";
  document.getElementById('email').value = "";

  // Clear message
  document.getElementById('formMessage').textContent = "";
  }
  
 function submitForm() {
  const email = document.getElementById('email').value.trim();
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('formMessage');
  const role = document.querySelector('input[name="role"]:checked')?.value;

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
    body: new URLSearchParams({
      name: name,
      email: email,
      role: role
    }),
  }).then(res => res.text()).then(response => {
    message.style.color = 'lightgreen';
    message.textContent = "✅ Details submitted successfully!";
    setTimeout(() => {
      closeForm();
    }, 1500);
  }).catch(() => {
    message.style.color = 'red';
    message.textContent = "❌ Something went wrong. Try again.";
  });
}

  
function toggleCert(tabId) {
  document.querySelectorAll('.cert-section').forEach(section => section.classList.remove('active'));
  document.querySelectorAll('.cert-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  document.querySelector(`.cert-btn[onclick="toggleCert('${tabId}')"]`).classList.add('active');
}

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

// Hamburger toggle
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

// Auto-close menu when a nav link is clicked (mobile only)
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        document.getElementById("navLinks").classList.remove("active");
      }
    });
  });
});

const resumeBtn = document.querySelector(".buttonpop button");
resumeBtn.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    document.getElementById("navLinks").classList.remove("active");
  }
});

  
  
  
  
