# Documentación de componentes UI (para principiantes)

Esta documentación está pensada para alguien que está empezando con Web Components en Vue.js y quiere usar/crear componentes reutilizables para un Dashboard de monitoreo de cursos.

Estructura:
- Qué hace cada componente
- Props principales (tipo y valor por defecto)
- Eventos que emite
- Ejemplo de uso en Vue SFC
- Cómo exportarlo/registrarlo como Web Component
- Notas sobre estilos y pruebas

---

## Índice
- Header
- Sidebar
- CourseCard
- StatsCard
- CoursesTable
- ControlButton
- ChartWrapper
- Pagination
- Badge
- LayoutDashboard

---

## Recomendaciones generales (principiante)
- Cada componente debe ser un archivo `.vue` con `style scoped` para encapsular estilos.
- Usar `props` para pasar datos desde el padre y `emit` para comunicar acciones al padre.
- Para exponer como Web Component (custom element) en Vue 3, se empaqueta con `defineCustomElement`.
  Ejemplo rápido:

  ```js
  // src/components/ui/MyComponent.ce.vue (SFC normal)
  import { defineCustomElement } from 'vue'
  import MyComponent from './MyComponent.vue'
  const MyComponentElement = defineCustomElement(MyComponent)
  customElements.define('my-component', MyComponentElement)
  ```

- Para probar, usa `Vitest` y `@vue/test-utils` (pequeñas pruebas de renderizado y emisión de eventos).

---

## `Header` — barra superior
Propósito: mostrar marca, búsqueda, notificaciones y acceso al perfil.

Props:
- `title: String` (opcional) — texto del título o marca.

Eventos:
- `search` — cuando el usuario ejecuta una búsqueda (emite la cadena buscada).
- `logout` — cuando el usuario hace clic en cerrar sesión.

Ejemplo de uso (Vue SFC):
```vue
<template>
  <Header :title="'CiComp Tutorías'" @search="onSearch" @logout="onLogout" />
</template>
<script setup>
import Header from '@/components/ui/Header.vue'
const onSearch = (q) => console.log('buscar', q)
const onLogout = () => console.log('cerrar sesión')
</script>
```

Notas:
- Estilos responsivos: la barra de búsqueda puede colapsar en móvil.
- Documentar accesibilidad: `aria-label` para input de búsqueda y botones.

---

## `Sidebar` — navegación lateral
Propósito: lista de secciones (Cursos, Alumnos, Estadísticas, Ajustes).

Props:
- `items: Array<{label, icon, route}>` — elementos del menú.
- `collapsed: Boolean` — si está colapsado.

Eventos:
- `navigate` — se emite con `{ route }` cuando se pulsa un item.

Ejemplo:
```vue
<Sidebar :items="menu" @navigate="goTo" />
```

Notas:
- Implementar `slot` para contenido adicional en la parte inferior (ej. perfil).

---

## `CourseCard` — tarjeta de curso
Propósito: mostrar resumen rápido de un curso (nombre, progreso, alumnos).

Props:
- `title: String`
- `students: Number`
- `progress: Number` (0-100)
- `color: String` (opcional)

Eventos:
- `open` — cuando el usuario quiere ver detalles.

Ejemplo:
```vue
<CourseCard title="BD Avanzadas" :students="42" :progress="78" @open="openCourse"/>
```

Notas:
- Usar un `progress bar` accesible.
- Mantener la tarjeta responsiva (ajustar ancho en grid).

---

## `StatsCard` — tarjeta con gráfica pequeña
Propósito: mostrar una métrica con una mini-gráfica (línea o área).

Props:
- `title: String`
- `value: String | Number`
- `series: Array<number>` — datos para la mini-gráfica
- `type: 'line' | 'bar'` (opcional)

Eventos:
- `more` — ver detalle de la métrica.

Ejemplo:
```vue
<StatsCard title="Usuarios activos" :value="120" :series="[10,12,15,18,20]" />
```

Notas:
- Reutilizar `ChartWrapper` internamente para abstraer la librería de gráficas (Chart.js, ECharts, etc.).
- Las gráficas deben ser responsivas.

---

## `CoursesTable` — tabla de cursos
Propósito: mostrar un listado con filtros, orden y paginación.

Props:
- `columns: Array<{key,label}>` — columnas a mostrar
- `rows: Array<Object>` — datos
- `pageSize: Number`

Eventos:
- `rowClick` (obj)
- `sort` ({key, order})
- `page` (newPageNumber)

Ejemplo:
```vue
<CoursesTable :columns="cols" :rows="courses" @rowClick="openCourse" />
```

