//exercitiul 1 (Lab3)
const educatie = document.querySelectorAll('#education ol li');
const listaEducatieArray = Array.from(educatie).map(li => li.textContent.trim());
console.log("Array extras: ", listaEducatieArray);

//exercitiul 2 
const studiiAn = listaEducatieArray.filter(item => item.includes("2023"));
console.log("Filtru 1: ", studiiAn);

const studiiLiceu = listaEducatieArray.filter(item => item.toLowerCase().includes("liceul"));
console.log("Filtru 2: ", studiiLiceu);

const studiiPrezent = listaEducatieArray.filter(item => item.toLowerCase().includes("prezent"));
console.log("Filtru 3: ", studiiPrezent);

//exercitiul 3
const primulCuvant = listaEducatieArray.map(item => {
    const cuvinte = item.split(' ');
    return cuvinte[0];
});
console.log("Array cu primele cuvinte:", primulCuvant);

//exercitiul 4
const totalAni = listaEducatieArray.reduce((suma, item) =>{
    const parti = item.split("(")[1].split(")")[0];
    const ani = parti.split("-");
    const anStart = parseInt(ani[0].trim());
    let anFinal;

    if (ani[1].includes("prezent")) {
        anFinal = 2026;
    } else {
        anFinal = parseInt(ani[1].trim());
    }

    const durata = anFinal - anStart;
    return suma+durata;
},0);
console.log("Total ani de studiu: " + totalAni);