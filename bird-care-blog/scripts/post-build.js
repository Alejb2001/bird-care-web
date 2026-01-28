const fs = require('fs');
const path = require('path');

// Rutas
const distPath = path.join(__dirname, '..', 'dist', 'bird-care-blog', 'browser');
const indexPath = path.join(distPath, 'index.html');
const notFoundPath = path.join(distPath, '404.html');

// Verificar que existe el directorio de build
if (!fs.existsSync(distPath)) {
  console.log('El directorio de build no existe todavia. Ejecuta el build primero.');
  process.exit(0);
}

// Copiar index.html a 404.html para manejar rutas en GitHub Pages
if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log('404.html creado exitosamente desde index.html');
} else {
  console.log('index.html no encontrado en', indexPath);
}

// Crear archivo .nojekyll para que GitHub no procese con Jekyll
const nojekyllPath = path.join(distPath, '.nojekyll');
fs.writeFileSync(nojekyllPath, '');
console.log('.nojekyll creado exitosamente');

console.log('Post-build completado para GitHub Pages!');
