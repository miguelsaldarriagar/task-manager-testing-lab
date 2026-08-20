// ==== Actividad 4: pruebas de contrato de API (endpoint y esquema propios) ====
// A diferencia de taskApi.contract.test.ts (que valida GET /tasks con el
// esquema TaskSchema del proyecto base), este archivo valida GET /tasks/search
// con SearchResultItemSchema/SearchResponseSchema, un esquema Zod definido
// de forma independiente en src/schemas/searchSchema.ts — no una reutilización
// del esquema del profesor, sino una definición propia para este endpoint.
import { SearchResponseSchema, SearchResultItemSchema } from '../../src/schemas/searchSchema';

describe('API Contract - Búsqueda de tareas (GET /tasks/search)', () => {
  it('una respuesta válida (lista de tareas encontradas) cumple el esquema esperado', () => {
    const respuestaValida = [
      { id: '10', title: 'Comprar leche', status: 'pending' },
      { id: '11', title: 'Comprar pan', status: 'pending' },
    ];
    const resultado = SearchResponseSchema.safeParse(respuestaValida);
    expect(resultado.success).toBe(true);
  });

  it('una respuesta válida sin resultados (datos vacíos) también cumple el esquema', () => {
    const sinResultados: unknown[] = [];
    const resultado = SearchResponseSchema.safeParse(sinResultados);
    expect(resultado.success).toBe(true);
  });

  it('detecta cuando un resultado de búsqueda tiene un status fuera del enum permitido', () => {
    const respuestaInvalida = { id: '10', title: 'Comprar leche', status: 'archivada' };
    const resultado = SearchResultItemSchema.safeParse(respuestaInvalida);
    expect(resultado.success).toBe(false);
  });

  it('detecta cuando un resultado de búsqueda no incluye el título', () => {
    const respuestaIncompleta = { id: '10', status: 'pending' };
    const resultado = SearchResultItemSchema.safeParse(respuestaIncompleta);
    expect(resultado.success).toBe(false);
  });
});