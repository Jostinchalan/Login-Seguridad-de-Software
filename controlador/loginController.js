class LoginController {
  constructor() {
    this.usuarioValido = {
      email: "admin@asistec.com",
      password: "asistec123",
    }
    this.init()
  }

  init() {
    // Verificar si estamos en la página de login
    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
      this.setupLoginForm()
    }

    // Verificar si estamos en la página de bienvenida
    if (window.location.pathname.includes("bienvenida.html")) {
      this.verificarSesion()
    }
  }

  setupLoginForm() {
    const form = document.getElementById("loginForm")
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    const loginButton = document.getElementById("loginButton")
    const errorMessage = document.getElementById("errorMessage")

    form.addEventListener("submit", (e) => {
      e.preventDefault()
      this.procesarLogin(emailInput.value, passwordInput.value)
    })

    // Limpiar errores cuando el usuario empiece a escribir
    ;[emailInput, passwordInput].forEach((input) => {
      input.addEventListener("input", () => {
        this.ocultarError()
      })
    })
  }

  procesarLogin(email, password) {
    const loginButton = document.getElementById("loginButton")
    const buttonText = loginButton.querySelector(".button-text")
    const loadingIcon = loginButton.querySelector(".loading-icon")

    // Mostrar estado de carga
    this.mostrarCarga(true)

    // Simular delay de autenticación
    setTimeout(() => {
      if (this.validarCredenciales(email, password)) {
        // Login exitoso
        localStorage.setItem("sesionActiva", "true")
        localStorage.setItem("usuarioEmail", email)
        this.redirigirABienvenida()
      } else {
        // Login fallido
        this.mostrarError("Credenciales incorrectas. Verifica tu email y contraseña.")
        this.mostrarCarga(false)
      }
    }, 1500)
  }

  validarCredenciales(email, password) {
    return email === this.usuarioValido.email && password === this.usuarioValido.password
  }

  mostrarError(mensaje) {
    const errorMessage = document.getElementById("errorMessage")
    const errorText = document.getElementById("errorText")

    errorText.textContent = mensaje
    errorMessage.style.display = "flex"

    // Agregar animación de shake
    errorMessage.style.animation = "none"
    setTimeout(() => {
      errorMessage.style.animation = "shake 0.5s ease-in-out"
    }, 10)
  }

  ocultarError() {
    const errorMessage = document.getElementById("errorMessage")
    errorMessage.style.display = "none"
  }

  mostrarCarga(mostrar) {
    const loginButton = document.getElementById("loginButton")
    const buttonText = loginButton.querySelector(".button-text")
    const loadingIcon = loginButton.querySelector(".loading-icon")

    if (mostrar) {
      loginButton.disabled = true
      buttonText.style.display = "none"
      loadingIcon.style.display = "inline-block"
    } else {
      loginButton.disabled = false
      buttonText.style.display = "inline-block"
      loadingIcon.style.display = "none"
    }
  }

  redirigirABienvenida() {
    window.location.href = "bienvenida.html"
  }

  verificarSesion() {
    const sesionActiva = localStorage.getItem("sesionActiva")
    if (!sesionActiva) {
      window.location.href = "login.html"
      return
    }

    // Mostrar información del usuario
    const userName = document.getElementById("userName")
    const userEmail = localStorage.getItem("usuarioEmail")
    if (userName && userEmail) {
      userName.textContent = userEmail
    }
  }

  cerrarSesion() {
    localStorage.removeItem("sesionActiva")
    localStorage.removeItem("usuarioEmail")
    window.location.href = "login.html"
  }
}

function cerrarSesion() {
  const controller = new LoginController()
  controller.cerrarSesion()
}

document.addEventListener("DOMContentLoaded", () => {
  new LoginController()
})
