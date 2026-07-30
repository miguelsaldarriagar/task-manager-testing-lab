import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskList } from '../../src/components/TaskList';

const mockTask = { id: '1', title: 'Tarea 1', status: 'pending' as const };
const anotherTask = { id: '2', title: 'Tarea 2', status: 'completed' as const };

describe('TaskList', () => {
  it('muestra un mensaje cuando la lista está vacía', async () => {
    await render(<TaskList tasks={[]} />);
    expect(screen.getByText('No hay tareas aún')).toBeTruthy();
  });

  it('no muestra el mensaje de lista vacía cuando hay tareas', async () => {
    await render(<TaskList tasks={[mockTask]} />);
    expect(screen.queryByText('No hay tareas aún')).toBeNull();
  });

  it('muestra el contador de tareas correctamente', async () => {
    await render(<TaskList tasks={[mockTask, anotherTask]} />);
    expect(screen.getByText('2 tareas')).toBeTruthy();
  });

  // ==== Actividad 2: pruebas agregadas — estado condicional singular/plural y delegación de onDelete ====
  it('muestra el contador en singular cuando hay una sola tarea', async () => {
    await render(<TaskList tasks={[mockTask]} />);
    expect(screen.getByText('1 tarea')).toBeTruthy();
  });

  it('llama a onDelete con el id de la tarea al presionar "Eliminar"', async () => {
    // jest.fn() aísla TaskList de su componente padre real: solo interesa
    // verificar que la interacción del usuario dispara la función correcta,
    // sin depender de la lógica real de eliminación de tareas.
    const onDelete = jest.fn();
    await render(<TaskList tasks={[mockTask, anotherTask]} onDelete={onDelete} />);

    const botonesEliminar = screen.getAllByText('Eliminar');
    await fireEvent.press(botonesEliminar[0]);

    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
