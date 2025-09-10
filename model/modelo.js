class Usuario {
  constructor(email, password, nombre = "Administrador", rol = "admin") {
    this.email = email
    this.password = password
    this.nombre = nombre
    this.rol = rol
    this.fechaCreacion = new Date()
    this.ultimoAcceso = null
  }

  // Validar formato de email
  static validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Validar fortaleza de contraseña
  static validarPassword(password) {
    return password && password.length >= 6
  }

  // Actualizar último acceso
  actualizarUltimoAcceso() {
    this.ultimoAcceso = new Date()
  }

  // Obtener información básica del usuario
  getInfo() {
    return {
      email: this.email,
      nombre: this.nombre,
      rol: this.rol,
      ultimoAcceso: this.ultimoAcceso,
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Usuario
}
