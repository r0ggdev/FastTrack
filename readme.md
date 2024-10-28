# Proyecto camino mínimo

Dado `𝑛 ∈ [8, 16]` ingresado por el usuario, el programa debe generar aleatoriamente
una matriz simétrica `𝑛 × 𝑛` (con elementos positivos) o solicitar el ingreso de cada
elemento de la matriz (según decisión del usuario). Además, debe mostrar el grafo
etiquetado asociado a esta matriz y el camino mínimo que existe entre dos vértices
seleccionados por el usuario. Todo el proceso, desde la generación de la matriz hasta
el cálculo del camino mínimo, se debe mostrar paso a paso, proporcionando una
visualización clara y detallada del funcionamiento interno del algoritmo
## Introducción

**FastTrack** es una aplicación web para visualizar y resolver problemas de búsqueda del camino mínimo en grafos. Permite a los usuarios crear grafos personalizados, ajustar propiedades y encontrar el camino más corto entre dos nodos.

## Tecnologías Utilizadas

- **HTML**: Estructura de la página web.
- **CSS**: Estilización de la apariencia.
- **JavaScript**: Interactividad y cálculos.
- **D3.js**: Visualización de datos para crear gráficos interactivos.

## Estructura del Proyecto

- **index.html**: Estructura HTML principal.
- **style.css**: Reglas CSS para el estilo.
- **script.js**: Lógica de la aplicación en JavaScript.

## Funcionalidades Principales

- **Generación de grafos**: Creación de grafos de diferentes tamaños y densidades.
- **Visualización**: Representación gráfica interactiva del grafo.
- **Búsqueda del camino mínimo**: Implementación de un algoritmo para encontrar la ruta más corta.
- **Personalización**: Ajuste de colores, tamaños y grosores de nodos y enlaces.

## Desarrollo

### Visualización con D3.js

- **Creación de elementos SVG**: Representación de nodos y enlaces.
- **Transformaciones y animaciones**: Mejora de la interactividad.
- **Enlazado de datos**: Actualización eficiente de visualizaciones.

## Consideraciones Adicionales

- **Optimización**: Mejorar el rendimiento para grafos grandes.
- **Usabilidad**: Interfaz intuitiva.
- **Accesibilidad**: Inclusión de usuarios con discapacidades.

## Próximos Pasos

- Implementar un algoritmo de búsqueda del camino mínimo (Dijkstra, A*, etc.).
- Agregar interactividad para seleccionar nodos.
- Mejorar la personalización de la apariencia.
- Optimizar la usabilidad con tooltips y leyendas.

## Recursos Adicionales

- [Documentación oficial de D3.js](https://d3js.org/)
- Ejemplos y tutoriales en línea.
