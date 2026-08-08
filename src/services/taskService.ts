import { Task } from '../types';

const API_URL = 'https://api.taskmanager.com';

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`);
  if (!res.ok) throw new Error('Error al obtener las tareas');
  return res.json();
}

// ==== Actividad 3: nuevo endpoint para pruebas de integración con MSW ====
// Este endpoint (GET /tasks/search) es distinto de los ya usados
// (GET /tasks, POST /tasks), para cumplir con el requisito de cubrir
// escenarios de éxito, error y datos vacíos sobre una funcionalidad
// nueva, no sobre las pantallas que ya traía el proyecto base.
export async function searchTasks(query: string): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Error al buscar tareas');
  return res.json();
}
// ==== Actividad 3: se conecta createTask a una petición HTTP real ====
// Antes era un stub local sin fetch, por lo que MSW no tenía nada que
// interceptar. Ahora usa la misma ruta POST /tasks ya definida en
// src/mocks/handlers.ts, permitiendo simular éxito, error y datos vacíos
// en las pruebas de integración de CreateTaskScreen.
export async function createTask(title: string): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Error al crear la tarea');
  return res.json();
}
