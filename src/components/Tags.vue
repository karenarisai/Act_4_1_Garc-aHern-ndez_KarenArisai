<script setup>
import { ref, watch } from 'vue'

/**
 * Propiedades recibidas desde el componente padre.
 * - tags: lista completa de etiquetas disponibles.
 * - modelValue: lista actual de etiquetas seleccionadas.
 *   Se utiliza para permitir el uso de v-model desde el padre.
 */
const props = defineProps({
  tags: {
    type: Array,
    default: () => ['Bases de datos', 'Programación', 'Desarrollo Web', 'Algoritmos']
  },
  modelValue: {
    type: Array,
    default: () => []
  }
})

/**
 * Declaración de eventos que el componente emitirá.
 * En este caso, actualiza la lista de etiquetas seleccionadas en el padre.
 */
const emit = defineEmits(['update:modelValue'])

/**
 * Estado interno del componente que almacena las etiquetas seleccionadas.
 * Se utiliza ref porque se modifica su contenido.
 * Se inicializa con el valor recibido desde el padre.
 */
const selectedTags = ref([...props.modelValue])

/**
 * Determina si una etiqueta ya se encuentra entre las seleccionadas.
 */
const isSelected = (tag) => {
  return selectedTags.value.includes(tag)
}

/**
 * Agrega o elimina una etiqueta según su estado actual.
 * Tras actualizar la lista, se emite el nuevo valor al componente padre.
 */
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)

  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }

  emit('update:modelValue', [...selectedTags.value])
}

/**
 * Observa los cambios en modelValue provenientes del padre.
 * Actualiza la lista interna de etiquetas cuando sea necesario.
 * Se usa 'deep' e 'immediate' para mantener siempre la sincronización.
 */
watch(
  () => props.modelValue,
  (newVal) => {
    selectedTags.value = Array.isArray(newVal) ? [...newVal] : []
  },
  { deep: true, immediate: true }
)

/**
 * Observa específicamente cambios en la longitud del arreglo recibido.
 * Esto permite detectar modificaciones cuando el padre altera el arreglo
 * sin cambiar su referencia.
 */
watch(
  () => props.modelValue && props.modelValue.length,
  (len) => {
    if (typeof len === 'number') {
      selectedTags.value = Array.isArray(props.modelValue)
        ? [...props.modelValue]
        : []
    }
  }
)
</script>

<template>
  <!-- Contenedor del componente de etiquetas -->
  <div class="tags-component">

    <!-- Sección visible únicamente cuando existen etiquetas seleccionadas -->
    <div v-if="selectedTags.length > 0" class="selected-list">

      <!-- Visualización de cada etiqueta seleccionada -->
      <span
        v-for="tag in selectedTags"
        :key="tag"
        class="selected-pill"
      >
        {{ tag }}

        <!-- Botón para eliminar una etiqueta específica -->
        <button
          type="button"
          class="pill-remove"
          @click="toggleTag(tag)"
          aria-label="Eliminar tag"
        >
          ✕
        </button>
      </span>

    </div>

  </div>
</template>

<style scoped>
.component-title {
  color:#002e5e;
  font-weight:700;
  margin-bottom:0.75rem;
}

/* Contenedor de la lista de todas las etiquetas (no se usa en esta vista) */
.tags-list {
  display:flex;
  gap:0.5rem;
  flex-wrap:wrap;
  padding:0.6rem;
  border-radius:8px;
  border:1px dashed #eef6fb;
  background:transparent;
}

/* Botón individual de una etiqueta (no usado en esta vista) */
.tag-btn {
  padding:0.35rem 0.8rem;
  border-radius:999px;
  border:1px solid #e6eef8;
  background:#fff;
  color:#475569;
  cursor:pointer;
  font-weight:600;
  font-size:0.9rem;
}
.tag-btn:hover { background:#f8fafc }
.tag-btn.selected {
  background:#cfe9ff;
  color:#0b3b5a;
  border-color:#8fc6ff;
}

/* Lista visible de etiquetas seleccionadas */
.selected-list {
  display:flex;
  gap:0.5rem;
  flex-wrap:wrap;
}

/* Pastilla que representa cada etiqueta seleccionada */
.selected-pill {
  background:#dff3ff;
  color:#0369a1;
  padding:0.3rem 0.7rem;
  border-radius:999px;
  font-size:0.9rem;
  border:1px solid #c9e8ff;
  position:relative;
  display:inline-flex;
  align-items:center;
  gap:8px;
}

/* Botón de remover*/
.pill-remove {
  background:transparent;
  border:0;
  color:#0369a1;
  font-weight:700;
  cursor:pointer;
  padding:0 6px;
}
</style>