Notas:
- Añadir slot para acciones por fila (editar, eliminar).
- Hacer accesible con `role="table"` y `aria` apropiados.

---

## `ControlButton` — botón reutilizable
Propósito: botón estilizado para acciones primarias/secundarias.

Props:
- `variant: 'primary' | 'secondary' | 'danger'`
- `disabled: Boolean`

Emite:
- `click` cuando se pulsa (usando `emit('click')`).

Ejemplo:
```vue
<ControlButton variant="primary" @click="save">Guardar</ControlButton>
```

Notas:
- Usar `button` nativo internamente para accesibilidad.

---

## `ChartWrapper` — componente de abstracción de gráficas
Propósito: envolver la librería de gráficos y exponer props simples.

Props:
- `type: String` (line, bar, pie)
- `data: Object` (estructura de la librería)
- `options: Object`

Ejemplo:
```vue
<ChartWrapper type="line" :data="chartData" :options="chartOpts"/>
```

Notas:
- Mantener la dependencia opcional (lazy-load) en componentes grandes.

---

## `Pagination` — paginador
Props:
- `page: Number`
- `totalPages: Number`

Emite:
- `update:page` o `page-change`

Ejemplo:
```vue
<Pagination :page="p" :totalPages="10" @page-change="setPage" />
```

---

## `Badge` — insignia pequeña (ej. estado)
Props:
- `label: String`
- `variant: 'info'|'success'|'warning'|'danger'`

Ejemplo:
```vue
<Badge label="En curso" variant="info" />
```

---

## `LayoutDashboard` — layout completo
Propósito: componer `Header`, `Sidebar` y slot para contenido central.

Uso:
```vue
<LayoutDashboard>
  <template #content>
    <!-- aquí van StatsCard, CoursesTable, etc. -->
  </template>
</LayoutDashboard>
```

Notas:
- El layout debe gestionar la visibilidad del sidebar en móvil mediante un estado `collapsed`.

---

## Documentación adicional para principiantes
1. ¿Qué es un prop y cuándo usarlo?
   - Un `prop` es un valor que el componente padre pasa al componente hijo. Ejemplo: `<CourseCard :progress="75" />`.
2. ¿Qué es un evento y cómo capturarlo?
   - Un componente puede `emit` eventos para que el padre actúe: `emit('open', id)`. En el padre: `<CourseCard @open="onOpen" />`.
3. Encapsulación de estilos
   - Usar `<style scoped>` en `.vue` para que los estilos no afecten globalmente.
4. Registro como Web Component
   - Para usar un componente Vue como web component (`<course-card></course-card>`), empaquetarlo con `defineCustomElement` y registrar con `customElements.define('course-card', CourseCardElement)`.

---

## Pruebas unitarias (sugerencia rápida para principiantes)
- Instalar:
  ```bash
  npm install -D vitest @vue/test-utils jsdom
  ```
- Script en `package.json`:
  ```json
  "scripts": {
    "test:unit": "vitest"
  }
  ```
- Ejemplo de test simple (`tests/CourseCard.spec.js`):
  ```js
  import { mount } from '@vue/test-utils'
  import { describe, it, expect } from 'vitest'
  import CourseCard from '@/components/ui/CourseCard.vue'

  describe('CourseCard', () => {
    it('muestra el título', () => {
      const wrapper = mount(CourseCard, { props: { title: 'Prueba' }})
      expect(wrapper.text()).toContain('Prueba')
    })
  })
  ```

---

## Cómo documentar cada componente (plantilla)
Para cada componente crea una sección similar a esta en `docs/components.md` o un archivo por componente:
- Nombre: `CourseCard`
- Propósito: breve descripción
- Props: listado con tipo y defecto
- Eventos: listado
- Slots: si aplica
- Ejemplo mínimo de uso
- Notas de accesibilidad y responsive
- Tests sugeridos

---

## Siguientes pasos prácticos
1. Implementar los SFCs listados en `src/components/ui/` siguiendo las firmas de props y eventos anteriores.
2. Crear `src/views/Dashboard.vue` usando esos componentes.
3. Registrar como Web Components si quieres usar fuera de Vue:
   - Añadir un archivo `src/web-components.js` que importe y defina los custom elements.
4. Añadir tests y un script `npm run test:unit`.

---

Si quieres, puedo:
- Generar automáticamente los archivos de componentes (`.vue`) básicos con la firma de props/eventos mostrada.
- Crear `src/views/Dashboard.vue` de ejemplo que use los componentes.
- Configurar Vitest y crear 2 tests base.

Dime qué pasos quieres que haga ahora: crear los SFCs, registrar los web components, o generar las pruebas y la configuración de test.  