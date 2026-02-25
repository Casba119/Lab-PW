// Exercițiul 1
function afiseazaSalut() {
    const dataCurenta = new Date();
    const ora = dataCurenta.getHours();
    const paragrafHeader = document.querySelector('header p');
    
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


function submitForm() {
    const nume = document.getElementById("nume").value;
    const email = document.getElementById("email").value;
    const mesaj = document.getElementById("mesaj").value;

    console.log("Nume introdus:", nume);
    console.log("Email introdus:", email);
    console.log("Mesaj introdus:", mesaj);
}