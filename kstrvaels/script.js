/* =========================================================
   KS TRAVELS JAVASCRIPT
========================================================= */


/* =========================================================
   PRELOADER
========================================================= */

document.body.classList.add("loading");

window.addEventListener("load", () => {

  const preloader = document.getElementById("preloader");

  setTimeout(() => {

    preloader.classList.add("hide");

    document.body.classList.remove("loading");

    revealElements();

  }, 700);

});


/* =========================================================
   NAVBAR SCROLL
========================================================= */

const navbar = document.getElementById("navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });

}

/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("show")) {

            if (icon) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            }

        } else {

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    });


    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });

}


/* Close menu after clicking */

document.querySelectorAll(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("show");

    const icon = menuBtn.querySelector("i");

    icon.classList.remove("fa-xmark");

    icon.classList.add("fa-bars");

  });

});


/* =========================================================
   ACTIVE NAV LINK
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 150;

    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {

      current = section.getAttribute("id");

    }

  });


  navItems.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {

      link.classList.add("active");

    }

  });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

function revealElements() {

  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(

    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

          observer.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );


  elements.forEach(element => {

    observer.observe(element);

  });

}


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters = document.querySelectorAll(".counter");

let countersStarted = false;

const counterObserver = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting && !countersStarted) {

        countersStarted = true;

        counters.forEach(counter => {

          const target = Number(
            counter.getAttribute("data-target")
          );

          let current = 0;

          const increment = Math.max(
            1,
            Math.ceil(target / 80)
          );

          const updateCounter = () => {

            current += increment;

            if (current >= target) {

              counter.textContent = target;

              return;

            }

            counter.textContent = current;

            requestAnimationFrame(updateCounter);

          };

          updateCounter();

        });

      }

    });

  },

  {
    threshold: 0.4
  }

);


const statsSection = document.querySelector(".stats-section");

if (statsSection) {

  counterObserver.observe(statsSection);

}


/* =========================================================
   SMOOTH ANCHOR FIX
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function (e) {

    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement = document.getElementById("currentYear");

if (yearElement) {

  yearElement.textContent = new Date().getFullYear();

}


/* =========================================================
   PAGE LOAD TOP FIX
   Prevent old hash from opening automatically
========================================================= */

window.addEventListener("load", () => {

  if (window.location.hash) {

    history.replaceState(
      null,
      "",
      window.location.pathname
    );

    window.scrollTo(0, 0);

  }

});


/* =========================================================
   IMAGE PARALLAX
========================================================= */

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

  if (!hero) return;

  const scrollValue = window.scrollY;

  if (scrollValue < hero.offsetHeight) {

    hero.style.backgroundPosition =
      `center ${scrollValue * 0.25}px`;

  }

});


/* =========================================================
   VEHICLE CARD TILT
========================================================= */

const cards = document.querySelectorAll(".vehicle-card");

cards.forEach(card => {

  card.addEventListener("mousemove", e => {

    const rect = card.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX =
      ((y - centerY) / centerY) * -2;

    const rotateY =
      ((x - centerX) / centerX) * 2;

    card.style.transform =
      `perspective(800px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-8px)`;

  });


  card.addEventListener("mouseleave", () => {

    card.style.transform = "";

  });

});


/* =========================================================
   INITIAL REVEAL
========================================================= */

setTimeout(() => {

  revealElements();

}, 100);    


// ===============================
// PREMIUM TYPING EFFECT
// ===============================

const typingText = document.getElementById("typing-text");

const typingWords = [
    {
        gold: "Travel with ",
        white: "KS Travels."
    },
    {
        gold: "Travel with ",
        white: "Comfort."
    },
    {
        gold: "Travel with ",
        white: "Confidence."
    },
    {
        gold: "Travel with ",
        white: "Trust."
    }
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typingEffect() {

    if (!typingText) return;

    const current = typingWords[wordIndex];

    const fullText = current.gold + current.white;

    if (!deleting) {

        characterIndex++;

        const visibleText = fullText.substring(0, characterIndex);

        const goldLength = current.gold.length;

        if (characterIndex <= goldLength) {

            typingText.innerHTML =
                `<span class="typing-gold">${visibleText}</span>`;

        } else {

            const goldPart = current.gold;
            const whitePart = visibleText.substring(goldLength);

            typingText.innerHTML =
                `<span class="typing-gold">${goldPart}</span>` +
                `<span class="typing-white">${whitePart}</span>`;
        }

        typingText.innerHTML +=
            `<span class="typing-cursor">|</span>`;

        if (characterIndex >= fullText.length) {

            deleting = true;

            setTimeout(typingEffect, 1800);

        } else {

            setTimeout(typingEffect, 80);
        }

    } else {

        characterIndex--;

        const visibleText = fullText.substring(0, characterIndex);

        const goldLength = current.gold.length;

        if (characterIndex <= goldLength) {

            typingText.innerHTML =
                `<span class="typing-gold">${visibleText}</span>`;

        } else {

            const goldPart = current.gold;
            const whitePart = visibleText.substring(goldLength);

            typingText.innerHTML =
                `<span class="typing-gold">${goldPart}</span>` +
                `<span class="typing-white">${whitePart}</span>`;
        }

        typingText.innerHTML +=
            `<span class="typing-cursor">|</span>`;

        if (characterIndex <= 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= typingWords.length) {
                wordIndex = 0;
            }

            setTimeout(typingEffect, 400);

        } else {

            setTimeout(typingEffect, 45);
        }
    }
}

typingEffect();



/* =========================================================
   WHATSAPP BOOKING FORM
========================================================= */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const pickup = document.getElementById("pickupLocation").value.trim();
        const drop = document.getElementById("dropLocation").value.trim();
        const date = document.getElementById("travelDate").value;
        const time = document.getElementById("travelTime").value;
        const vehicle = document.getElementById("vehicleType").value;
        const passengers = document.getElementById("passengers").value;
        const message = document.getElementById("additionalMessage").value.trim();

        if (
            !name ||
            !phone ||
            !pickup ||
            !drop ||
            !date ||
            !time ||
            !vehicle ||
            !passengers
        ) {
            alert("Please fill all required fields.");
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        const whatsappMessage =
`🚗 KS TRAVELS - NEW BOOKING

━━━━━━━━━━━━━━━━━━
CUSTOMER DETAILS

Name: ${name}
Mobile: ${phone}

━━━━━━━━━━━━━━━━━━
JOURNEY DETAILS

Pickup Location:
${pickup}

Drop Location:
${drop}

Travel Date:
${date}

Travel Time:
${time}

━━━━━━━━━━━━━━━━━━
VEHICLE DETAILS

Vehicle: ${vehicle}
Passengers: ${passengers}

━━━━━━━━━━━━━━━━━━
ADDITIONAL MESSAGE

${message || "No additional requirements."}

━━━━━━━━━━━━━━━━━━

Please check availability and confirm my booking.

Thank you,
KS Travels`;

        const whatsappNumber = "916380819466";

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(whatsappMessage);

        window.open(whatsappURL, "_blank");

        this.reset();

    });
}


/* =========================================================
   TODAY DATE
========================================================= */

const dateInput = document.getElementById("travelDate");

if (dateInput) {

    const today = new Date();

    const yyyy = today.getFullYear();

    const mm = String(today.getMonth() + 1).padStart(2, "0");

    const dd = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${yyyy}-${mm}-${dd}`;

}