const express = require('express');
const path = require('path');
const { createServer: createViteServer } = require('vite');
const mernApp = require('./server/server.js');

async function startServer() {
  const app = mernApp;
  const PORT = 3000;

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MERN Task Manager Server running on http://localhost:${PORT}`);
  });
}

startServer();
