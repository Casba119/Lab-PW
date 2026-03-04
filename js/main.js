//Exercițiul 1
function afiseazaSalut() {
    const dataCurenta = new Date();
    const ora = dataCurenta.getHours();
    const paragrafHeader = document.querySelector('header p');
    
    if (!paragrafHeader) return;

    let mesaj;
    if (ora >= 6 && ora < 12) {
        mesaj = "Bună dimineața! Bine ai venit pe pagina mea.";
    } else if (ora >= 12 && ora < 18) {
        mesaj = "Bună ziua! Bine ai venit pe pagina mea.";
    } else {
        mesaj = "Bună seara! Bine ai venit pe pagina mea.";
    }

    paragrafHeader.textContent = mesaj;
}

afiseazaSalut();


//Exercițiul 2
const contactForm = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");

contactForm.addEventListener("submit", function(event) {
    
    event.preventDefault();

    const nume = document.getElementById("nume").value.trim();
    const email = document.getElementById("email").value.trim();
    const mesaj = document.getElementById("mesaj").value.trim();

    feedback.textContent = "";

    if (nume.length < 2) {
        feedback.textContent = "Nume prea scurt!";
        feedback.style.color = "red";
        return;
    }

    if (!email.includes("@")) {
        feedback.textContent = "Email invalid! Lipsește simbolul @.";
        feedback.style.color = "red";
        return;
    }

    if (mesaj.length < 10) {
        feedback.textContent = "Mesajul trebuie să aibă cel puțin 10 caractere!";
        feedback.style.color = "red";
        return;
    }

    feedback.textContent = `Mulțumim, ${nume}! Mesajul a fost trimis.`;
    feedback.style.color = "green";

    contactForm.reset();
});

//Exercitiul 3
const darkModeBtn = document.getElementById("dark-mode-toggle");

darkModeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
});

//exercitiul 4 
const titluriSectiuni = document.querySelectorAll('main h2');

titluriSectiuni.forEach(function(h2) {
    h2.textContent = "▼ " + h2.textContent;

    h2.addEventListener('click', function() {
        const continut = this.nextElementSibling;
        
        if (continut) {
            continut.classList.toggle('hidden');
            if (continut.classList.contains('hidden')) {
                this.textContent = this.textContent.replace('▼', '▶');
            } else {
                this.textContent = this.textContent.replace('▶', '▼');
            }
        }
    });
});
