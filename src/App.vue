<script setup>
/*
  Aquí importo lo que voy a necesitar en esta vista.
  - ref y reactive son herramientas de Vue para crear variables "reactivas",
    es decir, que si cambian, se actualiza la vista sin recargar.
  - LoginView y CrearPost son componentes (como Web Components) que voy a mostrar.
*/
import { ref, reactive } from 'vue'
import LoginView from './views/Login.vue'
import CrearPost from './views/CrearPost.vue'

/*
  Esta variable controla qué pantalla se debe mostrar.
  Puede ser: 'login' o 'crear'.
*/
const page = ref('login')

/*
  Aquí guardamos la info del usuario que inició sesión.
  Si no hay usuario, user = null.
*/
const user = ref(null)

/*
  Formulario del login.
  reactive sirve para que Vue detecte los cambios dentro del objeto.
*/
const loginForm = reactive({ 
  email: '', 
  password: '' 
})

/*
  Lista donde se guardarán los posts creados.
*/
const posts = ref([])

/*
  Formulario para crear un post.
*/
const postForm = reactive({ 
  titulo: '', 
  contenido: '' 
})

/*
  Función que maneja el inicio de sesión.
  - Verifica que el email y la contraseña no estén vacíos.
  - Guarda el usuario en localStorage (para recordar sesión).
  - Cambia la pantalla a la vista de crear post.
*/
function handleLogin() {
  if (loginForm.email && loginForm.password) {

    // Aquí asigno un usuario falso para la demo.
    user.value = { 
      email: loginForm.email, 
      nombre: 'Usuario Demo' 
    }

    // Guardo el usuario en el navegador.
    localStorage.setItem('user', JSON.stringify(user.value))

    // Navego a la pantalla de crear posts.
    page.value = 'crear'
  } 
  else {
    alert('Por favor completa email y contraseña')
  }
}

/*
  Esta función cierra sesión.
  - Limpia el usuario
  - Borra localStorage
  - Regresa a la pantalla del login
*/
function handleLogout() {
  user.value = null
  localStorage.removeItem('user')
  page.value = 'login'
}

/*
  Esta función se ejecuta cuando el componente LoginView
  emite el evento "login".
  Ese evento trae la información del usuario que inició sesión.
*/
function onLogin(userData) {
  user.value = userData
  page.value = 'crear'
}

/*
  Función para crear un post.
  - Verifica que haya título y contenido.
  - Inserta un nuevo post al inicio de la lista.
  - Limpia el formulario.
*/
function crearPost() {
  if (!postForm.titulo || !postForm.contenido) {
    alert('Completa título y contenido')
    return
  }

  // Agrego el nuevo post al inicio del array
  posts.value.unshift({
    id: Date.now(),                          // ID único
    titulo: postForm.titulo,
    contenido: postForm.contenido,
    nombre: user.value?.nombre || 'Anónimo', // Si no hay usuario
    fecha: new Date().toLocaleString()
  })

  // Limpio el formulario
  postForm.titulo = ''
  postForm.contenido = ''
}
</script>



<template>
  <div id="app">

    <!-- Encabezado general, aún sin contenido -->
    <header style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
    </header>

    <!-- Si page es "login", muestro el componente de Login -->
    <section v-if="page === 'login'">
      <!-- 
        El componente LoginView emite un evento "login" 
        cuando el usuario inicia sesión. 
        Ese evento es capturado por @login="onLogin"
      -->
      <LoginView @login="onLogin" />
    </section>

    <!-- Si page es "crear", muestro la vista para crear posts -->
    <section v-if="page === 'crear'">
      <CrearPost />
    </section>

  </div>
</template>




