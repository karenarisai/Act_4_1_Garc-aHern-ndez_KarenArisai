<script setup>
import { reactive, watch } from 'vue'

/**
 * Definimos las propiedades que el componente puede recibir desde el padre.
 * - placeholderTitulo: texto que se muestra en el input del título cuando está vacío
 * - placeholderContenido: texto que se muestra en el textarea del contenido cuando está vacío
 * - modelValue: objeto con los datos actuales del post (titulo y contenido)
 */
const props = defineProps({
  placeholderTitulo: { type: String, default: 'Escribe el título del post' },
  placeholderContenido: { type: String, default: 'Escribe el contenido de tu post...' },
  modelValue: { type: Object, default: () => ({ titulo: '', contenido: '' }) }
})

/**
 * Definimos los eventos que el componente puede emitir.
 * - 'update:modelValue': se emite cada vez que el usuario escribe algo para sincronizar con el padre
 */
const emit = defineEmits(['update:modelValue'])

/**
 * reactive crea un objeto reactivo para manejar el estado local dentro del componente.
 * - localData.titulo: contiene el texto del título
 * - localData.contenido: contiene el texto del contenido
 */
const localData = reactive({
  titulo: props.modelValue.titulo || '',
  contenido: props.modelValue.contenido || ''
})

/**
 * Función que emite el objeto actualizado al componente padre
 */
const emitUpdate = () => emit('update:modelValue', { ...localData })

/**
 * Observa cambios en modelValue desde el padre para mantener sincronizado localData
 * - Si el padre limpia el objeto (titulo y contenido vacíos), reinicia localData
 */
watch(() => props.modelValue, (newVal) => {
  if (!newVal) return
  if (newVal.titulo === '' && newVal.contenido === '') {
    localData.titulo = ''
    localData.contenido = ''
  }
})
</script>

<template>
  <div class="input-texto-component">

    <!-- Campo del Título -->
    <div class="form-row">
      <!-- v-model mantiene sincronizado lo que el usuario escribe con localData -->
      <input
        v-model="localData.titulo"
        type="text"
        :placeholder="placeholderTitulo"
        @input="emitUpdate"  
        class="input-field"
      />
    </div>

    <!-- Editor con barra de herramientas -->
    <div class="editor-wrapper">

      <!-- Botones de formato (solo visuales por ahora) -->
      <div class="editor-toolbar">
        <button type="button" class="toolbar-btn toolbar-bold" title="Negrita">B</button>
        <button type="button" class="toolbar-btn toolbar-italic" title="Cursiva">I</button>
        <button type="button" class="toolbar-btn" title="Cita">""</button>
        <button type="button" class="toolbar-btn" title="Imagen"><i class="fi fi-br-picture"></i></button>
        <button type="button" class="toolbar-btn toolbar-code" title="Código">&lt;/&gt;</button>
        <button type="button" class="toolbar-btn toolbar-underline" title="Subrayado">U</button>
        <button type="button" class="toolbar-btn toolbar-strike" title="Tachado">S</button>
        <button type="button" class="toolbar-btn" title="Alinear izquierda">☰</button>
        <button type="button" class="toolbar-btn" title="Centrar">☷</button>
        <button type="button" class="toolbar-btn" title="Alinear derecha">☱</button>
        <button type="button" class="toolbar-btn" title="Justificar">☶</button>
      </div>
      
      <!-- Área de texto donde se escribe el contenido -->
      <textarea
        v-model="localData.contenido"
        rows="5"
        @input="emitUpdate"  
        class="editor-textarea"
        :placeholder="placeholderContenido"
      ></textarea>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal */
.input-texto-component {
  text-align: left;
}

/* Títulos de sección del componente */
.component-title {
  font-weight: 700;
  color: #002e5e;
  margin-bottom: 0.75rem;
}

/* Espaciado entre filas del formulario */
.form-row {
  margin-bottom: 0.75rem;
}

/* Input del título */
.input-field {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  color: #0f172a;
  box-sizing: border-box;
  transition: box-shadow 0.12s, border-color 0.12s;
}
.input-field:focus {
  outline: none;
  border-color: #7c3aed;
  box-shadow: 0 6px 16px rgba(124,58,237,0.08);
}

/* Contenedor del editor */
.editor-wrapper {
  border: 1px solid #e6eef8;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

/* Barra de herramientas */
.editor-toolbar {
  background: #e9f4fb;
  padding: 0.45rem;
  display: flex;
  gap: 0.4rem;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #dbeaf6;
}

/* Botones de la barra de herramientas */
.editor-toolbar .toolbar-btn {
  background: transparent;
  border: 0;
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.editor-toolbar .toolbar-btn:hover {
  background: #eef2ff;
}

/* Estilos específicos para cada formato */
.editor-toolbar .toolbar-bold { font-weight: 800; }
.editor-toolbar .toolbar-italic { font-style: italic; }
.editor-toolbar .toolbar-code { font-family: monospace; }
.editor-toolbar .toolbar-underline { text-decoration: underline; }
.editor-toolbar .toolbar-strike { text-decoration: line-through; }

/* Área de texto editable */
.editor-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 0;
  min-height: 160px;
  resize: none;
  font-family: inherit;
  color: #0f172a;
  background: #fff;
}
.editor-textarea:focus { outline: none; }
</style>
