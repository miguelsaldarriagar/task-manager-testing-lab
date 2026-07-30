import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskForm } from '../../src/components/TaskForm';

describe('TaskForm', () => {
  it('llama a onSubmit con el título ingresado al presionar "Guardar"', async () => {
    const mockOnSubmit = jest.fn();
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    await fireEvent.changeText(
      screen.getByPlaceholderText('Escribe el título de la tarea'),
      'Mi nueva tarea'
    );
    await fireEvent.press(screen.getByText('Guardar'));

    expect(mockOnSubmit).toHaveBeenCalledWith('Mi nueva tarea');
  });

  it('no llama a onSubmit si el campo está vacío', async () => {
    const mockOnSubmit = jest.fn();
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    await fireEvent.press(screen.getByText('Guardar'));

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  // ==== Actividad 2: pruebas agregadas — título de solo espacios y estado controlado del input ====
  it('no llama a onSubmit cuando el título contiene solo espacios en blanco', async () => {
    const mockOnSubmit = jest.fn();
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    await fireEvent.changeText(screen.getByTestId('input-titulo'), '     ');
    await fireEvent.press(screen.getByRole('button'));

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('refleja en el input el texto escrito por el usuario (estado controlado)', async () => {
    await render(<TaskForm onSubmit={jest.fn()} />);

    const input = screen.getByTestId('input-titulo');
    await fireEvent.changeText(input, 'Estudiar para el examen');

    expect(input.props.value).toBe('Estudiar para el examen');
  });
});
