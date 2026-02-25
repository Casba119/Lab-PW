
alert("Hello World!");

function submitForm() {
    
    const nume = document.getElementById("nume").value;
    const email = document.getElementById("email").value;
    const mesaj = document.getElementById("mesaj").value;

    
    console.log("Nume introdus:", nume);
    console.log("Email introdus:", email);
    console.log("Mesaj introdus:", mesaj);
    console.warn("Goodbye World!");
}