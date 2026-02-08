// Wrapper para ejecutar el servidor SSR
import('./dist/bird-care-blog/server/main.server.mjs').catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});
