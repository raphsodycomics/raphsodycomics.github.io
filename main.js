document.addEventListener("DOMContentLoaded", function () {

    const menuButton = document.getElementById("menuButton");
    const siteMenu = document.getElementById("siteMenu");
    const readButton = document.getElementById("readButton");

    /* TOGGLE MENU */
    if (menuButton && siteMenu) {
        menuButton.addEventListener("click", function () {
            if (siteMenu.style.display === "block") {
                siteMenu.style.display = "none";
            } else {
                siteMenu.style.display = "block";
            }
        });
    }

    /* CLOSE MENU WHEN CLICKING OUTSIDE */
    document.addEventListener("click", function (event) {
        if (
            siteMenu &&
            !siteMenu.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            siteMenu.style.display = "none";
        }
    });

    /* READ BUTTON NAVIGATION */
    if (readButton) {
        readButton.addEventListener("click", function () {
            window.location.href = "comics.html";
        });
    }

});

/* COMIC SLIDESHOW */
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });
}

if (prevBtn) {
    prevBtn.addEventListener("click", function () {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
}

if (nextBtn) {
    nextBtn.addEventListener("click", function () {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });
}

// Initialize first slide
showSlide(currentSlide);



/* PAYSTACK */
document.getElementById('paystack-button').addEventListener('click', function(){
  var handler = PaystackPop.setup({
    key: 'YOUR_PUBLIC_KEY_HERE', // Replace with your Paystack public key
    email: 'supporter@example.com', // You can replace with dynamic user email
    amount: 5000, // Amount in kobo (₦50 = 5000)
    currency: "NGN",
    ref: 'RC'+Math.floor((Math.random() * 1000000000) + 1), // Generate a random ref
    metadata: {
       custom_fields: [
          {
              display_name: "Support for Blade of Balance",
              variable_name: "comic_support",
              value: "Support for Issue #1"
          }
       ]
    },
    callback: function(response){
        alert('Payment successful! Reference: ' + response.reference);
        // You can redirect to a thank-you page here
    },
    onClose: function(){
        alert('Payment window closed.');
    }
  });
  handler.openIframe();
});


/* flutter wave */

document.getElementById('flutterwave-button').addEventListener('click', function () {
    FlutterwaveCheckout({
        public_key: "YOUR_PUBLIC_KEY",
        tx_ref: "RC_" + Math.floor((Math.random() * 1000000000) + 1),
        amount: 500, // Amount in Naira
        currency: "NGN",
        payment_options: "card, ussd, banktransfer, mobilemoneyghana, mobilemoneyuganda",
        customer: {
            email: "supporter@example.com",
            name: "Supporter Name",
        },
        customizations: {
            title: "Blade of Balance",
            description: "Support for our comic",
            logo: "https://yourwebsite.com/logo.png"
        },
        callback: function (data) {
            alert("Payment successful! Reference: " + data.tx_ref);
            // Optionally redirect to a thank-you page
        },
        onclose: function() {
            alert("Payment cancelled.");
        },
    });
});