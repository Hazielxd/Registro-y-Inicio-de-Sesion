import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyBvdTjJdiggXBmbpwgsQ1O0ZolwWC0TfK0",
  authDomain: "inicio-de-sesion-4e973.firebaseapp.com",
  projectId: "inicio-de-sesion-4e973",
  storageBucket: "inicio-de-sesion-4e973.appspot.com",
  messagingSenderId: "160555626925",
  appId: "1:160555626925:web:40b2e4948c3e2d0ab73124",
  measurementId: "G-0YT1Z4QN42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let emailR = document.querySelector("#emailR");
let passR = document.querySelector("#passR");
let buttonR = document.querySelector("#buttonR");
let emailL = document.querySelector("#emailL");
let passL = document.querySelector("#passL");
let buttonL = document.querySelector("#buttonL");
let buttonO = document.querySelector('#buttonO');
let registroDeSesion = document.querySelector('.RegistroDeSesión');
let inicioDeSesion = document.querySelector('.InicioDeSesion');
let connectedPage = document.querySelector('#connected-page');
let registerMessage = document.querySelector("#register-message"); // Mensaje de registro
let errorMessage = document.querySelector("#error-message"); // Mensaje de error
let userEmailDisplay = document.querySelector("#user-email"); // Elemento para mostrar el correo

// Registro usuario
buttonR.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, emailR.value, passR.value)
    .then((userCredential) => {
      console.log("Registro exitoso");
      registerMessage.textContent = "Registro exitoso.";
      registerMessage.style.display = "block";
      errorMessage.style.display = "none"; // Oculta el mensaje de error si estaba visible
      limpiarCamposRegistro();
      mostrarPaginaInicio();
    })
    .catch((error) => {
      console.error(error);
      registerMessage.style.display = "none";
    });
});

// Login
buttonL.addEventListener('click', () => {
  signInWithEmailAndPassword(auth, emailL.value, passL.value)
    .then((userCredential) => {
      console.log("Login exitoso");
      errorMessage.style.display = "none"; // Oculta el mensaje de error si estaba visible
      userEmailDisplay.textContent = `Correo: ${userCredential.user.email}`;
      mostrarPaginaConectado();
      
    })
    .catch((error) => {
      console.error(error);
      errorMessage.textContent = "Contraseña incorrecta o usuario no registrado.";
      errorMessage.style.display = "block";
    });
});

// LogOut
buttonO.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log("Logout exitoso");
    limpiarCampos();
    mostrarPaginaInicio();
  }).catch((error) => {
    console.error(error);
  });
});

// Detecta los cambios en la sesión
onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmailDisplay.textContent = `Hola: ${user.email}`;
    mostrarPaginaConectado();
  } else {
    mostrarPaginaInicio();
  }
});

// Funciones para mostrar/ocultar páginas
function mostrarPaginaConectado() {
  registroDeSesion.style.display = 'none';
  inicioDeSesion.style.display = 'none';
  connectedPage.style.display = 'block';
}

function mostrarPaginaInicio() {
  registroDeSesion.style.display = 'block';
  inicioDeSesion.style.display = 'block';
  connectedPage.style.display = 'none';
}

// Funciones para limpiar campos
function limpiarCampos() {
  emailR.value = '';
  passR.value = '';
  emailL.value = '';
  passL.value = '';
  registerMessage.textContent = '';
  errorMessage.textContent = '';
}

function limpiarCamposRegistro() {
  emailR.value = '';
  passR.value = '';
}
