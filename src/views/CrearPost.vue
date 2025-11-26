<script setup>
/*
  Se importan herramientas de Vue:
  - ref() permite crear variables reactivas simples.
  - reactive() permite crear objetos reactivas completos.
*/
import { ref, reactive } from 'vue'

/*
  Se importan componentes reutilizables.
  Estos componentes funcionan como piezas pequeñas que puedes usar
  donde quieras (como Web Components pero dentro del ecosistema de Vue).
*/
import BaseInput from '../components/BaseInput.vue'
import Desplegable from '../components/Desplegable.vue'
import Tags from '../components/Tags.vue'
import Boton from '../components/Boton.vue'
import NavBar from '../components/NavBar.vue'
import PostCard from '../components/UserPostElement.vue'


/*
  Objeto principal del formulario.
  Este objeto guarda:
  - Título del post
  - Contenido del post
  - Tags seleccionados
  
  Usamos reactive() porque necesitamos modificar varias propiedades
  y que la interfaz se actualice automáticamente.
*/
const formData = reactive({
  titulo: '',
  contenido: '',
  tags: []
})


/*
  Lista donde se guardarán todos los posts creados por el usuario.
  Es un ref porque es un arreglo y solo cambia como unidad completa.
*/
const posts = ref([])


/*
  Campo opcional para realizar búsquedas en los posts.
  Aún no se usa para filtrar, pero queda listo para implementarlo más adelante.
*/
const search = ref('')


/*
  Opciones que aparecerán dentro del desplegable.
  El usuario podrá elegir alguna de estas para agregarlas como tags.
*/
const tagOptions = [
  'Bases de datos', 'Programación', 'Desarrollo Web',
  'Algoritmos', 'Inteligencia Artificial', 'Redes'
]

/*
  Lista de tags visibles dentro del componente <Tags>.
  En este caso simplemente apuntamos al mismo arreglo de opciones.
*/
const availableTags = tagOptions


/*
  Esta función recibe un tag que viene desde el componente <Desplegable>.
  Verifica si el tag ya fue seleccionado y, si no, lo agrega.
*/
const handleTagSelect = (tag) => {
  if (!formData.tags.includes(tag)) {
    formData.tags.push(tag)
  }
}


/*
  Esta función se ejecuta cuando el usuario hace clic en el botón "Aceptar".
  
  Pasos:
  1. Valida que el formulario tenga título y contenido.
  2. Si es válido, crea un nuevo post y lo agrega a la lista.
  3. Limpia el formulario para que quede listo para otro post.
*/
const handleAceptar = () => {
  if (!formData.titulo || !formData.contenido) {
    return alert('Por favor completa al menos el título y el contenido')
  }

  posts.value.unshift({
    id: Date.now(), // identificador único
    titulo: formData.titulo,
    contenido: formData.contenido,
    tags: [...formData.tags] // copia de los tags seleccionados
  })

  // Reinicia el formulario sin borrar la reactividad
  Object.assign(formData, { titulo: '', contenido: '', tags: [] })

  alert('Post creado exitosamente')
}


/*
  Esta función limpia el formulario si el usuario decide cancelar.
  Antes pide confirmación para evitar eliminar el contenido por accidente.
*/
const handleRechazar = () => {
  if (confirm('¿Estás seguro de que deseas cancelar?')) {
    Object.assign(formData, { titulo: '', contenido: '', tags: [] })
    alert('Formulario cancelado')
  }
}
</script>



<template>
  <!-- Barra superior -->
  <NavBar v-model="search" />

  <main class="page-content">
    
    <!-- Tarjeta principal donde se crea un post -->
    <div class="card create-card">

      <div class="card-header">
        <div class="card-title">Crear Post</div>
      </div>

      <div class="card-body">
        <!-- Sección del formulario -->
        <section class="form-section">

          <!-- 
            BaseInput es un componente personalizado que contiene:
            - Input del título
            - Textarea del contenido

            Se usa v-model en forma extendida:
            - modelValue recibe formData (el objeto completo)
            - update:modelValue actualiza formData cuando el hijo lo modifica
          -->
          <BaseInput
            :modelValue="formData"
            @update:modelValue="val => Object.assign(formData, val)"
            placeholderTitulo="Escribe el título del post"
            placeholderContenido="Escribe el contenido de tu post..."
          />

          <!-- Línea donde se seleccionan y muestran tags -->
          <div class="spaced">

            <!-- Desplegable de tags -->
            <div style="flex:0.5; max-width:240px">
              <div class="muted small" style="margin-bottom:6px">
                Agrega tags para el post
              </div>

              <Desplegable
                :options="tagOptions"
                placeholder="Seleccionar Tags"
                @select="handleTagSelect"
              />
            </div>

            <!-- Tags seleccionados -->
            <div style="flex:1">
              <div class="muted small">Tags seleccionados:</div>

              <!-- Componente que muestra los tags elegidos -->
              <Tags
                :tags="availableTags"
                v-model="formData.tags"
              />
            </div>

          </div>

          <!-- Fila de botones Aceptar y Rechazar -->
          <div class="actions-row">
            <div class="actions-spacer"></div>

            <div class="actions-inline">
              <!-- Botón de aceptar -->
              <Boton tipo="aceptar" @aceptar="handleAceptar" />

              <!-- Botón de rechazar -->
              <Boton tipo="rechazar" @rechazar="handleRechazar" />
            </div>
          </div>

        </section>
      </div>
    </div>

    <!-- Lista de posts creados -->
    <section class="posts-list" v-if="posts.length > 0">
      <h3 class="list-title">Publicaciones Recientes</h3>

      <div class="list-grid">
        <!-- PostCard es un componente que solo muestra un post -->
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
        />
      </div>
    </section>

  </main>
</template>



<style scoped>
.page-content {
  display: flex;
  flex-direction: column;
  padding: 75px 30px;
  background-color: #f9f9f9;
}

.card-container {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.card {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card h2 {
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.card p {
  font-size: 1.2rem;
  line-height: 1.6;
}

.tags {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.tag {
  padding: 5px 10px;
  background-color: #f1f1f1;
  border-radius: 20px;
  font-size: 0.9rem;
}

.read-more {
  color: #2949c6;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}

.footer {
  text-align: center;
  padding: 30px 0;
  font-size: 0.9rem;
  color: #333;
}

/* Alineación de los botones al final del formulario */
.actions-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

/* Botones alineados horizontalmente */
.actions-inline {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
