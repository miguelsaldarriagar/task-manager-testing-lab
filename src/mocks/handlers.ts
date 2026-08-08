import { http, HttpResponse } from 'msw';

const API_URL = 'https://api.taskmanager.com';

export const handlers = [
  http.post(`${API_URL}/tasks`, async ({ request }) => {
    const body = (await request.json()) as { title: string };
    return HttpResponse.json(
      { id: Date.now().toString(), title: body.title, status: 'pending' },
      { status: 201 }
    );
  }),

  http.get(`${API_URL}/tasks`, () => {
    return HttpResponse.json([
      { id: '1', title: 'Tarea existente', status: 'pending' },
      { id: '2', title: 'Otra tarea', status: 'completed' },
    ]);
  }),

  // ==== Actividad 3: handler nuevo para GET /tasks/search ====
  // Por defecto devuelve una lista fija; las pruebas de integración
  // sobreescriben este handler con server.use() para simular error
  // y datos vacíos según el escenario.
  http.get(`${API_URL}/tasks/search`, ({ request }) => {
    const url = new URL(request.url);
    const query = (url.searchParams.get('q') ?? '').toLowerCase();
    const todas = [
      { id: '10', title: 'Comprar leche', status: 'pending' },
      { id: '11', title: 'Comprar pan', status: 'pending' },
      { id: '12', title: 'Estudiar para el examen', status: 'completed' },
    ];
    const resultado = todas.filter((t) => t.title.toLowerCase().includes(query));
    return HttpResponse.json(resultado);
  }),
];
