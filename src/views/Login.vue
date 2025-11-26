<script setup>
/*
  Se importan las herramientas reactivas de Vue.
  ref() permite crear variables reactivas para el formulario.
*/
import { ref } from 'vue'

/*
  Se define un evento llamado "login" que este componente enviará
  al componente padre después de un inicio de sesión exitoso.
*/
const emit = defineEmits(['login'])

/* 
  Variables reactivas que almacenan los valores del formulario.
  Cada una está conectada a un campo de texto mediante v-model.
*/
const email = ref('')
const password = ref('')

/*
  Función principal que valida los datos y simula un inicio de sesión.
  - Verifica que ambos campos tengan contenido.
  - Crea un usuario de ejemplo.
  - Guarda al usuario en localStorage.
  - Emite el evento "login" para notificar al componente padre.
*/
function handleLogin() {
  if (!email.value || !password.value) {
    alert('Ingresa correo y contraseña')
    return
  }

  const user = { email: email.value, nombre: 'Usuario Demo' }
  localStorage.setItem('user', JSON.stringify(user))

  emit('login', user)
}
</script>

<template>
  <!-- Contenedor principal que centra todo el contenido en la pantalla -->
  <div class="login-wrap">
    <!-- Tarjeta visual del formulario de inicio de sesión -->
    <div class="login-card">

      <!-- Sección que muestra un avatar en la parte superior -->
      <div class="avatar">
        <img src="../assets/perfil.png" alt="avatar" />
      </div>

      <!-- Título y descripción del formulario -->
      <h2 class="login-title">Iniciar Sesión</h2>
      <p class="login-sub">Ingresa tus credenciales para acceder a tu cuenta</p>

      <!-- Formulario del login. Al enviar, llama a handleLogin -->
      <form class="login-form" @submit.prevent="handleLogin">

        <!-- Campo para el correo electrónico -->
        <div class="field">
          <label class="field-label">Correo electrónico</label>

          <!-- Input conectado a la variable "email".
               Al presionar Enter se ejecuta handleLogin -->
          <input
            v-model="email"
            type="email"
            placeholder="Correo electrónico"
            class="input"
            @keyup.enter="handleLogin"
          />
        </div>

        <!-- Campo para la contraseña -->
        <div class="field">
          <div class="field-row">
            <label class="field-label">Contraseña</label>

            <!-- Enlace de recuperación de contraseña.
                 No tiene funcionalidad real por ahora. -->
            <a class="forgot" href="#" @click.prevent>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <!-- Input conectado a la variable "password".
               También permite iniciar sesión con Enter. -->
          <input
            v-model="password"
            type="password"
            placeholder="Contraseña"
            class="input"
            @keyup.enter="handleLogin"
          />
        </div>

        <!-- Botón principal del formulario -->
        <button type="submit" class="btn btn-primary-full">
          Iniciar sesión
        </button>

      </form>
    </div>
  </div>
</template>

<style scoped>
/* Ajusta la estructura general del contenedor del formulario */
.login-wrap {
  display: flex;
  justify-content: center;
  padding: 2.5rem 0;
}

/* Estilos visuales de la tarjeta que contiene el formulario */
.login-card {
  width: 420px;
  background: #fff;
  border-radius: 12px;
  border: 2px solid rgba(37,99,235,0.18);
  padding: 28px;
  box-shadow: 0 10px 30px rgba(2,6,23,0.06);
  text-align: center;
}

/* Estilo del contenedor del avatar en la parte superior */
.avatar {
  width: 84px;
  height: 84px;
  border-radius: 999px;
  background: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Estilos del título y subtítulo del formulario */
.login-title {
  margin: 6px 0;
  font-size: 22px;
  font-weight: 800;
  color: #002e5e;
}

.login-sub {
  margin-bottom: 18px;
  color: #64748b;
  font-size: 13px;
}

/* Estructura general del formulario */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Organización de los campos dentro del formulario */
.field {
  text-align: left;
}

.field-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Estilos del texto de las etiquetas de cada campo */
.field-label {
  margin-bottom: 6px;
  font-weight: 600;
  font-size: 13px;
  color: #002e5e;
}

/* Estilos base de los campos de entrada */
.input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #e6eef8;
  background: #fff;
}


/* Estilos del enlace para recuperar contraseña */
.forgot {
  font-size: 12px;
  color: #2563eb;
  text-decoration: none;
}

.forgot:hover {
  text-decoration: underline;
}

/* Estilo del botón principal del formulario */
.btn-primary-full {
  width: 100%;
  background: #0f4aa1;
  color: #fff;
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #0f4aa1;
  font-weight: 700;
}

.btn-primary-full:hover {
  background: #0d3b84;
  border-color: #0d3b84;
}
</style>
