import { validateTaskTitle } from '../../src/utils/validateTask';
import { filterTasksByStatus } from '../../src/utils/filterTasks';
import { Task } from '../../src/types';

// Actividad 2 - Punto 2: pruebas unitarias sobre funciones puras (validación y filtrado).
// Estos casos son adicionales a los ya existentes en __tests__/utils, con foco en
// valores nulos/indefinidos y en el matcher toContain.

describe('validateTaskTitle - casos adicionales', () => {
  it('retorna el mensaje de obligatoriedad cuando el título es null', () => {
    expect(validateTaskTitle(null as unknown as string)).toBe('El título es obligatorio');
  });

  it('retorna el mensaje de obligatoriedad cuando el título es undefined', () => {
    expect(validateTaskTitle(undefined as unknown as string)).toBe('El título es obligatorio');
  });

  it('recorta los espacios y acepta un título válido rodeado de espacios', () => {
    expect(validateTaskTitle('   Comprar pan   ')).toBeNull();
  });

  it('el mensaje de error por longitud mínima contiene la palabra "caracteres"', () => {
    const mensaje = validateTaskTitle('  A  ');
    expect(mensaje).toContain('caracteres');
  });
});

describe('filterTasksByStatus - casos adicionales', () => {
  const tasks: Task[] = [
    { id: '1', title: 'Comprar leche', status: 'pending' },
    { id: '2', title: 'Enviar informe', status: 'completed' },
    { id: '3', title: 'Llamar al dentista', status: 'pending' },
  ];

  it('retorna un arreglo vacío cuando se filtra una lista vacía', () => {
    expect(filterTasksByStatus([], 'pending')).toEqual([]);
  });

  it('lanza un error cuando la lista de tareas es null', () => {
    expect(() => filterTasksByStatus(null as unknown as Task[], 'pending')).toThrow();
  });

  it('el resultado filtrado por "pending" contiene el título esperado', () => {
    const titulos = filterTasksByStatus(tasks, 'pending').map((t) => t.title);
    expect(titulos).toContain('Llamar al dentista');
  });

  it('retorna exactamente las tareas completadas esperadas', () => {
    const resultado = filterTasksByStatus(tasks, 'completed');
    expect(resultado).toEqual([{ id: '2', title: 'Enviar informe', status: 'completed' }]);
  });
});
