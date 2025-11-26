<script setup>
/**
 * Propiedad recibida del componente padre:
 * - modelValue: mantiene el valor actual del buscador
 *   para que pueda usarse con v-model.
 */
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

/**
 * Evento que se emite hacia el padre para notificar
 * cambios en el campo de búsqueda.
 */
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <header class="navbar">
    <!-- Marca de la aplicación -->
    <div class="navbar-brand">
      <i class="fi fi-rs-display-code"></i>
      <div class="brand-title">CiComp Tutorías</div>
    </div>

    <!-- Barra de búsqueda centrada -->
    <div class="navbar-search">
      <div class="search-wrap">
        <input 
          class="search-input"
          :value="modelValue"
          @input="emit('update:modelValue', $event.target.value)"
          placeholder="Buscar..."
        />
        <button class="search-btn">
          <i class="fi fi-rs-search"></i>
        </button>
      </div>
    </div>

    <!-- Iconos a la derecha -->
    <div class="navbar-icons">
      <div class="icon" title="notificaciones"><i class="fi fi-rs-bell"></i></div>
      <div class="icon" title="perfil"><i class="fi fi-rs-user"></i></div>
    </div>
  </header>
</template>

<style scoped>
/* Contenedor principal del header */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #002e5e;
  color: #fff;
  flex-wrap: wrap;
  box-shadow: 0 2px 6px rgba(2,6,23,0.06);
}

/* Marca */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.brand-title {
  font-weight: 700;
  font-size: 1.2rem;
}

/* Barra de búsqueda centrada */
.navbar-search {
  flex: 1;
  display: flex;
  justify-content: center; /* Centra la barra */
  min-width: 200px;
}

.search-wrap {
  display: flex;
  width: 100%;
  max-width: 400px;
  background: rgba(255,255,255,0.15);
  border-radius: 8px;
  overflow: hidden;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
}

.search-input::placeholder {
  color: rgba(255,255,255,0.7);
}

.search-btn {
  padding: 8px 10px;
  border: none;
  background: rgba(255,255,255,0.2);
  cursor: pointer;
  color: #fff;
}

/* Iconos */
.navbar-icons {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.navbar-icons .icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: rgba(255,255,255,0.1);
  cursor: pointer;
}

/*DISPOSITIVOS PEQUEÑOS
LOS COMPAÑEROS NO LO INCLUYERON EN SU DISEÑOASÍ QUE LO AÑADÍ */
@media (max-width: 720px) {
  .navbar {
    flex-direction: column;
    align-items: stretch;
  }

  .navbar-search {
    margin-top: 8px;
    justify-content: stretch; /* Barra ocupa todo el ancho */
  }

  .search-wrap {
    width: 100%;
    max-width: none;
  }

  .navbar-icons {
    justify-content: flex-end;
    margin-top: 8px;
  }
}
</style>
