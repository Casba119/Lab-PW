# Dashboard Web Full-Stack - Portofoliu Personal

Acesta este un proiect de tip dashboard web full-stack dezvoltat în cadrul laboratoarelor de Programare Web. Aplicația a evoluat de la o pagină statică de prezentare personală realizată în HTML/CSS/JavaScript până la o aplicație dinamică completă cu interfață în React, server backend în Express și persistență a datelor în MongoDB.

## 🚀 Tehnologii Folosite

Aplicația utilizează o arhitectură modernă de tip MERN Stack simplificat:

- **Frontend:** React (Vite), React Router, CSS Modules / Stiluri Dinamice.
- **Backend:** Node.js, Express, CORS (dezactivat pentru securitatea porturilor cross-origin).
- **Baza de date:** MongoDB & Mongoose (pentru gestionarea persistentă a colecțiilor).

## 🛠️ Caracteristici și Funcționalități (CRUD)

1. **Vizualizare (Read):** Încărcarea asincronă a proiectelor folosind `useEffect` și cereri HTTP de tip `GET`.
2. **Adăugare (Create):** Formular interactiv pentru adăugarea proiectelor noi prin cereri `POST`.
3. **Actualizare (Update):** Comutarea statusului unui proiect (Finalizat / În lucru) trimisă prin request-uri `PUT`.
4. **Ștergere (Delete):** Eliminarea permanentă a proiectelor din interfață și din baza de date folosind apeluri `DELETE`.
5. **Filtrare și Sortare:** Căutare în timp real și filtrare după status direct în starea React (client-side).

---

## 💻 Cum se instalează și pornește

Pentru a rula proiectul local, urmează pașii de mai jos în terminale separate:

### 1. Configurarea și pornirea Serverului (Backend)
# Navighează în folderul serverului
cd server

# Porniți serverul local de dezvoltare pentru React
npm run dev

# Instalează dependențele backend (express, mongoose, cors)
npm install

# Pornește serverul de Express
node index.js