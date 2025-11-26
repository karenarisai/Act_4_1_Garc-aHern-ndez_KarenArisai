<script setup>

import { ref } from 'vue'
/**
 * Propiedades recibidas desde el componente padre.
 * - options: arreglo con las opciones que se mostrarán en el desplegable.
 * - placeholder: texto que se muestra cuando no hay ninguna opción seleccionada.
 */
const props = defineProps({
  options: Array,
  placeholder: { type: String, default: 'Selecciona' }
})

/**
 * Eventos que el componente puede emitir al padre.
 * - select: se emite cuando el usuario selecciona una opción.
 */
const emit = defineEmits(['select'])

/**
 * Estado interno del componente:
 * - open: indica si el menú desplegable está abierto o cerrado.
 * - value: almacena la opción seleccionada actualmente.
 */
const open = ref(false)
const value = ref('')

/**
 * Función que abre o cierra el menú desplegable.
 */
const toggle = () => open.value = !open.value

/**
 * Función que se ejecuta al seleccionar una opción.
 * - Guarda la opción seleccionada en 'value'
 * - Cierra el menú
 * - Emite la opción al componente padre
 */
const select = (opt) => {
  value.value = opt
  open.value = false
  emit('select', opt)
}
</script>

<template>
  <!-- Contenedor principal del dropdown -->
  <div class="dropdown">
    
    <!-- Botón que muestra el valor seleccionado o el placeholder -->
    <button @click="toggle" class="toggle">
      {{ value || placeholder }}
      <!-- Flecha que cambia según el estado del menú -->
      <span :class="{ up: open }">▼</span>
    </button>

    <!-- Menú de opciones, visible solo si open es true -->
    <div v-if="open" class="menu">
      <button 
        v-for="o in options" 
        :key="o"
        @click="select(o)"
        class="item"
      >
        {{ o }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal del desplegable */
.dropdown { position: relative; width: 100%; }

/* Botón que muestra el valor seleccionado o placeholder */
.toggle {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

/* Flecha que gira cuando el menú está abierto */
.toggle span { transition: .2s; }
.toggle span.up { transform: rotate(180deg); }

/* Menú de opciones */
.menu {
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 4px;
  overflow: hidden;
}

/* Cada opción del menú */
.item {
  width: 100%;
  padding: 8px 12px;
  text-align: left;
  background: white;
  border: none;
  cursor: pointer;
}

/* Efecto hover en las opciones */
.item:hover { background: #f2f2f2; }
</style>
