# Plantilla para nuevos artículos de Entre Alas
#
# INSTRUCCIONES:
# 1. Copia este archivo a la carpeta _posts/
# 2. Renómbralo: YYYY-MM-DD-slug-del-articulo.md
#    Ejemplo: 2026-05-01-cuidados-del-periquito.md
#    - El slug va en minúsculas, sin acentos, con guiones en vez de espacios
# 3. Rellena el front matter (la sección entre los ---)
# 4. Escribe el contenido en Markdown debajo
# 5. Sube la imagen a assets/images/articulos/ si tienes una
# 6. Haz commit y push → el sitio se actualiza automáticamente

---
layout: post
title: "Título del artículo aquí"
excerpt: "Resumen de 1-2 oraciones. Aparece en las tarjetas de artículo y en los resultados de búsqueda."
category: Alimentación
# Categorías disponibles: Alimentación | Hábitat | Salud | Especies | Comportamiento
date: YYYY-MM-DD
image: /assets/images/articulos/nombre-de-imagen.jpg
# Elimina la línea anterior si el artículo no tiene imagen.
# Formatos soportados: .jpg .jpeg .png .webp .avif
# Tamaño recomendado: 1200x630 px, menos de 500 KB
tags: [tag1, tag2, tag3]
# Tags en minúsculas, separados por comas. Ej: [periquito, alimentación, semillas]
sources:
  - name: "Nombre de la fuente bibliográfica"
    url: "https://enlace-opcional.com"
  - name: "Otra fuente sin URL (solo nombre del libro o institución)"
# Si no hay fuentes, elimina el bloque sources completo.
---

Párrafo introductorio. Explica brevemente de qué trata el artículo y por qué es importante para el lector.

## Primera sección

Contenido de la sección...

## Segunda sección

Más contenido...

### Subsección (opcional)

Las subsecciones aparecen en la tabla de contenidos automática si hay 3 o más encabezados.

## Ejemplos de formato

> Las citas o notas destacadas se escriben con el símbolo >

**Texto en negrita** para conceptos importantes.
*Texto en cursiva* para nombres científicos o énfasis.

Lista sin orden:
- Elemento uno
- Elemento dos
- Elemento tres

Lista numerada:
1. Primer paso
2. Segundo paso
3. Tercer paso

Tabla comparativa:
| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|
| Dato A    | Dato B    | Dato C    |
| Dato D    | Dato E    | Dato F    |

---

Párrafo de cierre con conclusión o recomendación final.
