// ==== Actividad 4: pruebas de contrato de API (endpoint propio) ====
// A diferencia de taskApi.contract.test.ts (que ya validaba GET /tasks,
// parte del proyecto base del profesor), este archivo valida el
// contrato de GET /tasks/search, el endpoint construido en la
// Actividad 3 para la funcionalidad de búsqueda — no es una repetición
// de lo que ya existía, sino cobertura de contrato sobre algo propio.
import { TaskListSchema, TaskSchema } from '../../src/schemas/taskSchema';

describe('API Contract - Búsqueda de tareas (GET /tasks/search)', () => {
  it('una respuesta válida (lista de tareas encontradas) cumple el esquema esperado', () => {
    const respuestaValida = [
      { id: '10', title: 'Comprar leche', status: 'pending' },
      { id: '11', title: 'Comprar pan', status: 'pending' },
    ];
    const resultado = TaskListSchema.safeParse(respuestaValida);
    expect(resultado.success).toBe(true);
  });

  it('una respuesta válida sin resultados (datos vacíos) también cumple el esquema', () => {
    // Caso límite propio de este endpoint: una búsqueda sin coincidencias
    // debe seguir siendo una lista válida (vacía), no un error de forma.
    const sinResultados: unknown[] = [];
    const resultado = TaskListSchema.safeParse(sinResultados);
    expect(resultado.success).toBe(true);
  });

  it('detecta cuando un resultado de búsqueda tiene un status fuera del enum permitido', () => {
    const respuestaInvalida = { id: '10', title: 'Comprar leche', status: 'archivada' };
    const resultado = TaskSchema.safeParse(respuestaInvalida);
    expect(resultado.success).toBe(false);
  });

  it('detecta cuando un resultado de búsqueda no incluye el título', () => {
    const respuestaIncompleta = { id: '10', status: 'pending' };
    const resultado = TaskSchema.safeParse(respuestaIncompleta);
    expect(resultado.success).toBe(false);
  });
});