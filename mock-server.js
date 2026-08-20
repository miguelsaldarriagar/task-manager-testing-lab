const http = require('http');
const PORT = 4000;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'POST' && url.pathname === '/tasks') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      const { title } = JSON.parse(body || '{}');
      res.writeHead(201);
      res.end(JSON.stringify({ id: String(Date.now()), title, status: 'pending' }));
      console.log(`[POST /tasks] title="${title}" -> 201`);
    });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/tasks') {
    res.writeHead(200);
    res.end(JSON.stringify([
      { id: '1', title: 'Tarea existente', status: 'pending' },
      { id: '2', title: 'Otra tarea', status: 'completed' },
    ]));
    return;
  }

  if (req.method === 'GET' && url.pathname === '/tasks/search') {
    const query = (url.searchParams.get('q') || '').toLowerCase();
    const todas = [
      { id: '10', title: 'Comprar leche', status: 'pending' },
      { id: '11', title: 'Comprar pan', status: 'pending' },
      { id: '12', title: 'Estudiar para el examen', status: 'completed' },
    ];
    const resultado = todas.filter((t) => t.title.toLowerCase().includes(query));
    res.writeHead(200);
    res.end(JSON.stringify(resultado));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: 'No encontrado' }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor mock corriendo en http://0.0.0.0:${PORT}`);
});