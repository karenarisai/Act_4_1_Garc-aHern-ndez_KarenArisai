<script setup>
/**
 * Propiedades del componente
 * - tipo: define si el botón es de tipo "aceptar" o "rechazar".
 *   - Se valida que solo pueda ser uno de esos dos valores.
 */
const props = defineProps({
  tipo: {
    type: String,
    required: true,
    validator: (val) => ['aceptar', 'rechazar'].includes(val)
  }
})

/**
 * Eventos que el botón puede emitir:
 * - aceptar: se emite cuando se hace clic en el botón "Aceptar"
 * - rechazar: se emite cuando se hace clic en el botón "Rechazar"
 */
const emit = defineEmits(['aceptar', 'rechazar'])
</script>

<template>
  <!-- Botón ACEPTAR -->
  <button
    v-if="tipo === 'aceptar'"         
    class="btn btn-accept"
    @click="emit('aceptar')"         
  >
    Aceptar
  </button>

  <!-- Botón RECHAZAR -->
  <button
    v-else                              
    class="btn btn-reject"
    @click="emit('rechazar')"          
  >
    Rechazar
  </button>
</template>

<style scoped>
/* Estilo base para todos los botones */
.btn {
  padding: 0.5rem 1rem;      
  font-weight: 700;             
  border-radius: 8px;           
  cursor: pointer;             
  border: 1px solid transparent;
  font-size: 0.9rem;
}

/* Estilo del botón ACEPTAR (azul) */
.btn-accept {
  background: #00B2E3;        
  color: white;                 
}
.btn-accept:hover {
  background: #004A98;          
}

/* Estilo del botón RECHAZAR (rojo) */
.btn-reject {
  background: #ef4444;          
  color: white;                
}
.btn-reject:hover {
  background: #dc2626;          
}
</style>
