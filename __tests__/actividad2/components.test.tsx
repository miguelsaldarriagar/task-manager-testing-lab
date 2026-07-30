import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskList } from '../../src/components/TaskList';
import { TaskForm } from '../../src/components/TaskForm';
import { Task } from '../../src/types';

// Actividad 2 - Punto 4: pruebas de componentes de interfaz (TaskList y TaskForm).

const tasks: Task[] = [
  { id: '1', title: 'Lavar los platos', status: 'pending' },
  { id: '2', title: 'Pagar servicios', status: 'completed' },
];

describe('TaskList', () => {
  it('muestra el mensaje "No hay tareas aún" cuando la lista está vacía', async () => {
    await render(<TaskList tasks={[]} />);
    expect(screen.getByText('No hay tareas aún')).toBeTruthy();
  });

  it('muestra el contador en singular cuando hay una sola tarea', async () => {
    await render(<TaskList tasks={[tasks[0]]} />);
    expect(screen.getByText('1 tarea')).toBeTruthy();
  });

  it('muestra el contador en plural y renderiza cada tarea', async () => {
    await render(<TaskList tasks={tasks} />);
    expect(screen.getByText('2 tareas')).toBeTruthy();
    expect(screen.getByText('Lavar los platos')).toBeTruthy();
    expect(screen.getByText('Pagar servicios')).toBeTruthy();
  });

  it('llama a onDelete con el id de la tarea al presionar "Eliminar"', async () => {
    // jest.fn() aísla TaskList de su componente padre real: solo interesa
    // verificar que la interacción del usuario dispara la función correcta,
    // sin depender de la lógica real de eliminación de tareas.
    const onDelete = jest.fn();
    await render(<TaskList tasks={tasks} onDelete={onDelete} />);

    const botonesEliminar = screen.getAllByText('Eliminar');
    await fireEvent.press(botonesEliminar[0]);

    expect(onDelete).toHaveBeenCalledWith('1');
  });
});

describe('TaskForm', () => {
  it('no llama a onSubmit cuando el título contiene solo espacios en blanco', async () => {
    const onSubmit = jest.fn();
    await render(<TaskForm onSubmit={onSubmit} />);

    await fireEvent.changeText(screen.getByTestId('input-titulo'), '     ');
    await fireEvent.press(screen.getByRole('button'));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('refleja en el input el texto escrito por el usuario', async () => {
    await render(<TaskForm onSubmit={jest.fn()} />);

    const input = screen.getByTestId('input-titulo');
    await fireEvent.changeText(input, 'Estudiar para el examen');

    expect(input.props.value).toBe('Estudiar para el examen');
  });

  it('permite ubicar el botón "Guardar" mediante su accessibilityRole', async () => {
    await render(<TaskForm onSubmit={jest.fn()} />);
    expect(screen.getByRole('button')).toBeTruthy();
  });
});
