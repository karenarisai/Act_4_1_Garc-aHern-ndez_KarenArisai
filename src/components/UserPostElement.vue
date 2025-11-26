<script setup>
/**
 * Se declara la propiedad 'post', la cual contiene los datos
 * necesarios para construir la tarjeta: título, contenido y etiquetas.
 */
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- Contenedor principal de la tarjeta -->
  <article class="post-card">
    <div class="post-card-inner">

      <!-- Muestra el título del post recibido -->
      <h4 class="post-title">{{ post.titulo }}</h4>

      <!-- Muestra el contenido del post -->
      <p class="post-body">{{ post.contenido }}</p>

      <!-- Zona inferior que agrupa etiquetas y autor -->
      <div class="post-footer">

        <!-- Listado de etiquetas asociadas al post -->
        <div class="post-tags">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="tag-pill"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Identificador del autor del contenido -->
        <div class="author-badge">
          <!-- Icono del autor -->
          <span class="author-ghost">
            <i class="fi fi-rs-display-code"></i>
          </span>

          <!-- Nombre del autor -->
          <span class="author-name">CiComp_tutorias</span>
        </div>

      </div>
    </div>
  </article>
</template>

<style scoped>
/* Contenedor base de la tarjeta con bordes, sombra y relleno */
.post-card {
  background: #fff;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 8px 20px rgba(15,23,42,0.06);
  border: 1px solid rgba(11,59,90,0.06);
}

/* Área interna que organiza el contenido verticalmente */
.post-card-inner {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Estilo del título del post */
.post-title {
  color: #0b3b5a;
  font-weight: 800;
  margin: 0;
  font-size: 1.25rem;
}

/* Estilo del texto descriptivo del post */
.post-body {
  color: #334155;
  margin: 0;
  line-height: 1.45;
}

/* Sección inferior que alinea etiquetas y autor */
.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

/* Contenedor horizontal para las etiquetas */
.post-tags {
  display: flex;
  gap: 8px;
}

/* Estilo visual de cada etiqueta */
.tag-pill {
  background: #dff3ff;
  color: #0369a1;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.85rem;
}

/* Contenedor del autor con fondo suave y forma redondeada */
.author-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f1f5f9;
  padding: 6px 10px;
  border-radius: 999px;
  color: #94a3b8;
}

/* Estilo del icono del autor dentro de un círculo */
.author-ghost {
  background: #fff;
  border-radius: 50%;
  padding: 6px;
  box-shadow: 0 2px 6px rgba(2,6,23,0.03);
}

/* Estilo del nombre del autor */
.author-name {
  font-size: 0.85rem;
  color: #64748b;
}
</style>
