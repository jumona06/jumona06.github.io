# Boom Latinoamericano

Mapa interactivo sobre el boom latinoamericano.

Por Juliana Moreno Narváez y Laura Sánchez Márquez.

## Estructura

- `index.html`: página principal publicada por GitHub Pages.
- `0153eac005f3e158/`: exportación de Observable usada por la página principal. Trátala como código generado; edítala solo para correcciones puntuales.
- `0153eac005f3e158/files/`: datos e imágenes consumidos por la exportación de Observable.
- `References/`: material de referencia y pruebas visuales que no forma parte del flujo principal publicado.

## Desarrollo local

Sirve el repositorio desde la raíz para que los módulos ES y los archivos adjuntos carguen correctamente:

```sh
python3 -m http.server 8000
```

Luego abre `http://localhost:8000/`.

## Publicación

El repositorio está organizado para GitHub Pages desde la raíz del proyecto. Mantén `index.html` en la raíz y usa rutas relativas para que la página funcione tanto localmente como en `https://jumona06.github.io/`.
